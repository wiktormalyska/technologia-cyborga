package ovh.wiktormalyska.backend.service;

import org.springframework.stereotype.Service;
import ovh.wiktormalyska.backend.model.Emoji;
import ovh.wiktormalyska.backend.model.User;
import ovh.wiktormalyska.backend.model.UserEmoji;
import ovh.wiktormalyska.backend.repository.EmojiRepository;
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
    private final EmojiRepository emojiRepository;
    private final UserRepository userRepository;

    public UserEmojiService(UserEmojiRepository userEmojiRepository, EmojiRepository emojiRepository, UserRepository userRepository) {
        this.userEmojiRepository = userEmojiRepository;
        this.emojiRepository = emojiRepository;
        this.userRepository = userRepository;
    }

    public List<UserEmoji> getUserEmojis(Long userId) {
        return userEmojiRepository.findUserEmojiByUser_Id(userId);
    }

    public UserEmoji unlockEmoji(Long userId, Long emojiId) {
        Emoji emoji = emojiRepository.findById(emojiId).orElseThrow(() -> new RuntimeException("Emoji not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        LocalDateTime unlockedAt = LocalDateTime.now();
        UserEmoji userEmoji = UserEmoji.builder()
                .user(user)
                .emoji(emoji)
                .unlockedAt(unlockedAt)
                .build();
        return userEmojiRepository.save(userEmoji);
    }

    private Emoji getRandomFromList(List<Emoji> emojis) {
        int index = new Random().nextInt(emojis.size());
        return emojis.get(index);
    }

    public Emoji getRandomEmoji() {
        List<Emoji> common = emojiRepository.findByRarity(Emoji.Rarity.COMMON);
        List<Emoji> rare = emojiRepository.findByRarity(Emoji.Rarity.RARE);
        List<Emoji> epic = emojiRepository.findByRarity(Emoji.Rarity.EPIC);
        List<Emoji> cyberpsychosis = emojiRepository.findByRarity(Emoji.Rarity.CYBERPSYCHOSIS);

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
        List<Emoji> all = emojiRepository.findAll();
        return getRandomFromList(all);
    }


}
