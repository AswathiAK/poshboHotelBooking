import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast, Flip } from "react-toastify";
import { differenceInCalendarDays, format } from "date-fns";
import { addDays } from 'date-fns';
import DateComponent from './DateComponent';
import AddGuestsComponent from './AddGuestsComponent';
import { SearchContext } from '../context/SearchContext';
import { AuthContext } from '../context/AuthContext';
import ChooseRoomModal from './ChooseRoomModal';
import axios from "../services/axios";
import useFetch from '../hooks/useFetch';

const BookingWidget = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { selectedDates, selectedOptions, searchDispatch } = useContext(SearchContext);
  const { data } = useFetch(`/hotels/${id}`);
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

  
  const [openChooseRoom, setOpenChooseRoom] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];
    while (start <= end) {
      dates.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    return dates;
  };
  const getNumberOfNights = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const noOfNights = differenceInCalendarDays(end, start);
    return noOfNights;
  }
  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  const totalNights = getNumberOfNights(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unAvailableDates.some(date =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleBooking = async() => {
    if (user) {
      try {
        
        // await Promise.all(selectedRooms.map(roomId => {
        //   const { data } = axios.patch(`/rooms/${user._id}/${roomId}`, { dates: allDates });
        //   return data;
        // }));
      } catch (error) {
        const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          transition: Flip,
          autoClose: 2000
        });
      }
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
      <div className="border p-3.5 my-4" onClick={()=>setOpenChooseRoom(open=>!open)}>
        select room
      </div>
      {openChooseRoom &&
        <ChooseRoomModal setOpen={setOpenChooseRoom} hotelId={id} selectedRooms={selectedRooms}
          setSelectedRooms={setSelectedRooms} isAvailable={isAvailable}
        />
      }
      <div className="my-4" >
        <h3 className="text-lg font-semibold">Price Details</h3>
        <div className="flex justify-between pt-3">
          <span className="text-sm">
            Rs. {data?.cheapestPrice} X {totalNights} nights X {options.room} room
          </span>
          <p className="text-base font-medium">
            Rs. {data?.cheapestPrice * totalNights * options.room} /-
          </p>
        </div>
        <div className="flex justify-between py-5 border-b-2 border-dotted border-gray-500">
          <span className="text-sm">
            Taxes(18% GST)
          </span>
          <p className="text-base font-medium">
            Rs. {data?.cheapestPrice * totalNights * options.room * 18/100} /-
          </p>
        </div>
        <div className="flex justify-between pt-5">
          <span className="text-base font-medium">
            Total Amount
          </span>
          <p className="text-base font-medium">
            Rs. {(data?.cheapestPrice * totalNights * options.room) + (data?.cheapestPrice * totalNights * options.room * 18/100)} /-
          </p>
        </div>
      </div>
      <div className="my-4">
        <button onClick={handleBooking} type='button'
          className="bg-fuchsia-500 rounded-lg text-white w-full p-3 my-3 hover:bg-indigo-950"
        >
          Book Now
        </button>
      </div>
    </div>
  )
}

export default BookingWidget
