package ovh.wiktormalyska.backend.controller;

import ovh.wiktormalyska.backend.dto.FriendDto;
import ovh.wiktormalyska.backend.dto.FriendListDto;
import ovh.wiktormalyska.backend.model.Friend;
import ovh.wiktormalyska.backend.service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/friends")
public class FriendController {

    private final FriendService friendService;

    @Autowired
    public FriendController(FriendService friendService) {
        this.friendService = friendService;
    }

    @GetMapping("/{userId}")
    public FriendListDto getAllFriends(@PathVariable Long userId) {
        return friendService.getAllFriends(userId);
    }

    @PostMapping("/add")
    public ResponseEntity<Friend> addFriend(@RequestBody FriendDto addFriendDto) {
        try {
            Friend newFriend = friendService.addFriend(addFriendDto.getUserId(), addFriendDto.getFriendId());
            return ResponseEntity.ok(newFriend);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    @PutMapping("/accept")
    public ResponseEntity<Friend> acceptFriendRequest(@RequestBody FriendDto acceptFriendDto) {
        try {
            Friend acceptedFriend = friendService.acceptFriendRequest(acceptFriendDto.getUserId(), acceptFriendDto.getFriendId());
            return ResponseEntity.ok(acceptedFriend);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/reject")
    public ResponseEntity<Void> rejectFriendRequest(@RequestBody FriendDto rejectFriendDto) {
        try {
            friendService.rejectFriendRequest(rejectFriendDto.getUserId(), rejectFriendDto.getFriendId());
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteFriend(@RequestBody FriendDto deleteFriendDto) {
        try {
            friendService.deleteFriend(deleteFriendDto.getUserId(), deleteFriendDto.getFriendId());
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
