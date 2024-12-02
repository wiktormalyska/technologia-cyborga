import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/MainLayout'; // Importuj layout

const MainRouter = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <h1>Home</h1> }, // Strona główna
            { path: 'friends', element: <h1>Friends</h1>},
            {path: 'games', element: <h1>Games</h1>},
            { path: 'lootboxes', element: <h1>Lootboxes</h1>},
            {path: 'rankings', element: <h1>Rankings</h1>},
            { path: 'account', element: <h1>Account</h1>},
            {path: 'settings', element: <h1>Settings</h1>},
        ],
    },
]);

export default MainRouter;
