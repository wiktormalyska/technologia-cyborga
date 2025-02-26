import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { DecodedTokenType } from "./types";

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    login: (newToken: string) => void;
    logout: () => void;
    decodedToken: DecodedTokenType | null;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [decodedToken, setDecodedToken] = useState<DecodedTokenType | null>(null);
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const existingToken = cookies.token;
        if (existingToken) {
            try {
                const decoded = jwtDecode<DecodedTokenType>(existingToken);

                // check if token is expired
                const currentTime = Date.now() / 1000;
                if (decoded.exp < currentTime) {
                    logout();
                }
                else {
                    setToken(existingToken);
                    setDecodedToken(decoded);
                    setIsAuthenticated(true);
                }
            }
            catch (error) {
                console.error("Invalid token during initialization:", error);
                logout();
            }
        }
        setIsLoading(false);
    }, []);

    const login = (newToken: string) => {
        try {
            const decoded = jwtDecode<DecodedTokenType>(newToken);
            setToken(newToken);
            setDecodedToken(decoded);
            setIsAuthenticated(true);
            setCookie("token", newToken, {
                path: "/",
                maxAge: decoded.exp - decoded.iat,
                sameSite: "strict",
            });
        }
        catch (error) {
            console.error("Invalid token during login:", error);
            logout();
        }
    };

    const logout = () => {
        setToken(null);
        setIsAuthenticated(false);
        setDecodedToken(null);
        removeCookie("token", { path: "/" });
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, token, decodedToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};