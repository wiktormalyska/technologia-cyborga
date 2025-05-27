package ovh.wiktormalyska.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ovh.wiktormalyska.backend.model.Emoji;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LootboxResponseDto {
    private Emoji emoji;
    private boolean isDuplicate;
    private int pointsAwarded;
    private String message;
}