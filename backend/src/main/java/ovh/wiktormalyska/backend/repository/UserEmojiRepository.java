package ovh.wiktormalyska.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ovh.wiktormalyska.backend.model.Emoji;
import ovh.wiktormalyska.backend.model.User;
import ovh.wiktormalyska.backend.model.UserEmoji;
import java.util.List;
import java.util.Optional;

public interface UserEmojiRepository extends JpaRepository<UserEmoji, Long> {
    List<UserEmoji> findUserEmojiByUserId(Long userId);

    List<UserEmoji> findByUserAndEmoji(User user, Emoji emoji);

    Optional<UserEmoji> findFirstByUserAndEmoji(User user, Emoji emoji);
}

