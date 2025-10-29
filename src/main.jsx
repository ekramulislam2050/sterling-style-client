import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routers/router'
import AuthProvider from './Authentication/AuthProvider/AuthProvider'
  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
         <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
