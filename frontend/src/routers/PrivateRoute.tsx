import {useAuth} from "../auth/AuthContext";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {isAuthenticated} = useAuth()
    return isAuthenticated ? children : <Navigate to="/login"/>
}

export default PrivateRoute

