package ovh.wiktormalyska.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ovh.wiktormalyska.backend.model.Emoji;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemShopDto {
    private Long emojiId;
    private String emoji;
    private Emoji.Rarity rarity;
    private int price;
}