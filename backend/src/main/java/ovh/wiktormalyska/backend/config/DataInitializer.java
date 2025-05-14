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
import ovh.wiktormalyska.backend.model.Emoji;
import ovh.wiktormalyska.backend.model.Role;
import ovh.wiktormalyska.backend.model.User;
import ovh.wiktormalyska.backend.model.UserEmoji;
import ovh.wiktormalyska.backend.repository.EmojiRepository;
import ovh.wiktormalyska.backend.repository.RoleRepository;
import ovh.wiktormalyska.backend.repository.UserEmojiRepository;
import ovh.wiktormalyska.backend.repository.UserRepository;
import ovh.wiktormalyska.backend.service.UserService;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Component
public class DataInitializer implements ApplicationRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final EmojiRepository emojiRepository;
    private final UserService userService;
    private final UserEmojiRepository userEmojiRepository;

    @Value("${image.upload.directory}")
    private String imagePath;

    @Autowired
    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository, UserService userService, EmojiRepository emojiRepository, UserEmojiRepository userEmojiRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.userService = userService;
        this.emojiRepository = emojiRepository;
        this.userEmojiRepository = userEmojiRepository;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        initializeRoles();
        initializeAdminUser();
        initializeEmojis();
        unlockAllEmojisForAdmin();
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
                    .profileImagePath(userService.getBackendUrl() + getDefaultProfileImagePath())
                    .points(0)
                    .build();
            userRepository.save(admin);
        }
    }

    private void initializeEmojis() {
        if (emojiRepository.count() == 0) {
            List<Emoji> emojis = List.of(
                    Emoji.builder().placeholder(":smile:").emoji("😊").rarity(Emoji.Rarity.COMMON).build(),
                    Emoji.builder().placeholder(":laugh:").emoji("😂").rarity(Emoji.Rarity.COMMON).build(),
                    Emoji.builder().placeholder(":thumbsup:").emoji("👍").rarity(Emoji.Rarity.COMMON).build(),
                    Emoji.builder().placeholder(":heart:").emoji("❤️").rarity(Emoji.Rarity.COMMON).build(),
                    Emoji.builder().placeholder(":fire:").emoji("🔥").rarity(Emoji.Rarity.COMMON).build(),
                    Emoji.builder().placeholder(":sad:").emoji("😢").rarity(Emoji.Rarity.COMMON).build(),
                    Emoji.builder().placeholder(":wink:").emoji("😉").rarity(Emoji.Rarity.COMMON).build(),
                    Emoji.builder().placeholder(":cool:").emoji("😎").rarity(Emoji.Rarity.COMMON).build(),
                    Emoji.builder().placeholder(":shock:").emoji("😲").rarity(Emoji.Rarity.COMMON).build(),
                    Emoji.builder().placeholder(":angry:").emoji("😠").rarity(Emoji.Rarity.COMMON).build(),
                    Emoji.builder().placeholder(":clap:").emoji("👏").rarity(Emoji.Rarity.COMMON).build(),
                    Emoji.builder().placeholder(":okhand:").emoji("👌").rarity(Emoji.Rarity.COMMON).build(),
                    Emoji.builder().placeholder(":thinking:").emoji("🤔").rarity(Emoji.Rarity.COMMON).build(),
                    Emoji.builder().placeholder(":wave:").emoji("👋").rarity(Emoji.Rarity.COMMON).build(),
                    Emoji.builder().placeholder(":pray:").emoji("🙏").rarity(Emoji.Rarity.COMMON).build(),
                    Emoji.builder().placeholder(":star:").emoji("⭐").rarity(Emoji.Rarity.COMMON).build(),
                    Emoji.builder().placeholder(":eyes:").emoji("👀").rarity(Emoji.Rarity.COMMON).build(),
                    Emoji.builder().placeholder(":check:").emoji("✅").rarity(Emoji.Rarity.COMMON).build(),
                    Emoji.builder().placeholder(":facepalm:").emoji("🤦").rarity(Emoji.Rarity.COMMON).build(),
                    Emoji.builder().placeholder(":party:").emoji("🎉").rarity(Emoji.Rarity.COMMON).build(),

                    Emoji.builder().placeholder(":ninja:").emoji("🥷").rarity(Emoji.Rarity.RARE).build(),
                    Emoji.builder().placeholder(":unicorn:").emoji("🦄").rarity(Emoji.Rarity.RARE).build(),
                    Emoji.builder().placeholder(":unamused:").emoji("😒").rarity(Emoji.Rarity.RARE).build(),
                    Emoji.builder().placeholder(":smirk:").emoji("😏").rarity(Emoji.Rarity.RARE).build(),
                    Emoji.builder().placeholder(":cowboy:").emoji("🤠").rarity(Emoji.Rarity.RARE).build(),
                    Emoji.builder().placeholder(":money:").emoji("💰").rarity(Emoji.Rarity.RARE).build(),
                    Emoji.builder().placeholder(":muscle:").emoji("💪").rarity(Emoji.Rarity.RARE).build(),
                    Emoji.builder().placeholder(":zombie:").emoji("🧟").rarity(Emoji.Rarity.RARE).build(),
                    Emoji.builder().placeholder(":rainbow:").emoji("🌈").rarity(Emoji.Rarity.RARE).build(),
                    Emoji.builder().placeholder(":explode:").emoji("💥").rarity(Emoji.Rarity.RARE).build(),
                    Emoji.builder().placeholder(":100:").emoji("💯").rarity(Emoji.Rarity.RARE).build(),
                    Emoji.builder().placeholder(":wizard:").emoji("🧙").rarity(Emoji.Rarity.RARE).build(),
                    Emoji.builder().placeholder(":vampire:").emoji("🧛").rarity(Emoji.Rarity.RARE).build(),
                    Emoji.builder().placeholder(":facefreeze:").emoji("🥶").rarity(Emoji.Rarity.RARE).build(),
                    Emoji.builder().placeholder(":ghost:").emoji("👻").rarity(Emoji.Rarity.RARE).build(),

                    Emoji.builder().placeholder(":astronaut:").emoji("👨‍🚀").rarity(Emoji.Rarity.EPIC).build(),
                    Emoji.builder().placeholder(":mermaid:").emoji("🧜‍♀️").rarity(Emoji.Rarity.EPIC).build(),
                    Emoji.builder().placeholder(":mindblown:").emoji("🤯").rarity(Emoji.Rarity.EPIC).build(),
                    Emoji.builder().placeholder(":axe:").emoji("🪓").rarity(Emoji.Rarity.EPIC).build(),
                    Emoji.builder().placeholder(":meteor:").emoji("☄️").rarity(Emoji.Rarity.EPIC).build(),
                    Emoji.builder().placeholder(":cyclone:").emoji("🌀").rarity(Emoji.Rarity.EPIC).build(),
                    Emoji.builder().placeholder(":volcano:").emoji("🌋").rarity(Emoji.Rarity.EPIC).build(),
                    Emoji.builder().placeholder(":detective:").emoji("🕵️").rarity(Emoji.Rarity.EPIC).build(),
                    Emoji.builder().placeholder(":dragon:").emoji("🐉").rarity(Emoji.Rarity.EPIC).build(),
                    Emoji.builder().placeholder(":alien:").emoji("👽").rarity(Emoji.Rarity.EPIC).build(),

                    Emoji.builder().placeholder(":cyborg:").emoji("🤖👁️").rarity(Emoji.Rarity.CYBERPSYCHOSIS).build(),
                    Emoji.builder().placeholder(":glitch:").emoji("⚡💻⚡").rarity(Emoji.Rarity.CYBERPSYCHOSIS).build(),
                    Emoji.builder().placeholder(":void:").emoji("⚫🌑⚫").rarity(Emoji.Rarity.CYBERPSYCHOSIS).build(),
                    Emoji.builder().placeholder(":matrix:").emoji("🟩⚡🟩").rarity(Emoji.Rarity.CYBERPSYCHOSIS).build(),
                    Emoji.builder().placeholder(":transcend:").emoji("🧠✨").rarity(Emoji.Rarity.CYBERPSYCHOSIS).build()
            );

            emojiRepository.saveAll(emojis);
            logger.info("Initialized {} emojis", emojis.size());
        }
    }

    private void unlockAllEmojisForAdmin() {
        User admin = userRepository.findByUsername("admin")
                .orElseThrow(() -> new RuntimeException("Admin user not found"));
        List<Emoji> allEmojis = emojiRepository.findAll();
        for (Emoji emoji : allEmojis) {
            if (userEmojiRepository.findByUserAndEmoji(admin, emoji).isEmpty()) {
                userEmojiRepository.save(
                        UserEmoji.builder()
                                .user(admin)
                                .emoji(emoji)
                                .unlockedAt(LocalDateTime.now())
                                .build()
                );
            }
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