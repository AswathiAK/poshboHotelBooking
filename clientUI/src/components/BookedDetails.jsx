// import React, { useContext, useEffect, useState } from 'react'
// import { format } from "date-fns";
// import { AuthContext } from '../context/AuthContext';
// import useFetch from '../hooks/useFetch';
// import Loader from './Loader';
// import Swal from 'sweetalert2'
// import { toast, Flip } from "react-toastify";
// import axios from "../services/axios";

// const BookedDetails = () => {
//   const { user } = useContext(AuthContext);
//   const { data, loading, error } = useFetch(`/bookings/${user._id}/booked-data`);
//   const [list, setList] = useState([]);
//   const [openCancel, setOpenCancel] = useState(true);
//   const [roomCount, setRoomCount] = useState({});
//   useEffect(() => {
//     setList(data);
//     calculateRoomCounts(data);
//     const currentBookingStatus = data.some(item => item.bookingStatus !== 'cancelled');
//     setOpenCancel(currentBookingStatus);
//   }, [data]);

//   const calculateRoomCounts = (data) => {
//     const roomTypeCounts = {};
//     data.forEach(item => {
//       item.roomDetails.forEach(room => {
//         const roomType = room._id;
//         room.roomNumbers.forEach(roomNumber => {
//           if (roomNumber.unAvailableDates && roomNumber.unAvailableDates.length > 0) {
//             if (roomTypeCounts[roomType]) {
//               roomTypeCounts[roomType] += 1;
//             } else {
//               roomTypeCounts[roomType] = 1;
//             }
//           }
//         });
//       });
//     });
//     setRoomCount(roomTypeCounts);
//   };
//   const handleCancelBooking = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: 'Are you sure ?',
//         icon: 'warning',
//         iconColor: '#a35',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!',
//         width: 450,
//         color:'#020274'
//       });
//       if (result.isConfirmed) {
//         const { data } = await axios.put(`/bookings/${user._id}/cancel-booking/${id}`);
//         const updatedList = list.map((item) => {
//           if (item._id === id) {
//             setOpenCancel(false);
//             return { ...item, bookingStatus: 'cancelled' };
//           }
//           return item;
//         });
//         setList(updatedList);
//         toast.success(data.message, {
//           position: toast.POSITION.TOP_CENTER,
//           transition: Flip,
//           autoClose: 2000
//         });
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
//       toast.error(errorMessage, {
//         position: toast.POSITION.TOP_CENTER,
//         transition: Flip,
//         autoClose: 2000
//       });
//     }
//   }
//   return (
//     <div>
//       {loading ? (
//         <div className="flex items-center justify-center h-full">
//           <Loader/>
//         </div>
//       ) : error ? (
//           <div className="flex items-center justify-center h-full">
//             {error}
//           </div>
//         ) : list ? (
//             <div className="my-8">
//               {list.length > 0 && list.map((item) => (
//                 <div key={item._id} className="flex flex-col md:flex-row gap-5">
//                   <div
//                     className="flex items-center border rounded-xl p-4 mb-4 gap-8"
//                   >
//                     <div className="flex items-center justify-center w-40 h-40 md:w-64  border rounded-md shrink-0">
//                       <img src={item.hotelDetails[0].photos[0]} alt="" className='p-1 w-full h-full object-cover'/>
//                     </div>
//                     <div className="md:flex-grow shrink">
//                       <h2 className="font-semibold font-serif">
//                         {item.hotelDetails[0].name}, {item.hotelDetails[0].address}
//                       </h2>
//                       <p className="mt-2 font-medium">
//                         Booking Id: {item._id}
//                       </p>
//                       <p className='mt-2 font-medium'>
//                         Check-in & Check-out :
//                         {format(new Date(item.checkInDate), 'dd/MM/yyyy')} - {format(new Date(item.checkOutDate), 'dd/MM/yyyy')}
//                       </p>
//                       <p className="mt-2 font-medium">
//                         Amount Paid : Rs. {item.totalAmount} /-
//                         (Payment Id: {item.paymentId})
//                       </p>
//                       <div className=" flex gap-3 mt-2 font-medium">
//                         Rooms:
//                         {item.roomDetails.length > 0 && item.roomDetails.map(room => (
//                           <p className="" key={room._id}>
//                             {room.title} - {roomCount[room._id]||0}
//                           </p>
//                         ))}
//                       </div>
//                       <p className="mt-2 font-medium">
//                         Booked on:
//                         {format(new Date(item.createdAt), 'dd/MM/yyyy')}
//                       </p>
//                       <div className="flex items-center justify-between">
//                         <p className="mt-2 font-medium">
//                           Booking Status: {item.bookingStatus}
//                         </p>
//                         {openCancel &&
//                           <button onClick={() => handleCancelBooking(item._id)}
//                             className='text-white bg-black border p-2 rounded-md hover:bg-slate-800'
//                           >
//                             Cancel Booking
//                           </button>
//                         }
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//               <div className="flex items-center justify-center h-full">
//                 No data available
//               </div>
//       )}
//     </div>
//   )
// }

