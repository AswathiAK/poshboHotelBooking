import { format } from 'date-fns';

export const hotelColumns = [
  { field: 'serialNumber', headerName: 'SL.No', width: 100 },
  { field: 'name', headerName: 'Hotel Name', width: 150 },
  { field: 'type', headerName: 'Type', width: 150 },
  { field: 'city', headerName: 'Place', width: 150 },
];

export const bookingsColumns = [
  { field: 'serialNumber', headerName: 'SL.No', width: 70 },
  { field: '_id', headerName: 'Booking Id', width: 150 },
  {
    field: 'userDetails.name',
    headerName: 'Customer Name',
    width: 120,
    renderCell: (params) => params.row.userDetails ? params.row.userDetails[0].name : ''
  },
  {
    field: 'userDetails.mobile',
    headerName: 'Contact No.',
    width: 110,
    renderCell: (params) => params.row.userDetails ? params.row.userDetails[0].mobile : ''
  },
  {
    field: 'checkInDate',
    headerName: 'Check-in',
    width: 90,
    renderCell:(params)=> format(new Date(params.row.checkInDate), 'dd/MM/yyyy')
  },
  {
    field: 'checkOutDate',
    headerName: 'Check-out',
    width: 90,
    renderCell:(params)=> format(new Date(params.row.checkOutDate), 'dd/MM/yyyy')
  },
  { field: 'totalAmount', headerName: 'Amount', width: 80 },
  { field: 'noOfGuests', headerName: 'No.of Guests', width: 100 },
];