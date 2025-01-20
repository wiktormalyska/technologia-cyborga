import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from 'react-router-dom'
import MainRouter from "./routers/MainRouter.tsx";
import {AuthProvider} from "./auth/AuthContext.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={MainRouter} />
          </AuthProvider>
      </QueryClientProvider>
  </StrictMode>
)
