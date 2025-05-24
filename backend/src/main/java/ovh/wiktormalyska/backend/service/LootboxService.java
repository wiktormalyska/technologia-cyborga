package ovh.wiktormalyska.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ovh.wiktormalyska.backend.dto.LootboxResponseDto;
import ovh.wiktormalyska.backend.model.Emoji;
import ovh.wiktormalyska.backend.model.User;
import ovh.wiktormalyska.backend.model.UserEmoji;
import ovh.wiktormalyska.backend.repository.UserEmojiRepository;
import ovh.wiktormalyska.backend.repository.UserRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class LootboxService {
    UserRepository userRepository;
    UserEmojiRepository userEmojiRepository;
    UserEmojiService userEmojiService;
    UserService userService;

    @Autowired
    public LootboxService(UserRepository userRepository, UserEmojiRepository userEmojiRepository, UserEmojiService userEmojiService, UserService userService) {
        this.userRepository = userRepository;
        this.userEmojiRepository = userEmojiRepository;
        this.userEmojiService = userEmojiService;
        this.userService = userService;
    }

    private int calculateDuplicateReward(Emoji.Rarity rarity) {
        int baseValue = switch (rarity) {
            case COMMON -> 100;
            case RARE -> 250;
            case EPIC -> 500;
            case CYBERPSYCHOSIS -> 1000;
        };

        return (int) (baseValue * 0.25);
    }

    public LootboxResponseDto claimDailyLootbox(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getLastLootboxClaim() != null && user.getLastLootboxClaim().toLocalDate().isEqual(LocalDate.now())) {
            throw new RuntimeException("Lootbox already claimed");
        }
        Emoji emoji = userEmojiService.getRandomEmoji();

        boolean isDuplicate = userEmojiRepository.findFirstByUserAndEmoji(user, emoji).isPresent();
        int pointsAwarded = 0;
        String message;

        if (isDuplicate) {
            pointsAwarded = calculateDuplicateReward(emoji.getRarity());
            userService.addUserPoints(userId, pointsAwarded);
            message = String.format("Duplicate emoji! You received %d points instead", pointsAwarded);
        }
        else {
            UserEmoji userEmoji = UserEmoji.builder()
                    .user(user)
                    .emoji(emoji)
                    .unlockedAt(LocalDateTime.now())
                    .build();
            userEmojiRepository.save(userEmoji);
            message = "New emoji unlocked";
        }

        user.setLastLootboxClaim(LocalDateTime.now());
        userRepository.save(user);

        return LootboxResponseDto.builder()
                .emoji(emoji)
                .isDuplicate(isDuplicate)
                .pointsAwarded(pointsAwarded)
                .message(message)
                .build();
    }
}
