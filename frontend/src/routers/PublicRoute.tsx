import {useAuth} from "../auth/AuthContext";
import {Navigate} from "react-router-dom";

const PublicRoute = ({children}) => {
    const {isAuthenticated} = useAuth()
    return !isAuthenticated ? children : <Navigate to="/"/>
}

export default PublicRoute