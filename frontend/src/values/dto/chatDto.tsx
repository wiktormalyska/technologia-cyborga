import {MessageDto} from "./messageDto";

export interface ChatDto {
    chatId: number;
    user1: number;
    user2: number;
    messages: MessageDto[];
}