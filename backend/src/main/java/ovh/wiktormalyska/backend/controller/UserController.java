package ovh.wiktormalyska.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;
import ovh.wiktormalyska.backend.dto.UserDto;
import ovh.wiktormalyska.backend.model.Role;
import ovh.wiktormalyska.backend.model.User;
import ovh.wiktormalyska.backend.repository.RoleRepository;
import ovh.wiktormalyska.backend.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import ovh.wiktormalyska.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public UserController(UserService userService, UserRepository userRepository, RoleRepository roleRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @GetMapping
    public List<User> getAllUsers(@RequestParam(defaultValue = "100") int limit) {
        int finalLimit = Math.min(limit, 100);
        Pageable pageable = PageRequest.of(0, finalLimit);
        return userService.getAllUsers(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<UserDto> getUserByUsername(@PathVariable("username") String username) {
        return ResponseEntity.ok(userService.getUserByUsername(username));
    }

    @GetMapping("/find/{username}")
    public ResponseEntity<List<UserDto>> findUserByUsername(@PathVariable("username") String username) {
        return userService.findUserByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        try {
            User createdUser = userService.createUser(user);
            return ResponseEntity.ok(createdUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Long id, @Valid @RequestBody User user) {
        try {
            User updatedUser = userService.updateUser(id, user);
            return ResponseEntity.ok(updatedUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("{id}/profile-image")
    public ResponseEntity<String> getProfileImage(@PathVariable("id") Long id) {
        try {
            String imageUrl = userService.getProfileImage(id);
            return ResponseEntity.ok(imageUrl);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("{id}/profile-image")
    public ResponseEntity<String> updateProfileImage(
            @PathVariable("id") Long id,
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {
        try {
            User user = userRepository.findByUsername(authentication.getName()).orElseThrow(() -> new IllegalArgumentException("User not found"));

            Role adminRole = roleRepository.findByName("ADMIN").orElseThrow(() -> new IllegalArgumentException("Role not found"));
            if (user.getRoles().contains(adminRole) || (!Objects.equals(user.getId(), id))){
                return ResponseEntity.badRequest().body("You are not allowed to update this user's profile image");
            }

            String imageUrl = userService.updateProfileImage(file, id);
            return ResponseEntity.ok(imageUrl);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("{id}/points")
    public ResponseEntity<Integer> getUserPoints(@PathVariable("id") Long id) {
        try {
            int points = userService.getUserPoints(id);
            return ResponseEntity.ok(points);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("{id}/points")
    public ResponseEntity<Void> updateUserPoints(@PathVariable("id") Long id, @RequestParam("points") int points) {
        try {
            userService.updateUserPoints(id, points);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/points")
    public ResponseEntity<Void> addUserPoints(@PathVariable("id") Long id, @RequestParam("points") int points) {
        try {
            userService.addUserPoints(id, points);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }


}