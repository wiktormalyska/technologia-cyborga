import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from 'react-router-dom'
import MainRouter from "./routers/MainRouter.tsx";
import MainLayout from "./components/MainLayout.tsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainLayout>
        <RouterProvider router={MainRouter}>
        </RouterProvider>
    </MainLayout>
  </StrictMode>,
)
