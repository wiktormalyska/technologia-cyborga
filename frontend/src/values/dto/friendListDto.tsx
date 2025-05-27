import {FriendListValueDto} from "./friendListValueDto";

export interface FriendListDto {
    userId: number,
    sentInvites: FriendListValueDto[],
    receivedInvites: FriendListValueDto[]
}