package ovh.wiktormalyska.backend.dto;

import lombok.Data;

@Data
public class UnlockEmojiDto {
    Long userId;
    Long emojiId;
}
