package ovh.wiktormalyska.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PurchaseResponseDto {
    private boolean success;
    private String message;
}