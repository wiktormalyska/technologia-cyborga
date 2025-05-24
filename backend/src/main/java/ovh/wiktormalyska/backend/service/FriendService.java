package ovh.wiktormalyska.backend.service;

import org.springframework.data.domain.Page;
import ovh.wiktormalyska.backend.dto.FriendListDto;
import ovh.wiktormalyska.backend.dto.FriendListValueDto;
import ovh.wiktormalyska.backend.model.Friend;
import ovh.wiktormalyska.backend.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import ovh.wiktormalyska.backend.repository.FriendRepository;
import ovh.wiktormalyska.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;

@Service
public class FriendService {

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

    @Autowired
    public FriendService(FriendRepository friendRepository, UserRepository userRepository) {
        this.friendRepository = friendRepository;
        this.userRepository = userRepository;
    }

    public FriendListDto getAllFriends(Long userId) {
        Pageable pageable = PageRequest.of(0, 100);
        Page<Friend> friendsPage = friendRepository.findAcceptedFriendsByUserId(userId, pageable);

        return FriendListDto.builder()
                .userId(userId)
                .friends(friendsPage.stream()
                        .map(friend -> {
                            User friendUser = friend.getUser().getId().equals(userId)
                                    ? friend.getFriend()
                                    : friend.getUser();

                            return FriendListValueDto.builder()
                                    .friendId(friendUser.getId())
                                    .username(friendUser.getUsername())
                                    .profileImagePath(friendUser.getProfileImagePath())
                                    .build();
                        })
                        .toList())
                .build();
    }

    public Friend addFriend(Long userId, Long friendId) {
        if (userId.equals(friendId)) {
            throw new IllegalArgumentException("Cannot add yourself as a friend");
        }

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

    public Friend acceptFriendRequest(Long userId, Long friendId) {
        Optional<Friend> friendRequest = friendRepository.findExistingFriendRequest(userId, friendId);

        if (friendRequest.isEmpty()) {
            throw new IllegalArgumentException("Friend request not found");
        }

        if (!friendRequest.get().getFriend().getId().equals(userId)) {
            throw new IllegalArgumentException("You cannot accept this friend request");
        }

        if (friendRequest.get().isAccepted()) {
            throw new IllegalArgumentException("Friend request is already accepted");
        }

        friendRequest.get().setAccepted(true);
        return friendRepository.save(friendRequest.get());
    }

    public void rejectFriendRequest(Long userId, Long friendId) {
        Optional<Friend> friendRequest = friendRepository.findExistingFriendRequest(userId, friendId);

        if (friendRequest.isEmpty()) {
            throw new IllegalArgumentException("Friend request not found");
        }

        if (!friendRequest.get().getFriend().getId().equals(userId)) {
            throw new IllegalArgumentException("You cannot reject this friend request");
        }

        if (friendRequest.get().isAccepted()) {
            throw new IllegalArgumentException("Cannot reject an already accepted friend request");
        }

        friendRepository.delete(friendRequest.get());
    }

    public void deleteFriend(Long userId, Long friendId) {
        Optional<Friend> friendship = friendRepository.findExistingFriendRequest(userId, friendId);

        if (friendship.isEmpty()) {
            throw new IllegalArgumentException("Friendship not found");
        }

        if (!friendship.get().getUser().getId().equals(userId) && !friendship.get().getFriend().getId().equals(userId)) {
            throw new IllegalArgumentException("You are not a part of this friendship");
        }

        if (!friendship.get().isAccepted()) {
            throw new IllegalArgumentException("Cannot delete an unaccepted friend request");
        }

        friendRepository.delete(friendship.get());
    }

    public List<Friend> getPendingFriendRequests(Long userId) {
        return friendRepository.findPendingFriendRequestsForUser(userId);
    }

    public List<Friend> getSentFriendRequests(Long userId) {
        return friendRepository.findSentFriendRequestsByUser(userId);
    }
}