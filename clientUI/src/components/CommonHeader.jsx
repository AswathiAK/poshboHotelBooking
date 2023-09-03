import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast, Flip } from "react-toastify";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BedIcon from '@mui/icons-material/Bed';
import SearchIcon from '@mui/icons-material/Search';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PlaceIcon from '@mui/icons-material/Place';
import logo from "../assets/poshbo.svg";
import AccountMenu from './AccountMenu';
import ProfileMenu from './ProfileMenu';
import DateComponent from './DateComponent';
import AddGuestsComponent from './AddGuestsComponent';
import { AuthContext } from '../context/AuthContext';
import axios from "../services/axios";

const CommonHeader = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const userLogout = async () => {
    try {
      const { data } = await axios.post('/users/logout'); 
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
      dispatch({ type: "LOGOUT" });
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
    };
  };
  const [openHamburger, setOpenHamburger] = useState(false);  
  const hamburgerAccountItems = [
    { text: 'Log in', link: '/login' },
    { text: 'Sign up', link: '/register' },
    { text: 'List your property', link: '/host/home' },
    { text: 'Help center', link: '#' }
  ]; 
  const hamburgerProfileItems = [
    { text: 'Messages', link: '/account' },
    { text: 'My Bookings', link: '/account' },
    { text: 'My Account', link: '/account' },
    { text: 'Help center', link: '#' },
    { text: 'Logout', action:userLogout }
  ];

  return (
    <header
      className=" border-b border-gray-300 px-4 md:px-20 flex items-center justify-between h-20 sticky top-0 z-10 bg-white"
    >
      <div className="pr-2 ">
        <Link to={'/'}>
          <img src={logo} alt="logo" className='w-40 '/>
        </Link>
      </div> 
      <div className="hidden sm:flex py-2 pl-5 pr-2 items-center border border-neutral-200 rounded-full shadow-md gap-2
      hover:shadow-neutral-300 ">            
        <div className="flex items-center">
          <span className="text-gray-400 pr-2"><PlaceIcon/></span>
          <input
            type="text"
            className="focus:outline-none w-[100px] bg-transparent hidden lg:flex" 
            placeholder='Search Place'
          />
        </div>
        <div className="text-gray-400">|</div>
        <div className="flex relative items-center">
          <span className="text-gray-400 pr-2"><CalendarMonthIcon/></span>
          <DateComponent/>
        </div>
        <div className="text-gray-400">|</div>
        <div className="flex relative items-center">
          <span className="text-gray-400 pr-2"><BedIcon /></span>
          <AddGuestsComponent/>
        </div>
        <button className=" bg-fuchsia-400 rounded-full text-white p-1">
          <SearchIcon sx={{fontSize:'22px'}}/>
        </button>
      </div>
      <div className="hidden sm:flex items-center ">
        {!user && (
          <div className="text-sm font-medium hover:rounded-full hover:bg-neutral-100 p-3">
            <Link to={'/host/home'}>List your property</Link> 
          </div>
        )}
        <div className="mr-2 hover:rounded-full hover:bg-neutral-100 p-3 cursor-pointer">
          <LanguageRoundedIcon sx={{fontSize:'20px'}}/>
        </div>        
        {user ? <ProfileMenu /> : <AccountMenu />}        
      </div> 
      {/* Hamburgur menu */}
      <div className="flex sm:hidden ">
        <button type='button' onClick={()=>setOpenHamburger(!openHamburger)}>
          <span className='sr-only'>Open Main menu</span>
          {openHamburger ? <CloseIcon /> : <MenuIcon />} 
        </button>
        {/* Hamburgur menu end */}
        {/* Mobile menu */}
        {openHamburger ? (
          <div className="absolute top-20 rounded-md right-0 p-5 bg-white w-screen">
            {user ?
              hamburgerProfileItems.map((item, index) => (
                <Link
                  to={item.link}
                  key={index}
                  className=" hover:bg-gray-100 block px-3 py-3 rounded-md text-md"
                  onClick={item.action}
                >
                  {item.text}
                </Link>
              ))
              :
              hamburgerAccountItems.map((item, index) => (
                <Link to={item.link} key={index} className=" hover:bg-gray-100 block px-3 py-3 rounded-md text-md">
                  {item.text}
                </Link>
              ))
            }
            {/* {hamburgerAccountItems.map((item, index) => (
              <Link to={item.link} key={index} className=" hover:bg-gray-100 block px-3 py-3 rounded-md text-md">
                {item.text}
              </Link>
            ))} */}
          </div>
        ) : null}
      </div>
      {/* mobile menu end */}
    </header>
  )
}

export default CommonHeader
