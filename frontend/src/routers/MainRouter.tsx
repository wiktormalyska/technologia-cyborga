import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../components/MainLayout";

const MainRouter = createBrowserRouter([
    {
        path: "/",
        element:  <h1>Home</h1>
    },
    {
        path: "/games",
        element: <h1>Games</h1>
    },
    {
        path: "/profile",
        element: <h1>Profile</h1>
    },
    {
        path: "/chat",
        element: <h1>Chat</h1>
    },
    {
        path: "/settings",
        element: <h1>Settings</h1>
    },
    {
        path: "/marketplace",
        element: <h1>Marketplace</h1>
    },
    {
        path: "/lootboxes",
        element: <h1>Lootboxes</h1>
    }
])
export default MainRouter