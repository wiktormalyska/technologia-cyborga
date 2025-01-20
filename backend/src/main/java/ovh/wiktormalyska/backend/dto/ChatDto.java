package ovh.wiktormalyska.backend.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ChatDto {
    Long user1Id;
    Long user2Id;
}
