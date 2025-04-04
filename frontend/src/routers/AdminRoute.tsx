import {Navigate} from "react-router-dom";
import {useCurrentUser} from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
    const isAdmin = useCurrentUser().isAdmin;   // TODO: poprawić role w tokenie

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;