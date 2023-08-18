export const userColumns = [
  // { field: '_id', headerName: 'ID', width: 230 },  
  { field: 'serialNumber', headerName: 'SL.No', width: 100 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'mobile', headerName: 'Mobile', width: 150 }, 
  { field: 'role', headerName: 'Role', width: 100 },    
];

export const hotelColumns = [
  // { field: '_id', headerName: 'ID', width: 230 },
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