import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import {LoginPage} from "../pages/LoginPage";

const MainRouter = createBrowserRouter([
    {
        path: '/',
        element: (
            <PrivateRoute>
                <MainLayout />
            </PrivateRoute>
        ),
        children: [
            { index: true, element: <h1>Home</h1> },
            { path: 'friends', element: <h1>Friends</h1>},
            { path: 'games', element: <h1>Games</h1>},
            { path: 'lootboxes', element: <h1>Lootboxes</h1>},
            { path: 'rankings', element: <h1>Rankings</h1>},
            { path: 'account', element: <h1>Account</h1>},
            { path: 'settings', element: <h1>Settings</h1>},
        ],
    },
    {
        path: '/login',
        element: (
            <PublicRoute>
                <LoginPage />
            </PublicRoute>
        )
    },
    {
        path: '/register',
        element: (
            <PublicRoute>
                <h1>Register</h1>
            </PublicRoute>
        )
    }
]);

export default MainRouter;
