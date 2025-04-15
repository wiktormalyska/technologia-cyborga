package ovh.wiktormalyska.backend.service;

import org.springframework.stereotype.Service;
import ovh.wiktormalyska.backend.model.EmojiPlaceholder;
import ovh.wiktormalyska.backend.model.User;
import ovh.wiktormalyska.backend.model.UserEmoji;
import ovh.wiktormalyska.backend.repository.EmojiPlaceholderRepository;
import ovh.wiktormalyska.backend.repository.UserEmojiRepository;
import ovh.wiktormalyska.backend.repository.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class UserEmojiService {
    private final UserEmojiRepository userEmojiRepository;
    private final EmojiPlaceholderRepository emojiPlaceholderRepository;
    private final UserRepository userRepository;

    public UserEmojiService(UserEmojiRepository userEmojiRepository, EmojiPlaceholderRepository emojiPlaceholderRepository, UserRepository userRepository) {
        this.userEmojiRepository = userEmojiRepository;
        this.emojiPlaceholderRepository = emojiPlaceholderRepository;
        this.userRepository = userRepository;
    }

    public List<UserEmoji> getUserEmojis(Long userId) {
        return userEmojiRepository.findByUserId(userId);
    }

    public Optional<UserEmoji> getEmoji(Long userId, Long emojiId) {
        return userEmojiRepository.findByUserIdAndEmojiId(userId,emojiId);
    }

    public UserEmoji unlockEmoji(Long userId, Long emojiId) {
        EmojiPlaceholder emoji = emojiPlaceholderRepository.findById(emojiId).orElseThrow(() -> new RuntimeException("Emoji not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        LocalDateTime unlockedAt = LocalDateTime.now();
        UserEmoji userEmoji = UserEmoji.builder()
                .user(user)
                .emoji(emoji)
                .unlockedAt(unlockedAt)
                .build();


        return userEmojiRepository.save(userEmoji);
    }

    private EmojiPlaceholder getRandomFromList(List<EmojiPlaceholder> emojis) {
        int index = new Random().nextInt(emojis.size());
        return emojis.get(index);
    }

    private EmojiPlaceholder getRandomEmoji() {
        List<EmojiPlaceholder> common = emojiPlaceholderRepository.findByRarity(EmojiPlaceholder.Rarity.COMMON);
        List<EmojiPlaceholder> rare = emojiPlaceholderRepository.findByRarity(EmojiPlaceholder.Rarity.RARE);
        List<EmojiPlaceholder> epic = emojiPlaceholderRepository.findByRarity(EmojiPlaceholder.Rarity.EPIC);
        List<EmojiPlaceholder> cyberpsychosis = emojiPlaceholderRepository.findByRarity(EmojiPlaceholder.Rarity.CYBERPSYCHOSIS);

        double rand = Math.random();

        if (rand < 0.05 && !epic.isEmpty()) {
            return getRandomFromList(cyberpsychosis);
        } else if (rand < 0.20 && !rare.isEmpty()) {
            return getRandomFromList(epic);
        } else if (rand < 0.40) {
            return getRandomFromList(rare);
        } else if (!common.isEmpty()) {
            return getRandomFromList(common);
        }
        List<EmojiPlaceholder> all = emojiPlaceholderRepository.findAll();
        return getRandomFromList(all);
    }

    public UserEmoji claimDailyLootbox(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getLastLootboxClaim() != null && user.getLastLootboxClaim().toLocalDate().isEqual(LocalDate.now())) {
            throw new RuntimeException("Lootbox already claimed");
        }
        EmojiPlaceholder emoji = getRandomEmoji();

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
