package ovh.wiktormalyska.backend.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import ovh.wiktormalyska.backend.model.Emoji;
import ovh.wiktormalyska.backend.model.User;
import ovh.wiktormalyska.backend.model.UserEmoji;
import ovh.wiktormalyska.backend.repository.EmojiRepository;
import ovh.wiktormalyska.backend.repository.UserEmojiRepository;
import ovh.wiktormalyska.backend.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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
        return userEmojiRepository.findByUserId(userId);
    }

    public Optional<UserEmoji> getEmoji(Long userId, Long emojiId) {
        return userEmojiRepository.findByUserIdAndEmojiId(userId,emojiId);
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
}
