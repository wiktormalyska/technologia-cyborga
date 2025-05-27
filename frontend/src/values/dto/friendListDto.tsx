import {FriendListValueDto} from "./friendListValueDto";

export interface FriendListDto {
    userId: number,
    sentPendingInvites: FriendListValueDto[],
    receivedPendingInvites: FriendListValueDto[],
    acceptedInvites: FriendListValueDto[],
}