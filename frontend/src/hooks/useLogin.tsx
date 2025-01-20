import {APIEndpoints} from "../values/backendValues";
import {useMutate} from "./useFetch";

export const loginUser = () => {
    const endpoint = APIEndpoints.auth.login
    return useMutate("getAll-users", endpoint)
}