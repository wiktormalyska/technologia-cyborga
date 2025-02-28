package ovh.wiktormalyska.backend.dto;

import lombok.*;

@Builder
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatDto {
    Long user1Id;
    Long user2Id;
}
