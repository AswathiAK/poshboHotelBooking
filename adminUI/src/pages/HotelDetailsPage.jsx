import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import { green } from '@mui/material/colors';

import useFetch from '../hooks/useFetch';
import Loader from '../components/Loader';
import StandardImageList from '../components/ImageList';
import axios from "../services/axios";
import ModalComponent from '../components/ModalComponent';

const HotelDetailsPage = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [hotel, setHotel] = useState();
  const { data, loading, error } = useFetch(`/admin/hotels/${path}`);

  useEffect(() => {
    setHotel(data);
  }, [data]);
 
  const handleVerification = async (id) => {
    try {
      const { data } = await axios.post(`/admin/hotels/verify/${id}`);
      console.log(data.newData);
      setHotel(data.newData);
    } catch (error) {
      const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
      console.log(errorMessage);
    }
  };
  return (
    <div className="flex flex-col h-full w-full  overflow-auto">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-full">
          {error}
        </div>
      ) : hotel ? (
            <div className="flex flex-grow overflow-auto gap-3">
              <div className="w-1/2 border rounded-md flex flex-col overflow-auto ">                
                <div className="p-3 flex items-center ">
                  <div className="w-1/3 flex items-center pr-2">
                    <h1 className="text-lg font-bold">Hotel Name</h1>
                  </div>
                  <span className="text-lg mx-2">:</span>
                  <div className="w-2/3">
                    <p className="text-lg">{hotel.name}</p>
                  </div>
                </div>
                <div className="p-3 flex items-center  ">
                  <div className="w-1/3 flex items-center pr-2">
                    <h1 className="text-lg font-bold">Type of Stay</h1>
                  </div>
                  <span className="text-lg mx-2">:</span>
                  <div className="w-2/3">
                    <p className="text-lg">{hotel.type}</p>
                  </div>
                </div>
                <div className="p-3 flex items-center  ">
                  <div className="w-1/3 flex items-center pr-2">
                    <h1 className="text-lg font-bold">Title</h1>
                  </div>
                  <span className="text-lg mx-2">:</span>
                  <div className="w-2/3">
                    <p className="text-lg">{hotel.title}</p>
                  </div>
                </div>
                <div className="p-3 flex items-center  ">
                  <div className="w-1/3 flex items-center pr-2">
                    <h1 className="text-lg font-bold">Location</h1>
                  </div>
                  <span className="text-lg mx-2">:</span>
                  <div className="w-2/3">
                    <p className="text-lg">{hotel.city}</p>
                  </div>
                </div>
                <div className="p-3 flex items-center  ">
                  <div className="w-1/3 flex items-center pr-2">
                    <h1 className="text-lg font-bold">Address</h1>
                  </div>
                  <span className="text-lg mx-2">:</span>
                  <div className="w-2/3">
                    <p className="text-lg">{hotel.address}</p>
                  </div>
                </div>                 
                <div className="p-3 flex items-center  ">
                  <div className="w-1/3 flex items-center pr-2">
                    <h1 className="text-lg font-bold">Owner</h1>
                  </div>
                  <span className="text-lg mx-2">:</span>
                  <div className="w-2/3">
                    <p className="text-lg">{hotel?.owner?.name} ({hotel?.owner?.mobile})</p>
                  </div>
                </div>
                <div className="p-3 flex items-center  ">
                  <div className="w-1/3 flex items-center pr-2">
                    <h1 className="text-lg font-bold">Price</h1>
                  </div>
                  <span className="text-lg mx-2">:</span>
                  <div className="w-2/3">
                    <p className="text-lg">Rs. {hotel?.cheapestPrice} /-</p>
                  </div>
                </div> 
                <div className="p-3 flex items-center ">
                  <div className="w-1/3 flex items-center pr-2">
                    <h1 className="text-lg font-bold">Description</h1>
                  </div>
                  <span className="text-lg mx-2">:</span>
                  <div className="w-2/3">
                    <p className="text-lg break-words">{hotel.description}</p>
                  </div>
                </div>
                <div className="p-3 flex items-center  ">
                  <div className="w-1/3 flex items-center pr-2">
                    <h1 className="text-lg font-bold">Facilities</h1>
                  </div>
                  <span className="text-lg mx-2">:</span>
                  <div className="w-2/3">
                    {hotel?.perks?.length> 0 && hotel.perks.map((perk, index) => (
                      <p className="text-lg" key={index}>{perk}</p>
                    ))}
                  </div>
                </div>
                <div className="p-3 flex items-center  ">
                  <div className="w-1/3 flex items-center pr-2">
                    <h1 className="text-lg font-bold">Rooms</h1>
                  </div>
                  <span className="text-lg mx-2">:</span>
                  <div className="w-2/3">
                    {hotel?.rooms?.length> 0 && hotel.rooms.map((room, index) => (
                      <p className="text-lg" key={index}>
                        {room.title} &rarr; Rs. {room.price} /-
                      </p>
                    ))}                    
                  </div>
                </div>         
              </div>
              
              <div className="w-1/2 border rounded-md flex flex-col ">
                {/* Top right */}
                <div className="h-1/2 p-4 border-b">
                  <h1 className="text-lg font-bold mb-4">Photos</h1>
                    {/* {hotel?.photos?.length > 0 && hotel.photos.map((photo, index) => ( */}
                      {/* <div  className="mt-4 h-1/2"> */}
                    {/* <img
                      src="https://a0.muscache.com/im/pictures/12b95371-1459-4e2a-b2f2-f468cb0a2256.jpg?im_w=960"
                      alt="photo"
                      className='w-52 rounded-md'
                    /> */}
                  <StandardImageList hotel={hotel} />
                  
                      {/* </div> */}
                      {/* )) */}
                    {/* } */}
                </div>
                
                {/* Bottom right */}
                <div className="h-auto  p-4">
                  <h1 className="text-lg font-bold pb-5">Document Proof</h1>
                  <div className="flex mb-8 justify-center relative" >
                    <img
                      // src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                      src={hotel?.documentProof}
                      alt="photo"
                      className='border rounded-md w-1/2'
                    />
                    <div className="flex items-end  bottom-3 absolute">
                      {/* <ModalComponent image={"https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"} /> */}
                      <ModalComponent image={hotel?.documentProof}  />                      
                    </div>
                  </div>

                  <div className="font-medium">
                    Verify the Property :
                    {hotel.isVerified ?
                      <VerifiedIcon sx={{ color: green[500],margin:'15px' }} /> :
                      <button
                        className='hover:bg-blue-500 text-blue-700 font-medium hover:text-white py-2 px-4 border 
                        border-blue-500 rounded ml-4'
                        onClick={()=>handleVerification(hotel._id)} 
                      >
                        Verify
                      </button>
                    }                    
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              No hotel data available.
            </div>
          )
      }
    </div>
  );
}

export default HotelDetailsPage;