// export default BookedDetails

import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import Loader from './Loader';
import Swal from 'sweetalert2';
import { toast, Flip } from 'react-toastify';
import axios from '../services/axios';

const BookedDetails = () => {
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/bookings/${user._id}/booked-data`);
  const [list, setList] = useState([]);
  const [roomCount, setRoomCount] = useState({});
  useEffect(() => {
    const updatedList = data.map(item => ({
      ...item,
      showCancel: item.bookingStatus !== 'cancelled',
    }));
    setList(updatedList);
    calculateRoomCounts(data);
  }, [data]);

  const calculateRoomCounts = (data) => {
    const roomTypeCounts = {};
    data.forEach(item => {
      item.roomDetails.forEach(room => {
        const roomType = room._id;
        room.roomNumbers.forEach(roomNumber => {
          if (roomNumber.unAvailableDates && roomNumber.unAvailableDates.length > 0) {
            if (roomTypeCounts[roomType]) {
              roomTypeCounts[roomType] += 1;
            } else {
              roomTypeCounts[roomType] = 1;
            }
          }
        });
      });
    });
    setRoomCount(roomTypeCounts);
  };
  const handleCancelBooking = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure ?',
        icon: 'warning',
        iconColor: '#a35',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        width: 450,
        color: '#020274',
      });
      if (result.isConfirmed) {
        const { data } = await axios.put(`/bookings/${user._id}/cancel-booking/${id}`);
        const updatedList = list.map(item => {
          if (item._id === id) {
            return { ...item, bookingStatus: 'cancelled', showCancel: false };
          }
          return item;
        });
        setList(updatedList);
        toast.success(data.message, {
          position: toast.POSITION.TOP_CENTER,
          transition: Flip,
          autoClose: 2000,
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000,
      });
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-full">
          {error}
        </div>
      ) : list.length > 0 ? (
        <div className="my-8">
          {list.map((item) => (
            <div key={item._id} className="flex flex-col md:flex-row gap-5">
              <div
                className="flex items-center border rounded-xl p-4 mb-4 gap-8"
              >
                <div className="flex items-center justify-center w-40 h-40 md:w-64 border rounded-md shrink-0">
                  <img src={item.hotelDetails[0].photos[0]} alt="" className='p-1 w-full h-full object-cover' />
                </div>
                <div className="md:flex-grow shrink">
                  <h2 className="font-semibold font-serif">
                    {item.hotelDetails[0].name}, {item.hotelDetails[0].address}
                  </h2>
                  <p className="mt-2 font-medium">
                    Booking Id: {item._id}
                  </p>
                  <p className='mt-2 font-medium'>
                    Check-in & Check-out :
                    {format(new Date(item.checkInDate), 'dd/MM/yyyy')} - {format(new Date(item.checkOutDate), 'dd/MM/yyyy')}
                  </p>
                  <p className="mt-2 font-medium">
                    Amount Paid : Rs. {item.totalAmount} /-
                    (Payment Id: {item.paymentId})
                  </p>
                  <div className=" flex gap-3 mt-2 font-medium">
                    Rooms:
                    {item.roomDetails.length > 0 && item.roomDetails.map(room => (
                      <p className="" key={room._id}>
                        {room.title} - {roomCount[room._id]||0}
                      </p>
                    ))}
                  </div>
                  <p className="mt-2 font-medium">
                    Booked on:
                    {format(new Date(item.createdAt), 'dd/MM/yyyy')}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="mt-2 font-medium">
                      Booking Status: {item.bookingStatus}
                    </p>
                    {item.showCancel && (
                      <button onClick={() => handleCancelBooking(item._id)}
                        className='text-white bg-black border p-2 rounded-md hover:bg-slate-800'
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          No data available
        </div>
      )}
    </div>
  );
};

export default BookedDetails;
