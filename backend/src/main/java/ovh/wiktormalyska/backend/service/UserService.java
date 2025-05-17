package ovh.wiktormalyska.backend.service;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.core.env.Environment;
import org.springframework.web.multipart.MultipartFile;
import ovh.wiktormalyska.backend.dto.UserDto;
import ovh.wiktormalyska.backend.model.Role;
import ovh.wiktormalyska.backend.model.User;
import ovh.wiktormalyska.backend.repository.RoleRepository;
import ovh.wiktormalyska.backend.repository.UserRepository;
import org.springframework.data.domain.Pageable;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final ImageService imageService;

    Environment env;

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository, ImageService imageService, Environment env) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.imageService = imageService;
        this.env = env;
    }

    public List<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable).getContent();
    }

    public Optional<User> getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setProfileImagePath(user.getProfileImagePath());
        return Optional.of(user);
    }

    public UserDto getUserByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("User not found"));
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(user.getRoles())
                .profileImagePath(user.getProfileImagePath())
                .build();
    }

    public Optional<List<User>> findUserByUsername(String username) {
        List<User> users = userRepository.findByUsernameContaining(username);
        if (users.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(users);
    }

    public User createUser(@Valid User user) {
        if (userRepository.existsByUsername(user.getUsername()) || userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Username or e-mail already exists");
        }
        Role userRole = roleRepository.findByName("USER").orElseThrow(() -> new IllegalArgumentException("Role not found"));
        user.setRoles(Set.of(userRole));
        user.setProfileImagePath("/defaultProfile.png");
        user.setPoints(0);
        return userRepository.save(user);
    }

    public User updateUser(Long id, @Valid User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            return userRepository.save(user);
        }).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("User not found");
        }
        userRepository.deleteById(id);
    }

    public String updateProfileImage(MultipartFile file, Long userId){
        return userRepository.findById(userId).map(user -> {
            try {
                String imageUrl = imageService.storeImage(file, user);
                user.setProfileImagePath(imageUrl);
                userRepository.save(user);
                return imageUrl;
            } catch (Exception e) {
                throw new IllegalArgumentException("Error while updating profile image");
            }
        }).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public String getProfileImage(Long userId) {
        return userRepository.findById(userId)
                .map(User::getProfileImagePath)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public Integer getUserPoints(Long id) {
        return userRepository.findById(id).map(User::getPoints)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public void updateUserPoints(Long id, Integer points) {
        userRepository.findById(id).map(user -> {
            user.setPoints(points);
            return userRepository.save(user);
        }).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public void addUserPoints(Long id, Integer points) {
        userRepository.findById(id).map(user -> {
            user.setPoints(user.getPoints() + points);
            return userRepository.save(user);
        }).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}