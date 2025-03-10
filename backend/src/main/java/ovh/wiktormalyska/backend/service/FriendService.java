package ovh.wiktormalyska.backend.service;

import ovh.wiktormalyska.backend.model.Friend;
import ovh.wiktormalyska.backend.model.User;
import ovh.wiktormalyska.backend.repository.FriendRepository;
import ovh.wiktormalyska.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
//:)
@Service
public class FriendService {

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

    @Autowired
    public FriendService(FriendRepository friendRepository, UserRepository userRepository) {
        this.friendRepository = friendRepository;
        this.userRepository = userRepository;
    }

    public List<Friend> getAllFriends(Long userId) {
        return friendRepository.findByUserId(userId);
    }

    public Friend addFriend(Long userId, Long friendId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<User> friend = userRepository.findById(friendId);

        if (user.isEmpty() || friend.isEmpty()) {
            throw new IllegalArgumentException("User or friend not found");
        }

        if(friendRepository.findExistingFriendRequest(userId, friendId).isPresent()) {
            throw new IllegalArgumentException("Friend request already exists");
        }

        Friend friendRequest = Friend.builder()
                .user(user.get())
                .friend(friend.get())
                .accepted(false)
                .build();

        return friendRepository.save(friendRequest);
    }

    public Friend acceptFriendRequest(Long userId, Long friendRequestId) {
        Optional<Friend> friendRequest = friendRepository.findById(friendRequestId);

        if (friendRequest.isEmpty() || !friendRequest.get().getFriend().getId().equals(userId)) {
            throw new IllegalArgumentException("Friend request not found or invalid");
        }

        friendRequest.get().setAccepted(true);
        return friendRepository.save(friendRequest.get());
    }

    public void rejectFriendRequest(Long userId, Long friendRequestId) {
        Optional<Friend> friendRequest = friendRepository.findById(friendRequestId);

        if (friendRequest.isEmpty() || !friendRequest.get().getFriend().getId().equals(userId)) {
            throw new IllegalArgumentException("Friend request not found or invalid");
        }

        if (friendRequest.get().isAccepted()) {
            throw new IllegalArgumentException("Cannot reject an already accepted friend request");
        }

        friendRepository.delete(friendRequest.get());
    }


    public void deleteFriend(Long userId, Long friendRequestId) {
        Optional<Friend> friendship = friendRepository.findById(friendRequestId);

        if (friendship .isEmpty() || (!friendship .get().getUser().getId().equals(userId)
                && !friendship .get().getFriend().getId().equals(userId))) {
            throw new IllegalArgumentException("Friendship not found or invalid");
        }

        if (!friendship.get().isAccepted()) {
            throw new IllegalArgumentException("Cannot delete an unaccepted friend request");
        }

        friendRepository.delete(friendship.get());
    }
}
