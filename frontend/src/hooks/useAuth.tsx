import { useMutation } from "@tanstack/react-query";
import { APIEndpoints } from "../values/backendValues";
import { useAuth } from "../auth/AuthContext";
import { LoginDto, RegisterDto } from "../auth/types";

const API_URL = "https://backend.technologia-cyborga.wiktormalyska.ovh/";

// login hook
export const useLogin = () => {
    const { login } = useAuth();

    return useMutation({
        mutationKey: ["login"],
        mutationFn: async (credentials: LoginDto) => {
            const response = await fetch(`${API_URL}${APIEndpoints.auth.login.url}`, {
                method: APIEndpoints.auth.login.method,
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Login failed");
            }

            const data = await response.json();
            login(data.accessToken);
            return data;
        },
    });
};

// register hook
export const useRegister = () => {
    return useMutation({
        mutationKey: ["register"],
        mutationFn: async (userData: RegisterDto) => {
            const response = await fetch(`${API_URL}${APIEndpoints.auth.register.url}`, {
                method: APIEndpoints.auth.register.method,
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Registration failed");
            }

            return response.json();
        },
    });
};

// hook for authenticated user data
export const useCurrentUser = () => {
    const {isAuthenticated, decodedToken } = useAuth();

    return {
        user: isAuthenticated ? {
            id: decodedToken?.userID,
            username: decodedToken?.sub,
            roles: decodedToken?.authorities
        } : null,
        isAdmin: decodedToken?.authorities && decodedToken.authorities.indexOf("ADMIN") !== -1 || false,
        isLoading: false,
        isAuthenticated
    };
};