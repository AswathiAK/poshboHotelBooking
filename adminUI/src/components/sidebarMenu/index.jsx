import DashboardIcon from '@mui/icons-material/Dashboard';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import HelpIcon from '@mui/icons-material/Help';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

export const SidebarLinks = [
  {
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <DashboardIcon/>
  },
  {
		key: 'hotels',
		label: 'Hotels',
		path: '/hotels',
		icon: <MapsHomeWorkIcon/>
  },
  {
		key: 'users',
		label: 'Users',
		path: '/users',
		icon: <PeopleAltIcon/> 
	},
	{
		key: 'bookings',
		label: 'Bookings',
		path: '/bookings',
		icon: <BookOnlineIcon/> 
	}
];

export const SidebarBottomLinks = [
  {
		key: 'settings',
		label: 'Settings',
		path: '#',
		icon: <SettingsApplicationsIcon/>
  },
  {
		key: 'support',
		label: 'Help & Support',
		path: '#',
		icon: <HelpIcon/>
	}
]