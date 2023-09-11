import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, Flip } from "react-toastify";
import { format } from "date-fns";
import { addDays } from 'date-fns';
import DateComponent from './DateComponent';
import AddGuestsComponent from './AddGuestsComponent';
import { SearchContext } from '../context/SearchContext';
import { AuthContext } from '../context/AuthContext';

const BookingWidget = () => {
  const { user } = useContext(AuthContext);
  const { selectedDates, selectedOptions, searchDispatch } = useContext(SearchContext); 
  const navigate = useNavigate();
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState(selectedDates || [
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection'
    }
  ]); 
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState(selectedOptions || {
    room: 1,
    guests: 1
  });
  const [rooms, setRooms] = useState([{ room: options.room, guests: options.guests }]);
  useEffect(() => {
    setDates(selectedDates || [
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 1),
        key: 'selection'
      }
    ]);
    setOptions(selectedOptions || {
      room: 1,
      guests: 1
    });
  }, [selectedDates, selectedOptions]);

  useEffect(() => {
    searchDispatch({ type: "NEW_SEARCH", payload: { dates, options } });
  }, [dates, options, searchDispatch]);

  const handleBooking = () => {
    if (user) {
      console.log(dates, options);
    } else {
      toast.warn("Please login to book", {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
      navigate('/login');
    }
  };

  return (
    <div>
      <div className="border flex items-center justify-between p-3.5">
        <div className="text-sm font-semibold relative" onClick={() => setOpenDate(open => !open)}>
          {`${format(dates[0].startDate, "dd/MM/yy")} - ${format(dates[0].endDate, "dd/MM/yy")}`}                  
        </div>
        {openDate && (
          <div className='absolute top-16 -right-16'>
            <DateComponent setOpen={setOpenDate} dates={dates} setDates={setDates} />
          </div>
        )}           
        <div className="text-gray-400 px-1">|</div>
        <div className="text-sm font-semibold relative" onClick={() => setOpenOptions(open => !open)}>
          {`${options.room} Room · ${options.guests} Guests`}
        </div>
        {openOptions && (
          <div className='w-52 absolute top-16 -right-5'>
            <AddGuestsComponent
              setOpen={setOpenOptions}
              setOptions={setOptions}
              rooms={rooms}
              setRooms={setRooms}
            />
          </div>
        )}           
      </div>
      <div className="border p-3.5 my-4">
        select room
      </div>
      <div className="my-4">
        <button onClick={handleBooking}                
          className="bg-fuchsia-500 rounded-lg text-white w-full p-3 my-3 hover:bg-indigo-950"
        >
          Book Now
        </button>
      </div>
    </div>
  )
}

export default BookingWidget
