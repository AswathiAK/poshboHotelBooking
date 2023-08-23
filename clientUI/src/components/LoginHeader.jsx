import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import logo from "../assets/poshbo.svg";

const LoginHeader = () => {
  const [openHamburger, setOpenHamburger] = useState(false);
  const hamburgerMenuItems = [
    { text: 'Log in', link: '/login' },
    { text: 'Sign up', link: '/register' },
    { text: 'List your property', link: '/' },
    { text: 'Help center', link: '#' }
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header
      className=" border-b border-gray-300 px-4 md:px-20 flex items-center justify-between h-20 sticky top-0 z-10 bg-white"
    >
      <div className="bg-orang-500 w-[570px]">
        <Link to={'/'}>
          <img src={logo} alt="logo" className='w-40'/>
        </Link>
      </div>    
      <div className="hidden sm:flex items-center w-[570px] justify-end">
        <div className="text-sm font-medium hover:rounded-full hover:bg-neutral-100 p-3">
          <Link to={'/'}>List your property</Link> 
        </div>
        <div className="mr-2 hover:rounded-full hover:bg-neutral-100 p-3 cursor-pointer">
          <LanguageRoundedIcon sx={{fontSize:'20px'}}/>
        </div>
        <div className="border border-gray-300 rounded-full pl-3 pr-1 py-1 hover:shadow-md">
          <IconButton
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            disableelevation="true"
            style={{
              padding: '0',
              backgroundColor: 'transparent',
              '&:hover': { backgroundColor: 'transparent', },
              '&:active':{ backgroundColor: 'transparent' }
            }}
          >
            <MenuIcon sx={{fontSize:'20px', color:'#444',marginRight:'8px'}}/>
            <AccountCircleIcon sx={{fontSize:'33px', color:'#666'}}/>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 2, width:'240px', borderRadius:'13px',
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 0,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },                  
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose} sx={{ fontSize: '14px', fontWeight: 'bold', pt: 1, pb: 2 }}>
              <Link to={'/login'}>Log in</Link> 
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              sx={{ fontSize: '14px', pt: 1, pb: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.10)' }}
            >
              <Link to={'/register'}>Sign up</Link> 
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ fontSize: '14px', pt: 3, pb: 2 }}>
              <Link to={'/'}>List your property</Link> 
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ fontSize: '14px', pt: 1, pb: 2 }}>
              <Link to={'#'}>Help center</Link> 
            </MenuItem>
          </Menu>            
        </div>
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
            {hamburgerMenuItems.map((item, index) => (
              <Link to={item.link} key={index} className=" hover:bg-gray-100 block px-3 py-3 rounded-md text-md">
                {item.text}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      {/* mobile menu end */}
    </header>
  )
}

export default LoginHeader
