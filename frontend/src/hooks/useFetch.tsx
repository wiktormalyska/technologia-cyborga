import {useMutation, useQuery} from "@tanstack/react-query";
import {useAuth} from "../auth/AuthContext";
import {HttpRequestMethods, Endpoint} from "../values/backendValues";

const devUrl = "http://localhost:8080/";
const prodUrl = "https://backend.technologia-cyborga.wiktormalyska.ovh/"

export function getUrl() {
    // @ts-ignore
    if(import.meta.env.VITE_MODE === 'dev') {
        return devUrl
    }else {
        return prodUrl
    }
}

export const useFetch = (key: string, apiEndpoint: Endpoint) => {
    const { token } = useAuth()

    return useQuery({
        queryKey: [key, apiEndpoint.url, apiEndpoint.method],
        queryFn: () => fetchData(apiEndpoint.url, apiEndpoint.method, token || ""),
        retry: true,
    })
}

export const useMutate = (key: string, apiEndpoint: Endpoint) => {
    const { token } = useAuth();
    interface mutationParams {
        body: object
    }

    return useMutation({
        mutationKey: [key, apiEndpoint.url, apiEndpoint.method],
        mutationFn: ({body}:mutationParams) => fetchData(apiEndpoint.url, apiEndpoint.method, token || "", body),
    });
};

export const usePathParams = (key: string, apiEndpoint: Endpoint, postParamUrl?:string | null) => {
    const { token } = useAuth();
    interface mutationParams {
        param: string,
        body?: object
    }

    return useMutation({
        mutationKey: [key, apiEndpoint.url+postParamUrl, apiEndpoint.method],
        mutationFn: ({param = "", body}: mutationParams) =>
            fetchData(
                apiEndpoint.url + "/" + param + (postParamUrl ?? ""),
                apiEndpoint.method,
                token || "",
                body
            ),
    });
};

const fetchData = async (endpoint: string, method: HttpRequestMethods, token?: string, body?:object) => {
    const response = await fetch(getUrl()+endpoint, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: body? JSON.stringify(body) : null
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
