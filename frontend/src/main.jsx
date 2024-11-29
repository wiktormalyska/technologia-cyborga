import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from 'react-router-dom'
import MainRouter from "./routers/MainRouter.tsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={MainRouter}>
    </RouterProvider>
  </StrictMode>,
)
