package ovh.wiktormalyska.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ovh.wiktormalyska.backend.model.Chat;
import ovh.wiktormalyska.backend.model.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ChatRepository extends JpaRepository<Chat, Long> {

    @Query("SELECT c FROM Chat c LEFT JOIN FETCH c.messages WHERE c.user1.id = :userId OR c.user2.id = :userId")
    Optional<List<Chat>> findByUserId(@Param("userId") Long userId);

    @Query("SELECT u FROM Chat c JOIN c.user1 u1 JOIN c.user2 u2 JOIN User u ON (u = u1 AND c.user2.id = :userId) OR (u = u2 AND c.user1.id = :userId) WHERE c.user1.id = :userId OR c.user2.id = :userId ORDER BY u.id ASC")
    Optional<List<User>> getRecipientsByUserId(@Param("userId") Long userId);

    List<Chat> findByCreatedAtAfter(LocalDateTime date);

    @Query("SELECT c FROM Chat c LEFT JOIN FETCH c.messages m WHERE (c.user1.id = :user1Id AND c.user2.id = :user2Id) OR (c.user1.id = :user2Id AND c.user2.id = :user1Id) ORDER BY m.timestamp ASC")
    Optional<Chat> findChatBetweenUsers(@Param("user1Id") Long user1Id, @Param("user2Id") Long user2Id);
}