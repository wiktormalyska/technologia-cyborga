package ovh.wiktormalyska.backend.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ovh.wiktormalyska.backend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderId(Long senderId);
    List<Message> findByChatId(Long chatId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Message m WHERE m.chat.id = :chatId")
    void deleteByChatId(@Param("chatId") Long chatId);

}
