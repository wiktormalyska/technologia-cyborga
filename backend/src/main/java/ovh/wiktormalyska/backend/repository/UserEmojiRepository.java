package ovh.wiktormalyska.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ovh.wiktormalyska.backend.model.UserEmoji;

import java.util.List;
import java.util.Optional;

public interface UserEmojiRepository extends JpaRepository<UserEmoji, Long> {
    List<UserEmoji> findByUserId(Long userId);
    List<UserEmoji> findByEmojiId(Long emojiId);
    Optional<UserEmoji> findByUserIdAndEmojiId(Long userId, Long emojiId);
}

