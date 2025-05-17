package ovh.wiktormalyska.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ovh.wiktormalyska.backend.model.Emoji;
import ovh.wiktormalyska.backend.model.User;
import ovh.wiktormalyska.backend.model.UserEmoji;
import ovh.wiktormalyska.backend.repository.UserEmojiRepository;
import ovh.wiktormalyska.backend.repository.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class LootBoxService {
    UserRepository userRepository;
    UserEmojiRepository userEmojiRepository;

    UserEmojiService userEmojiService;

    @Autowired
    public LootBoxService(UserRepository userRepository, UserEmojiRepository userEmojiRepository, UserEmojiService userEmojiService) {
        this.userRepository = userRepository;
        this.userEmojiRepository = userEmojiRepository;
        this.userEmojiService = userEmojiService;
    }


    public UserEmoji claimDailyLootbox(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getLastLootboxClaim() != null && user.getLastLootboxClaim().toLocalDate().isEqual(LocalDate.now())) {
            throw new RuntimeException("Lootbox already claimed");
        }
        Emoji emoji = userEmojiService.getRandomEmoji();

        UserEmoji userEmoji = UserEmoji.builder()
                .user(user)
                .emoji(emoji)
                .unlockedAt(LocalDateTime.now())
                .build();

        user.setLastLootboxClaim(LocalDateTime.now());
        userRepository.save(user);
        return userEmojiRepository.save(userEmoji);
    }
}
