import React from 'react';
import classNames from "classnames";
import LogoutIcon from '@mui/icons-material/Logout';
import logo from "../assets/poshbologo.svg"
import { SidebarBottomLinks, SidebarLinks } from './sidebarMenu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../services/axios';

const linkClass = 'flex items-center gap-2 px-3 py-2 hover:bg-gray-400 hover:no-underline hover:text-white active:bg-neutral-600 rounded-sm font-medium ';

const Sidebar = () => { 
  const navigate = useNavigate();
  const handleLogout = async() => {
    await axios.post('/admin/logout');
    navigate('/login');
  };

  return (
    <div className='w-60 p-3 flex flex-col border-r border-gray-400'>
      <Link to={'/'} className="flex items-center gap-2 px-2 hover:no-underline ">
        <img src={logo} alt="Poshbo Logo" className='w-12' /> 
        <span className='text-2xl font-bold text-blue-900'>Admin</span>
      </Link>
      <div className="flex  flex-col gap-1 py-8 ">
        {SidebarLinks.map((item) => (
          <SidebarItems key={item.key} item={item} />
        ))}
      </div>
      <div className="flex flex-col gap-1 pt-2 border-t border-neutral-700">
        {SidebarBottomLinks.map((item) => (
          <SidebarItems key={item.key} item={item} />
        ))}
      </div>
      <div className={classNames('text-pink-400 cursor-pointer', linkClass)} onClick={handleLogout}>
        <span className="text-xl"><LogoutIcon/></span>
        Logout
      </div>
    </div>
  )
}

const SidebarItems = ({ item }) => {  
  const { pathname } = useLocation();  
  return (
    <Link to={item.path}
      className={classNames(pathname === item.path ? 'bg-neutral-600 text-white' : 'text-slate-600', linkClass)}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  )
}

export default Sidebar
