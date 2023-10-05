import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import SecurityIcon from '@mui/icons-material/Security';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export const sidebarMenuItems = [
  {
    route: 'personal',
    link: '/account/personal',
    icon: <ManageAccountsIcon />,
    text: 'Personal Details'
  },
  {
    route: 'bookings',
    link: '/account/bookings',
    icon: <BookOnlineIcon />,
    text: 'My Bookings'
  },
  {
    route: 'wallet',
    link: '/account/wallet',
    icon: <AccountBalanceWalletIcon />,
    text: 'My Wallet'
  },
  {
    route: 'security',
    link: '/account/security',
    icon: <SecurityIcon />,
    text: 'Security'
  },
];

export const sidebarHostItems = [
  {
    route: 'personal',
    link: '/host/account/personal',
    icon: <ManageAccountsIcon />,
    text: 'Personal Details'
  },
  {
    route: 'bookings',
    link: '/host/account/bookings',
    icon: <BookOnlineIcon />,
    text: 'Bookings'
  },
  {
    route: 'earnings',
    link: '/host/account/earnings',
    icon: <MonetizationOnIcon />,
    text:'Earnings'
  },
  {
    route: 'security',
    link: '/host/account/security',
    icon: <SecurityIcon />,
    text: 'Security'
  },
];
