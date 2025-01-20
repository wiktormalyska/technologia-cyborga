import { createContext, ReactNode, useContext, useState } from "react"
import { useCookies } from "react-cookie"
import { jwtDecode } from "jwt-decode"

interface DecodedTokenType {
    sub: string
    iat: number
    exp: number
    authorities: string[]
}

interface AuthContextType {
    token: string | null
    isAuthenticated: boolean
    login: (newToken:string) => void
    logout: () => void
    decodedToken: DecodedTokenType
}

const AuthContext = createContext<AuthContextType| undefined>(undefined)

export const AuthProvider = ({children} : {children: ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [token, setToken] = useState<string | null>(null)
    const [decodedToken, setDecodedToken] = useState<DecodedTokenType|null>(null)
    const [, setCookie, removeCookie] = useCookies(["token"])

    const login = (newToken: string) => {
        setToken(newToken)
        setCookie("token", newToken, { path: "/" })
        try {
            const decodedToken = jwtDecode<DecodedTokenType>(newToken)
            setDecodedToken(decodedToken)
            setIsAuthenticated(true)
        } catch (error) {
            console.error("Invalid token during login:", error)
            logout()
        }
    }
    const logout = () => {
        setToken(null)
        setIsAuthenticated(false)
        setDecodedToken(null)
        removeCookie("token", { path: "/" })
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, token, decodedToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an AuthProvider')
    return context
}
