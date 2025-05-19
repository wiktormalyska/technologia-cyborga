import {APIEndpoints} from "../values/backendValues";
import {usePathParams} from "./useFetch";

export const useGetUserEmojis = () => {
    const endpoint = APIEndpoints.emojis.getUserEmojis;
    return usePathParams("getUserEmojis", endpoint);
}