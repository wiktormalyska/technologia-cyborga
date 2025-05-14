package ovh.wiktormalyska.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ovh.wiktormalyska.backend.model.Emoji;
import ovh.wiktormalyska.backend.model.User;
import ovh.wiktormalyska.backend.model.UserEmoji;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface UserEmojiRepository extends JpaRepository<UserEmoji, Long> {
    List<UserEmoji> findUserEmojiByUser_Id(Long userId);

    Collection<Object> findByUserAndEmoji(User admin, Emoji emoji);
}

