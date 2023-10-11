import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { bookingColumns } from '../components/dataTableLists';
import useFetch from '../hooks/useFetch';
import Loader from "../components/Loader";

const BookingsListPage = () => {
  const { data, loading, error } = useFetch('/admin/bookings');
  const [list, setList] = useState([]);
  // useEffect(() => {
  //   if (data) {
  //     const newList = data.map((item, index) => ({
  //       ...item,
  //       'serialNumber': index + 1
  //     }));
  //     setList(newList);
  //   }
  // }, [data]);

  useEffect(() => {
    if (data) {
      const newList = data.map((item, index) => ({
        ...item,
        'serialNumber': index + 1
      }));
      const newListWithCommission = newList.map(item => ({
        ...item,
        'commission': calculateCommission(item),
      }));
      setList(newListWithCommission);
    }
  }, [data]);
  const calculateCommission = (booking) => {
    if (booking.bookingStatus === 'checkedIn' || booking.bookingStatus === 'notCheckedIn') {
      return (booking.totalAmount * 0.05).toFixed(2);
    } else {
      return 0;
    }
  };
  const commissionColumn = { field: 'commission', headerName: 'Commission (5%)', width: 150 };
  const bookingColumnsWithCommission = [...bookingColumns, commissionColumn];
  return (
    <div className='h-full'>
      {
        loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            {error}
          </div>
        ) : list ? (
          <div style={{ height: '100%', width: '100%' }} >
            <DataGrid
              rows={list}
              columns={bookingColumnsWithCommission}
              initialState={{
                pagination: {
                  paginationModel: { page: 1, pageSize: 20 },
                },
              }}
              pageSizeOptions={[10, 20, 50]}
              checkboxSelection
              getRowId={row=>row._id}
            />
          </div>  
        ) : (
          <div className="flex items-center justify-center h-full">
            No  data available.
          </div>
        )
      } 
    </div>
  )
}

export default BookingsListPage

