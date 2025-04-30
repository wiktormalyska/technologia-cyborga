package ovh.wiktormalyska.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ovh.wiktormalyska.backend.dto.UnlockEmojiDto;
import ovh.wiktormalyska.backend.model.Emoji;
import ovh.wiktormalyska.backend.model.UserEmoji;
import ovh.wiktormalyska.backend.service.EmojiService;
import ovh.wiktormalyska.backend.service.UserEmojiService;

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
    public ResponseEntity<List<UserEmoji>> getUserEmojis(@PathVariable Long userId) {
        return ResponseEntity.ok(userEmojiService.getUserEmojis(userId));
    }

    @GetMapping("/rarity/{rarity}")
    public List<Emoji> getEmojiByRarity(@PathVariable Emoji.Rarity rarity) {
        return emojiService.getByRarity(rarity);
    }

    @PostMapping("/user_emojis/unlock")
    public ResponseEntity<UserEmoji> unlockEmoji(
            @RequestBody UnlockEmojiDto unlockEmojiDto) {
        UserEmoji userEmoji = userEmojiService.unlockEmoji(unlockEmojiDto.getUserId(), unlockEmojiDto.getEmojiId());
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

