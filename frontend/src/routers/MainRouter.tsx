import  {createBrowserRouter, useNavigate} from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import {LoginPage} from "../pages/LoginPage";
import {ProfilePage} from '../pages/ProfilePage';
import {useAuth} from "../auth/AuthContext";
import {useEffect} from "react";
import {LootboxesPage} from "../pages/LootboxesPage";
import {GamesPage} from "../pages/GamesPage";
import {FriendsPage} from "../pages/FriendsPage";
import {AllChatsPage} from "../pages/AllChatsPage";
import {RankingsPage} from "../pages/RankingsPage";
import {SettingsPage} from "../pages/SettingsPage";
import {RegisterPage} from "../pages/RegisterPage";
import {AdminPage} from "../pages/AdminPage";
import AdminRoute from "./AdminRoute";


const Logout = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        logout()
        navigate("/login")
    }, [logout, navigate]);
    return null;
}

const MainRouter = createBrowserRouter([
    {
        path: '/',
        element: (
            <PrivateRoute>
                <MainLayout />
            </PrivateRoute>
        ),
        children: [
            { index: true, element: <AllChatsPage /> },
            { path: 'friends', element: <FriendsPage />},
            { path: 'games', element: <GamesPage />},
            { path: 'lootboxes', element: <LootboxesPage />},
            { path: 'rankings', element: <RankingsPage />},
            { path: 'account', element: <ProfilePage />},
            { path: 'settings', element: <SettingsPage />},
            { path: 'policy', element: <h1>Privacy Policy</h1>},
            {
                path: 'admin',
                element: (
                    <AdminRoute>
                        <AdminPage />
                    </AdminRoute>
                )
            },
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
                <RegisterPage />
            </PublicRoute>
        )
    },
    {
        path: '/logout',
        element: <Logout />
    }
]);

export default MainRouter;
