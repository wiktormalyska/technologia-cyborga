package ovh.wiktormalyska.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ovh.wiktormalyska.backend.dto.LootboxResponseDto;
import ovh.wiktormalyska.backend.service.LootboxService;

@RestController
@RequestMapping("/api/lootbox/")
public class LootboxController {
    LootboxService lootboxService;

    @Autowired
    public LootboxController(LootboxService lootboxService) {
        this.lootboxService = lootboxService;
    }

    @PostMapping("/user_emojis/{userId}/daily")
    public  ResponseEntity<LootboxResponseDto> claimDailyLootbox(@PathVariable Long userId) {
        try {
            LootboxResponseDto result = lootboxService.claimDailyLootbox(userId);
            return ResponseEntity.ok(result);
        }
        catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                    LootboxResponseDto.builder()
                            .message(e.getMessage())
                            .build()
            );
        }
    }
}
