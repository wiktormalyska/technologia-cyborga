package ovh.wiktormalyska.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FriendListValueDto {
    Long friendId;
    String username;
    String profileImagePath;
}
