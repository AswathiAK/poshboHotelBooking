import React from 'react'
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  LoginPage, RegisterPage,
  ForgotPasswordPage,ResetPasswordPage,
  HomePage, ErrorPage
} from "./pages";

function App() {
  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/forgot_password' element={<ForgotPasswordPage />} />
        <Route path='/reset_password/:token/:id' element={<ResetPasswordPage />} />
        <Route path='/' element={<HomePage />} />        
        <Route path='*' element={<ErrorPage />} />        
      </Routes>
    </>
  )
}

export default App
