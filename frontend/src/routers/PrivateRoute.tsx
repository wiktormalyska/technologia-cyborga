import {Navigate} from "react-router-dom";
import {useAuth} from "../auth/AuthContext";
import {LoadingSpinner} from "../components/LoadingSpinner";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;