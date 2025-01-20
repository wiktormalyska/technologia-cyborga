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

export const useGetById = () => {
    const endpoint = APIEndpoints.users.getById
    return usePathParams("getById-users", endpoint)
}

export const useUpdateById = () => {
    const endpoint = APIEndpoints.users.updateById
    return usePathParams("updateById-users", endpoint)
}

export const useDeleteById = () => {
    const endpoint = APIEndpoints.users.deleteById
    return usePathParams("deleteById-users", endpoint)
}