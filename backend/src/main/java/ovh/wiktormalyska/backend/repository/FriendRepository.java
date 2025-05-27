package ovh.wiktormalyska.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ovh.wiktormalyska.backend.model.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface FriendRepository extends JpaRepository<Friend, Long> {

    @Query("SELECT f FROM Friend f WHERE (f.user.id = :userId OR f.friend.id = :userId) AND f.accepted = true")
    Page<Friend> findAcceptedFriendsByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT f FROM Friend f WHERE (f.user.id = :userId AND f.friend.id = :friendId) OR (f.user.id = :friendId AND f.friend.id = :userId)")
    Optional<Friend> findExistingFriendRequest(@Param("userId") Long userId, @Param("friendId") Long friendId);

    @Query("SELECT f FROM Friend f WHERE f.friend.id = :userId AND f.accepted = false")
    List<Friend> findPendingFriendRequestsForUser(@Param("userId") Long userId);

    @Query("SELECT f FROM Friend f WHERE f.user.id = :userId AND f.accepted = false")
    List<Friend> findSentFriendRequestsByUser(@Param("userId") Long userId);

    @Query("SELECT f FROM Friend f WHERE (f.user.id = :userId AND f.friend.id = :friendId) OR (f.user.id = :friendId AND f.friend.id = :userId) AND f.accepted = true")
    Optional<Friend> findAcceptedFriendship(@Param("userId") Long userId, @Param("friendId") Long friendId);
}