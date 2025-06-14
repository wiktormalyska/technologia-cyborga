package ovh.wiktormalyska.backend.dto;

import lombok.*;

@Builder
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto {
    private Long senderId;
    private Long chatId;
    private String content;
}
