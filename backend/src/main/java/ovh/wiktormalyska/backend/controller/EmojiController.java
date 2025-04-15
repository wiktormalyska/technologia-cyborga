package ovh.wiktormalyska.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ovh.wiktormalyska.backend.model.EmojiPlaceholder;
import ovh.wiktormalyska.backend.model.UserEmoji;
import ovh.wiktormalyska.backend.service.EmojiPlaceholderService;
import ovh.wiktormalyska.backend.service.UserEmojiService;

import java.util.List;

@RestController
@RequestMapping("/api/emojis/")
public class EmojiController {
    private final EmojiPlaceholderService emojiPlaceholderService;
    private final UserEmojiService userEmojiService;


    @Autowired
    public EmojiController(EmojiPlaceholderService emojiPlaceholderService, UserEmojiService userEmojiService) {
        this.emojiPlaceholderService = emojiPlaceholderService;
        this.userEmojiService = userEmojiService;
    }

    @GetMapping
    public List<EmojiPlaceholder> getAllEmojis() {
        return emojiPlaceholderService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmojiPlaceholder> getEmojiById(@PathVariable Long id) {
        return emojiPlaceholderService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user_emojis/{userId}")
    public List<UserEmoji> getUserEmojis(@PathVariable Long userId) {
        return userEmojiService.getUserEmojis(userId);
    }

    @GetMapping("/rarity")
    public List<EmojiPlaceholder> getEmojiByRarity(@RequestParam EmojiPlaceholder.Rarity rarity) {
        return emojiPlaceholderService.getByRarity(rarity);
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

    @PostMapping("/user_emojis/{userId}/daily")
    public ResponseEntity<?> claimDailyLootbox(@PathVariable Long userId) {
        try {
            UserEmoji result = userEmojiService.claimDailyLootbox(userId);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}

