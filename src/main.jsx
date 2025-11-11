import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routers/router'
import AuthProvider from './Authentication/AuthProvider/AuthProvider'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      {/* global toast container-------- */}
      <ToastContainer position="top-center" autoClose="2000" theme='colored'></ToastContainer>
    </AuthProvider>
  </StrictMode>
)
