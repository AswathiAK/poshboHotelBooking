// import React, { useState } from 'react'
// import CancelIcon from '@mui/icons-material/Cancel';
// import useFetch from '../hooks/useFetch';
// import Loader from './Loader';

// const ChooseRoomModal = ({ setOpen, hotelId, selectedRooms, setSelectedRooms, isAvailable }) => {
  
//   const { data } = useFetch(`/hotels/${hotelId}`);
  
//   const handleSelect = (e) => {
//     const checked = e.target.checked;
//     const value = e.target.value;
//     setSelectedRooms(
//       checked
//         ? [...selectedRooms, value]
//         : selectedRooms.filter((item) => item !== value)
//     );
//   };
  
//   return (
//     <div className='bg-gray-200 rounded-lg'>
//       <div className="p-5 relative" >
//         <CancelIcon onClick={() => setOpen(false)} className='cursor-pointer absolute top-3 right-3' />
//       </div>
//       {data?.rooms?.map(room => (
//         <div className="flex items-center justify-between gap-12 p-5" key={room._id}>
//           <div className="flex flex-col gap-1">
//             <div className="font-medium">{room.title}</div>
//             <div className="font-medium">Rs. {room.price}/-</div>
//           </div>
//           <div className="flex flex-wrap gap-1">
//             {room.roomNumbers.map(roomNumber => (
//               <div className="flex flex-col" key={roomNumber._id}>
//                 <label>{roomNumber.number}</label>
//                 <input type="checkbox" disabled={!isAvailable(roomNumber)}
//                   value={roomNumber._id}
//                   onChange={handleSelect}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default ChooseRoomModal

import React, { useState, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import useFetch from '../hooks/useFetch';
import Loader from './Loader';

const ChooseRoomModal = ({ setOpen, hotelId, selectedRooms, setSelectedRooms, isAvailable, setTotalPrice }) => {
  const { data } = useFetch(`/hotels/${hotelId}`);
  const [roomPrices, setRoomPrices] = useState({});
  // const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Initialize roomPrices with the default prices from data
    const initialRoomPrices = {};
    data?.rooms?.forEach((room) => {
      room.roomNumbers.forEach((roomNumber) => {
        initialRoomPrices[roomNumber._id] = room.price;
      });
    });
    setRoomPrices(initialRoomPrices);
  }, [data]);

  // Calculate the total price whenever selectedRooms change
  useEffect(() => {
    let total = 0;
    selectedRooms.forEach((roomId) => {
      total += roomPrices[roomId];
    });
    setTotalPrice(total);
  }, [selectedRooms, roomPrices]);

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms((prevSelectedRooms) =>
      checked
        ? [...prevSelectedRooms, value]
        : prevSelectedRooms.filter((item) => item !== value)
    );
  };

  return (
    <div className='bg-blue-50 rounded-lg'>
      <div className="p-5 relative">
        <CancelIcon onClick={() => setOpen(false)} className='cursor-pointer absolute top-3 right-3 ' />
      </div>
      {data?.rooms?.map((room) => (
        <div className="flex items-center justify-between gap-12 p-5" key={room._id}>
          <div className="flex flex-col gap-1">
            <div className="font-medium">{room.title}</div>
            <div className="font-medium">Rs. {room.price}/-</div>
          </div>
          <div className="flex flex-wrap gap-1">
            {room.roomNumbers.map((roomNumber) => (
              <div className="flex flex-col" key={roomNumber._id}>
                <label>{roomNumber.number}</label>
                <input
                  type="checkbox"
                  disabled={!isAvailable(roomNumber)}
                  value={roomNumber._id}
                  onChange={handleSelect}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* <div className="p-5 border-t">
        <div className="font-medium text-right">Total Price: Rs. {totalPrice}/-</div>
      </div> */}
    </div>
  );
};

export default ChooseRoomModal;
