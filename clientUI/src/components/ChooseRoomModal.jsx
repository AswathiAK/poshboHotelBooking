import React, { useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import useFetch from '../hooks/useFetch';
import Loader from './Loader';

const ChooseRoomModal = ({ setOpen, hotelId, selectedRooms, setSelectedRooms, isAvailable }) => {
  
  const { data, loading, error } = useFetch(`/hotels/${hotelId}`); 
  
  const handleSelect = (e) => {
    const checked = e.target.checked; 
    const value = e.target.value; 
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  
  return (
    <div className=''>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader/>
        </div>
      ) : error ? (
          <div className="flex items-center justify-center h-full">
            {error}
          </div>
        ) : data ? (
            <>
              <div className="p-5 relative" >
                <CancelIcon onClick={() => setOpen(false)} className='cursor-pointer absolute top-3 right-3'/>
              </div>
              {data.rooms?.map(room => (
                <div className="flex items-center justify-between gap-12 p-5" key={room._id}>
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">{room.title}</div>                    
                    <div className="font-medium">Rs. {room.price}/-</div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {room.roomNumbers?.map(roomNumber => ( 
                      <div className="flex flex-col" key={roomNumber._id}>
                        <label>{roomNumber.number}</label> 
                        <input type="checkbox" disabled={!isAvailable(roomNumber)}
                          value={roomNumber._id}
                          onChange={handleSelect}
                        /> 
                      </div>              
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
              <div className="flex items-center justify-center h-full">
                No data available
              </div>
      )}
      
    </div>
  )
}

export default ChooseRoomModal
