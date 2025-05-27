package ovh.wiktormalyska.backend.dto;

import lombok.*;

import java.util.List;

@Data
@Builder
public class FriendListDto {
    Long userId;
    List<FriendListValueDto> sentInvites;
    List<FriendListValueDto> receivedInvites;
}