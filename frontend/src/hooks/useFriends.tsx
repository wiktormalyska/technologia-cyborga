import { APIEndpoints } from "../values/backendValues";
import { useFetch, useMutate, usePathParams } from "./useFetch";
import {useCurrentUser} from "./useAuth";
import {useAuth} from "../auth/AuthContext";
import {useEffect} from "react";


export const useGetFriends = () => {
    const { decodedToken } = useAuth();
    const currentUserID = decodedToken.userID;

    const result = usePathParams('getAll-friends', APIEndpoints.friends.getAll);


    useEffect(() => {
        if (currentUserID) {
            result.mutate({ param: currentUserID.toString() }); // Manually trigger the request
        }
    }, [currentUserID]);

    console.log("useGetFriends Result:", result);
    return {
        data: Array.isArray(result?.data?.friends) ? result.data.friends : [],
        isLoading: result?.isPending ?? true,
        error: result?.error ?? null,
    };
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