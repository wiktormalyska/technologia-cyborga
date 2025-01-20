package ovh.wiktormalyska.backend.repository;

import ovh.wiktormalyska.backend.model.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
//:)
public interface FriendRepository extends JpaRepository<Friend, Long> {
    List<Friend> findByUserId(Long userId);
}
