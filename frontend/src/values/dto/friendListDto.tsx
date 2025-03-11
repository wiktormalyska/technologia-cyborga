import {friendListValuesDto} from "./friendListValuesDto";

export interface friendListDto {
    userId: number,
    friends: friendListValuesDto[]
}