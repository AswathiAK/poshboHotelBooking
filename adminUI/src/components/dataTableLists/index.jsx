import { format } from "date-fns";

export const userColumns = [
  { field: 'serialNumber', headerName: 'SL.No', width: 100 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'mobile', headerName: 'Mobile', width: 150 }, 
  { field: 'role', headerName: 'Role', width: 100 },    
];

export const hotelColumns = [
  { field: 'serialNumber', headerName: 'SL.No', width: 100 },
  { field: 'name', headerName: 'Hotel Name', width: 150 },
  {
    field: 'owner.name',
    headerName: 'Owner Name',
    width: 150,
    renderCell: (params) => params.row.owner ? params.row.owner.name : ''
  },
  { field: 'type', headerName: 'Type', width: 150 },
  { field: 'city', headerName: 'Place', width: 150 },
];

export const bookingColumns = [
  { field: 'serialNumber', headerName: 'SL.No', width: 100 },
  { field: '_id', headerName: 'Booking ID', width: 230 },
  {
    field: 'hotel.name',
    headerName: 'Hotel Name',
    width: 150,
    renderCell: (params) => params.row.hotel ? params.row.hotel.name : ''
  },
  { field: 'totalAmount', headerName: 'Total Amount', width: 150 },
  { field: 'bookingStatus', headerName: 'Booking Status', width: 150 }
];

export const reportColumns = [
  { field: 'serialNumber', headerName: 'SL.No', width: 50 },
  {
    field: 'createdAt',
    headerName: 'Date',
    width: 100,
    renderCell:(params)=> format(new Date(params.row.createdAt), 'dd/MM/yyyy')
  },
  { field: '_id', headerName: 'Booking ID', width: 230 },
  {
    field: 'hotel.name',
    headerName: 'Hotel Name',
    width: 150,
    renderCell: (params) => params.row.hotel ? params.row.hotel.name : ''
  },
  { field: 'totalAmount', headerName: 'Total Amount', width: 100 },
];