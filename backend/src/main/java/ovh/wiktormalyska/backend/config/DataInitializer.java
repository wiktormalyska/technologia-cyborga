package ovh.wiktormalyska.backend.config;

import org.springframework.security.crypto.password.PasswordEncoder;
import ovh.wiktormalyska.backend.model.User;
import ovh.wiktormalyska.backend.repository.RoleRepository;
import ovh.wiktormalyska.backend.repository.UserRepository;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Component
public class DataInitializer implements ApplicationRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        List<String> roles = List.of("USER", "ADMIN");

        for (String role : roles) {
            if (roleRepository.findByName(role).isEmpty()) {
                roleRepository.save(ovh.wiktormalyska.backend.model.Role.builder().name(role).build());
            }
        }

        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = User.builder()
                    .id(0L)
                    .username("admin")
                    .password(passwordEncoder.encode("admin"))
                    .email("admin@admin.com")
                    .roles(Set.of(roleRepository.findByName("ADMIN").orElseThrow()))
                    .build();
            userRepository.save(admin);
        }
    }
}
