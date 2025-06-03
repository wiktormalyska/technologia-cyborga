import {APIEndpoints} from "../values/backendValues";
import {useMutate, usePathParams} from "./useFetch";

export const useCreateChat = () => {
    const endpoint = APIEndpoints.chats.createChat
    return useMutate("create-chat", endpoint)
}

export const useGetChatBetweenUsers = () => {
    const endpoint = APIEndpoints.chats.getChatBetweenUsers;
    return useMutate("getChatBetweenUsers", endpoint)
}

export const useSendMessage = () => {
    const endpoint = APIEndpoints.chats.sendMessage;
    const postPathParamUrl = "/message";
    return usePathParams("sendMessage-chats", endpoint, postPathParamUrl);
}

export const useGetMessagesByChatId = () => {
    const endpoint = APIEndpoints.chats.getMessagesByChatId;
    const postPathParamUrl = "/messages";
    return usePathParams("getMessagesByChatId-chats", endpoint, postPathParamUrl);
};