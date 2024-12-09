import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from 'react-router-dom'
import MainRouter from "./routers/MainRouter.tsx";
import {AuthProvider} from "./auth/AuthContext.tsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
        <RouterProvider router={MainRouter} />
      </AuthProvider>
  </StrictMode>
)
