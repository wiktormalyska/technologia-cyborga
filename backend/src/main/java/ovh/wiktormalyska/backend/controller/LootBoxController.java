package ovh.wiktormalyska.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ovh.wiktormalyska.backend.model.UserEmoji;
import ovh.wiktormalyska.backend.service.LootBoxService;

@RestController
@RequestMapping("/api/lootbox/")
public class LootBoxController {
    LootBoxService lootBoxService;

    @Autowired
    public LootBoxController(LootBoxService lootBoxService) {
        this.lootBoxService = lootBoxService;
    }

    @PostMapping("/user_emojis/{userId}/daily")
    public ResponseEntity<?> claimDailyLootbox(@PathVariable Long userId) {
        try {
            UserEmoji result = lootBoxService.claimDailyLootbox(userId);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
