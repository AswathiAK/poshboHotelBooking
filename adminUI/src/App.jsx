import React from 'react'
import { Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import ProtectedRoute from './services/ProtectedRoute';
import {
  LoginPage, HomePage,
  HotelsListPage, HotelDetailsPage,
  UsersListPage, UserDetailsPage,
  ErrorPage,
  BookingsListPage,
  SalesReportPage
} from "./pages";

function App() {
  return ( 
    <>    
      <ToastContainer />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/reports' element={<SalesReportPage/>}/>
            <Route path='/hotels' element={<HotelsListPage />} />
            <Route path='/hotels/:id' element={<HotelDetailsPage />} />
            <Route path='/users' element={<UsersListPage />} />
            <Route path='/users/:id' element={<UserDetailsPage />} />
            <Route path='/bookings' element={<BookingsListPage />} />
          </Route>
        </Route>
        <Route path='*' element={<ErrorPage/> } />        
      </Routes>
    </>
  )
}

export default App
