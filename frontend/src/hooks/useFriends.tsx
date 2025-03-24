import { APIEndpoints } from "../values/backendValues";
import { useFetch, useMutate, usePathParams } from "./useFetch";
import {useCurrentUser} from "./useAuth";


export const useGetFriends = () => {
    const { user } = useCurrentUser();
    const endpoint = APIEndpoints.friends.getAll;
    return usePathParams("getAll-friend", endpoint);
};


export const useAddFriend = () => {
    const endpoint = APIEndpoints.friends.addFriend;
    return useMutate("add-friend", endpoint);
};


export const useAcceptFriendRequest = () => {
    const endpoint = APIEndpoints.friends.acceptRequest;
    return useMutate("accept-friend-request", endpoint);
};


export const useRejectFriendRequest = () => {
    const endpoint = APIEndpoints.friends.rejectRequest;
    return useMutate("reject-friend-request", endpoint);
};


export const useDeleteFriend = () => {
    const endpoint = APIEndpoints.friends.deleteFriend;
    return useMutate("delete-friend", endpoint);
};