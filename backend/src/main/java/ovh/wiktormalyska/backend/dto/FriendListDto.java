package ovh.wiktormalyska.backend.dto;

import lombok.*;

import java.util.List;

@Data
@Builder
public class FriendListDto {
    Long userId;
    List<FriendListValueDto> sentPendingInvites;
    List<FriendListValueDto> receivedPendingInvites;
    List<FriendListValueDto> acceptedInvites;
}