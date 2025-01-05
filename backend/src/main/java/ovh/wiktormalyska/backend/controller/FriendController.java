package ovh.wiktormalyska.backend.controller;

import ovh.wiktormalyska.backend.model.Friend;
import ovh.wiktormalyska.backend.service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//:)
@RestController
@RequestMapping("/api/friends")
public class FriendController {

    @Autowired
    private FriendService friendService;

    @GetMapping("/{userId}")
    public List<Friend> getAllFriends(@PathVariable Long userId) {
        return friendService.getAllFriends(userId);
    }

    @PostMapping("/{userId}/{friendId}")
    public ResponseEntity<Friend> addFriend(@PathVariable Long userId, @PathVariable Long friendId) {
        try {
            Friend newFriend = friendService.addFriend(userId, friendId);
            return ResponseEntity.ok(newFriend);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/accept/{userId}/{friendRequestId}")
    public ResponseEntity<Friend> acceptFriendRequest(@PathVariable Long userId, @PathVariable Long friendRequestId) {
        try {
            Friend acceptedFriend = friendService.acceptFriendRequest(userId, friendRequestId);
            return ResponseEntity.ok(acceptedFriend);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{userId}/{friendRequestId}")
    public ResponseEntity<Void> deleteFriend(@PathVariable Long userId, @PathVariable Long friendRequestId) {
        try {
            friendService.deleteFriend(userId, friendRequestId);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
