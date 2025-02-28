package ovh.wiktormalyska.backend.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ovh.wiktormalyska.backend.model.Role;
import ovh.wiktormalyska.backend.model.User;
import ovh.wiktormalyska.backend.repository.RoleRepository;
import ovh.wiktormalyska.backend.repository.UserRepository;
import ovh.wiktormalyska.backend.service.UserService;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Set;

@Component
public class DataInitializer implements ApplicationRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final UserService userService;

    @Value("${image.upload.directory}")
    private String imagePath;

    @Autowired
    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository, UserService userService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.userService = userService;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        initializeRoles();
        initializeAdminUser();
    }

    private void initializeRoles() {
        for (Roles role : Roles.values()) {
            if (roleRepository.findByName(role.name()).isEmpty()) {
                roleRepository.save(Role.builder().name(role.name()).build());
            }
        }
    }

    private void initializeAdminUser() {
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin"))
                    .email("admin@admin.com")
                    .roles(Set.of(roleRepository.findByName(Roles.ADMIN.name()).orElseThrow()))
                    .profileImagePath(userService.getBackendUrl()+getDefaultProfileImagePath())
                    .build();
            userRepository.save(admin);
        }
    }

    private String getDefaultProfileImagePath() {
        String filename = "defaultProfile.png";
        Path filePath = Paths.get(imagePath, filename);

        if (!Files.exists(filePath)) {
            logger.error("Default profile image not found: {}", filePath);
            throw new IllegalArgumentException("Default profile image not found");
        }

        return "/images/" + filename;
    }

    private enum Roles {
        USER,
        ADMIN
    }
}