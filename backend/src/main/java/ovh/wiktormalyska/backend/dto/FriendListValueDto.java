package ovh.wiktormalyska.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FriendListValueDto {
    Long userId;
    String username;
    String profileImagePath;
    boolean accepted;
}
