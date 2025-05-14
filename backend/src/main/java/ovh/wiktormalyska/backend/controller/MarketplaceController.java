package ovh.wiktormalyska.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ovh.wiktormalyska.backend.dto.ItemShopDto;
import ovh.wiktormalyska.backend.dto.PurchaseRequestDto;
import ovh.wiktormalyska.backend.dto.PurchaseResponseDto;
import ovh.wiktormalyska.backend.service.MarketplaceService;
import java.util.List;

@RestController
@RequestMapping("/api/marketplace")
public class MarketplaceController {
    private final MarketplaceService marketplaceService;

    @Autowired
    public MarketplaceController(MarketplaceService marketplaceService) {
        this.marketplaceService = marketplaceService;
    }

    @GetMapping("/items")
    public List<ItemShopDto> getAvailableItems() {
        return marketplaceService.getAvailableItems();
    }

    @PostMapping("/purchase")
    public ResponseEntity<PurchaseResponseDto> purchaseEmoji(@RequestBody PurchaseRequestDto request) {
        PurchaseResponseDto response = marketplaceService.purchaseEmoji(request.getUserId(), request.getEmojiId());
        return ResponseEntity.ok(response);
    }
}