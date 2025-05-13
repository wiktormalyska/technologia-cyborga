package ovh.wiktormalyska.backend.dto;

import lombok.Data;

@Data
public class PurchaseRequestDto {
    private Long userId;
    private Long emojiId;
}