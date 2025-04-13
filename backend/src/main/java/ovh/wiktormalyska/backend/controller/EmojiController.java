package ovh.wiktormalyska.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ovh.wiktormalyska.backend.model.Emoji;
import ovh.wiktormalyska.backend.model.UserEmoji;
import ovh.wiktormalyska.backend.service.EmojiService;
import ovh.wiktormalyska.backend.service.UserEmojiService;
import ovh.wiktormalyska.backend.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/emojis/")
public class EmojiController {
    private final EmojiService emojiService;
    private final UserEmojiService userEmojiService;

    @Autowired
    public EmojiController(EmojiService emojiService, UserEmojiService userEmojiService) {
        this.emojiService = emojiService;
        this.userEmojiService = userEmojiService;
    }

    @GetMapping
    public List<Emoji> getAllEmojis() {
        return emojiService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Emoji> getEmojiById(@PathVariable Long id) {
        return emojiService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user_emojis/{userId}")
    public List<UserEmoji> getUserEmojis(@PathVariable Long userId) {
        return userEmojiService.getUserEmojis(userId);
    }

    @GetMapping("/rarity")
    public List<Emoji> getEmojiByRarity(@RequestParam Emoji.Rarity rarity) {
        return emojiService.getByRarity(rarity);
    }

    @GetMapping("/user_emojis/{userId}/{emojiId}")
    public ResponseEntity<UserEmoji> getUserEmojis(@PathVariable Long userId, @PathVariable Long emojiId) {
        return userEmojiService.getEmoji(userId, emojiId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/user_emojis/unlock")
    public ResponseEntity<UserEmoji> unlockEmoji(
            @RequestParam Long userId,
            @RequestParam Long emojiId) {
        UserEmoji userEmoji = userEmojiService.unlockEmoji(userId, emojiId);
        return ResponseEntity.ok(userEmoji);
    }

}

