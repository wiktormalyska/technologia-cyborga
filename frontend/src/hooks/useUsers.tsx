import {APIEndpoints} from "../values/backendValues";
import {useFetch, useMutate, usePathParams} from "./useFetch";

export const useGetAllUsers = () => {
    const endpoint = APIEndpoints.users.getAll
    return useFetch("getAll-users", endpoint)
}

export const useCreateUser = () => {
    const endpoint = APIEndpoints.users.create
    return useMutate("create-users", endpoint)
}

export const useGetUserById = () => {
    const endpoint = APIEndpoints.users.getById
    return usePathParams("getById-users", endpoint)
}

export const useUpdateUserById = () => {
    const endpoint = APIEndpoints.users.updateById
    return usePathParams("updateById-users", endpoint)
}

export const useDeleteUserById = () => {
    const endpoint = APIEndpoints.users.deleteById
    return usePathParams("deleteById-users", endpoint)
}

export const useGetUserProfileImage = () => {
    const endpoint = APIEndpoints.users.getProfileImage
    const postPathParamUrl = "/profile-image"
    return usePathParams("getProfileImage-users", endpoint, postPathParamUrl)
}

export const usePutUserProfileImage = () => {
    const endpoint = APIEndpoints.users.updateProfilePicture
    const postPathParamUrl = "/profile-image"
    return usePathParams("putProfileImage-users", endpoint, postPathParamUrl)
}