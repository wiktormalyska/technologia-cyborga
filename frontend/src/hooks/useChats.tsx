import {APIEndpoints} from "../values/backendValues";
import {useFetch, useMutate, usePathParams} from "./useFetch";

export const useCreateChat = () => {
    const endpoint = APIEndpoints.chats.createChat
    return useMutate("create-chat", endpoint)
}

export const useGetChatBetweenUsers = () => {
    const endpoint = APIEndpoints.chats.getChatBetweenUsers;
    return useMutate("getChatBetweenUsers", endpoint)
}