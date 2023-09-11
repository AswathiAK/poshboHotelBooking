// import React from 'react'
// import { Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import {
//   LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage,
//   HomePage, UserProfilePage, ErrorPage,
//   PropertyHomePage, AddPropertyPage, ViewPropertiesPage, ViewSinglePropertyPage,
//   EditPropertyPage,
//   HostProfilePage, HostMessagePage, SingleHotelPage
// } from "./pages";

// function App() {
//   return (
//     <>
//       <ToastContainer/>
//       <Routes>
//         <Route path='/register' element={<RegisterPage />} />
//         <Route path='/login' element={<LoginPage />} />
//         <Route path='/forgot_password' element={<ForgotPasswordPage />} />
//         <Route path='/reset_password/:token/:id' element={<ResetPasswordPage />} />
//         <Route path='/' element={<HomePage />} />  
//         <Route path='/:id' element={<SingleHotelPage />} />
//         <Route path='/account' element={<UserProfilePage />} />
//         <Route path='*' element={<ErrorPage />} />        

//         <Route path='/host/home' element={<PropertyHomePage />} />
//         <Route path='/host/add_property' element={<AddPropertyPage />} />
//         <Route path='/host/view_properties' element={<ViewPropertiesPage />} />
//         <Route path='/host/view_property/:id' element={<ViewSinglePropertyPage />} />
//         <Route path='/host/edit_property/:id' element={<EditPropertyPage />} />        
//         <Route path='/host/account/:active' element={<HostProfilePage />} />
//         <Route path='/host/messages' element={<HostMessagePage />} />
        
//       </Routes>
//     </>
//   )
// }

// export default App


import React from 'react'
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage,
  HomePage, UserProfilePage, ErrorPage,
  PropertyHomePage, AddPropertyPage, ViewPropertiesPage, ViewSinglePropertyPage,
  EditPropertyPage,
  HostProfilePage, HostMessagePage, SingleHotelPage, SearchResultsHotelsPage
} from "./pages";
import { Layout } from './components';

function App() {
  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/forgot_password' element={<ForgotPasswordPage />} />
        <Route path='/reset_password/:token/:id' element={<ResetPasswordPage />} />

        <Route path='/' element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path='/search_results' element={<SearchResultsHotelsPage />} />
          <Route path='/:id' element={<SingleHotelPage />} />
          <Route path='/account' element={<UserProfilePage />} />
        </Route>
        
        <Route path='*' element={<ErrorPage />} />   
        <Route path='/host/home' element={<PropertyHomePage />} />
        <Route path='/host/add_property' element={<AddPropertyPage />} />
        <Route path='/host/view_properties' element={<ViewPropertiesPage />} />
        <Route path='/host/view_property/:id' element={<ViewSinglePropertyPage />} />
        <Route path='/host/edit_property/:id' element={<EditPropertyPage />} />        
        <Route path='/host/account/:active' element={<HostProfilePage />} />
        <Route path='/host/messages' element={<HostMessagePage />} />
        
      </Routes>
    </>
  )
}

export default App

