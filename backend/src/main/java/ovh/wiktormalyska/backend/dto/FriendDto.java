package ovh.wiktormalyska.backend.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class FriendDto {
    Long userId;
    Long friendId;
}
