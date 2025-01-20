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