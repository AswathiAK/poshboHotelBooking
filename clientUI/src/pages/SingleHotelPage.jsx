// import React, { useContext, useRef } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import PlaceIcon from '@mui/icons-material/Place';
// import StarIcon from '@mui/icons-material/Star';
// import Person4Icon from '@mui/icons-material/Person4';
// import { BookingWidget, ImageGallery, Loader, Map } from '../components';
// import useFetch from '../hooks/useFetch';
// import { AuthContext } from '../context/AuthContext';
// import { toast, Flip } from "react-toastify";
// import axios from "../services/axios";


// const SingleHotelPage = () => {
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);
//   const { data, loading, error } = useFetch(`/hotels/${id}`);
  
//   const mapRef = useRef(null);
//   const scrollToMap = () => {
//     if (mapRef.current) {
//       mapRef.current.scrollIntoView();
//     }
//   };

//   const navigate = useNavigate();

//   const handleClickMessage = async () => {
//     try {
//       if (user) {
//         const requestData = {
//           senderId: user._id,
//           receiverId: data.owner?._id,
//         };
//         const res = await axios.post('/chats',requestData); console.log('data',res.data);
//         navigate(`/account/inbox/messages/${data._id}`);
//       } else {
//         navigate(`/login`);
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
//       toast.error(errorMessage, {
//         position: toast.POSITION.TOP_CENTER,
//         transition: Flip,
//         autoClose: 2000
//       });
//     }
//   };
//   return (
//     <div>
//       <main className="min-h-screen px-4 md:px-20 ">
//         {loading ? (
//           <div className="flex items-center justify-center h-full">
//             <Loader/>
//           </div>
//         ) : error ? (
//             <div className="flex items-center justify-center h-full">
//               {error}
//             </div>
//           ) : data ? (
//               <>
//                 <div className="h-24 pt-7">
//                   <h1 className="text-2xl font-semibold">{data.name}</h1>
//                   <div className="flex items-center py-1 justify-between">
//                     <div className="flex gap-1 items-center cursor-pointer" onClick={scrollToMap}>
//                       <span><PlaceIcon /></span>
//                       <p className="font-medium underline">{data.address}</p>
//                     </div>
//                     <div className="flex gap-1 items-center">
//                       <span><StarIcon sx={{fontSize:'18px'}} /></span>
//                       <p className="text-sm font-medium">4.79 &middot;</p>
//                       <p className="text-sm font-medium underline">24 reviews</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="h-80">
//                   <ImageGallery property={data} />
//                 </div>
//                 <div className="h-fit flex justify-between border-b">
//                   <div className="pt-12 w-2/3 ">
//                     <div className="mb-4 flex justify-between items-center">
//                       <h2 className="text-xl font-medium">Room in a {data.type} hosted by {data.owner?.name}</h2>
//                       {/* <button className="py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-black">
//                         {user ? (
//                           <Link to={`/account/inbox/messages/${data._id}`}>Message Host</Link>
//                         ): (
//                           <Link to={'/login'}>Message Host</Link>
//                         )}
//                       </button> */}

//                       <button onClick={handleClickMessage}
//                         className="py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-black"
//                       >
//                         Message Host
//                       </button>

//                     </div>
//                     <div className="pb-6 border-b">
//                       {data.rooms?.map((room, index) => (
//                         <div className="w-full border rounded-md p-5 mb-2" key={index}>
//                           <h1 className="font-semibold text-lg py-1">{room.title} : Rs. {room.price}/-</h1>
//                           <p className="font-light text-sm py-1">{room.description}</p>
//                           <p className="text-md py-1">Max. No. of Guests : &nbsp;
//                             {Array.from({ length: room.maxGuests }).map((_, i) => (
//                               <Person4Icon key={i} sx={{color:'darkblue'}}/>
//                             ))}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="py-12 border-b">
//                       <div className="pb-4">
//                         <h2 className="text-xl font-medium">About this place</h2>
//                       </div>
//                       <p className="font-light leading-6">{data.description}</p>
//                     </div>
//                     <div className="py-12">
//                       <div className="pb-6">
//                         <h2 className="text-xl font-medium">What this place offers</h2>
//                       </div>
//                       <div className="flex gap-5 ">
//                         {data.perks?.map((perk, index) => (
//                           <div key={index} className="rounded-lg border py-4 px-8 content-center mb-5">
//                             {perk}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="mt-12 ml-20 w-1/3">
//                     <div className="border rounded-xl relative shadow-[0_6px_16px_rgba(0,0,0,0.12)] px-5 py-6">
//                       <BookingWidget />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="py-12 border-b">
//                   <div className="pb-6">
//                     <h2 className="text-xl font-medium">Things to know</h2>
//                   </div>
//                   <div className=" flex flex-col md:flex-row justify-between">
//                     <div className="px-2 w-full md:w-1/4 mb-8 md:mb-0">
//                       <div className="mb-3 ">
//                         <h3 className='font-medium'>House rules</h3>
//                       </div>
//                       <div className="mb-4">
//                         <span className='font-light'>Check in after : <strong>{data.checkInTime}</strong></span>
//                       </div>
//                       <div className="mb-4">
//                         <span className='font-light'>Check out before : <strong>{data.checkOutTime}</strong></span>
//                       </div>
//                     </div>
//                     <div className="px-2 w-full md:w-1/4 mb-8 md:mb-0">
//                       <div className="mb-3 ">
//                         <h3 className='font-medium'>Extra info</h3>
//                       </div>
//                       <div className="mb-4">
//                         <span className='font-light'>
//                           Carbon monoxide alarm not reported
//                         </span>
//                       </div>
//                       <div className="mb-4">
//                         <span className='font-light'>
//                           {data.extraInfo}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="px-2 w-full md:w-1/4 mb-8 md:mb-0">
//                       <div className="mb-3 ">
//                         <h3 className='font-medium'>Cancellation policy</h3>
//                       </div>
//                       <div className="mb-4">
//                         <span className='font-light'>
//                           Cancel before check-in on check in date  for a partial refund.
//                         </span>
//                       </div>
//                       <div className="mb-4">
//                         <span className='font-light'>
//                           Review the Host’s full cancellation policy which applies even if you cancel for illness or disruptions
//                           caused by COVID-19.
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="py-12 border-b" ref={mapRef}>
//                   <div className="pb-6">
//                     <h2 className="text-xl font-medium">Where you'll be</h2>
//                   </div>
//                   <div className="mb-6">
//                     <span className="font-light">{data.address}</span>
//                   </div>
//                   <div>
//                     <Map address={data.address} city={data.city} />
//                   </div>
//                 </div>
//                 <div className="py-12">
//                   <div className="mb-8 flex gap-2 items-center">
//                     <span><StarIcon  /></span>
//                     <h2 className="text-xl font-medium">4.79 &middot;</h2>
//                     <h2 className="text-xl font-medium">24 reviews</h2>
//                   </div>
//                   <div className="flex justify-between ">
//                     <div className="w-1/3">
//                       Highly Recommended.I had a memorable, pleasant stay here at this famous & fascinating 500 year old former
//                       residence of Vasco Da Gama.
//                     </div>
//                     <div className="w-1/3">
//                       Highly Recommended.I had a memorable, pleasant stay here at this famous & fascinating 500 year old former
//                       residence of Vasco Da Gama.
//                     </div>
//                     <div className="w-1/3">
//                       Highly Recommended.I had a memorable, pleasant stay here at this famous & fascinating 500 year old former
//                       residence of Vasco Da Gama.
//                     </div>
//                   </div>
//                 </div>
//               </>
              
//             ) : (
//                 <div className="flex items-center justify-center h-full">
//                   No data available
//                 </div>
//         )}
//       </main>
//     </div>
//   )
// }

// export default SingleHotelPage



import React, { useContext, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from '@mui/icons-material/Star';
import Person4Icon from '@mui/icons-material/Person4';
import { BookingWidget, ImageGallery, Loader, Map } from '../components';
import useFetch from '../hooks/useFetch';
import { AuthContext } from '../context/AuthContext';
import { toast, Flip } from 'react-toastify';
import axios from '../services/axios';

const SingleHotelPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/hotels/${id}`);

  const mapRef = useRef(null);
  const scrollToMap = () => {
    if (mapRef.current) {
      mapRef.current.scrollIntoView();
    }
  };

  const navigate = useNavigate();

  const handleClickMessage = async () => {
    try {
      if (user) {
        const requestData = {
          senderId: user._id,
          receiverId: data.owner?._id,
        };
        const res = await axios.post('/chats', requestData);
        console.log('data', res.data);
        // navigate(`/account/inbox/messages/${data._id}`);
        navigate(`/account/inbox/messages`);

      } else {
        navigate(`/login`);
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
      <main className="min-h-screen px-4 md:px-20">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            {error}
          </div>
        ) : data ? (
          <>
            <div className="h-24 pt-7">
              <h1 className="text-2xl font-semibold">{data.name}</h1>
              <div className="flex flex-col md:flex-row items-center py-1 justify-between">
                <div className="flex gap-1 items-center cursor-pointer" onClick={scrollToMap}>
                  <span><PlaceIcon /></span>
                  <p className="font-medium underline">{data.address}</p>
                </div>
                <div className="flex gap-1 items-center mt-2 md:mt-0">
                  <span><StarIcon sx={{ fontSize: '18px' }} /></span>
                  <p className="text-sm font-medium">4.79 &middot;</p>
                  <p className="text-sm font-medium underline">24 reviews</p>
                </div>
              </div>
            </div>
            <div className="h-80">
              <ImageGallery property={data} />
            </div>
            <div className="md:h-fit flex flex-col md:flex-row justify-between border-b">
              <div className="pt-12 md:w-2/3">
                <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
                  <h2 className="text-xl font-medium md:mr-4">Room in a {data.type} hosted by {data.owner?.name}</h2>
                  <button onClick={handleClickMessage} className="py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-black">
                    Message Host
                  </button>
                </div>
                <div className="pb-6 border-b">
                  {data.rooms?.map((room, index) => (
                    <div className="w-full border rounded-md p-5 mb-2" key={index}>
                      <h1 className="font-semibold text-lg py-1">{room.title} : Rs. {room.price}/-</h1>
                      <p className="font-light text-sm py-1">{room.description}</p>
                      <p className="text-md py-1">Max. No. of Guests : &nbsp;
                        {Array.from({ length: room.maxGuests }).map((_, i) => (
                          <Person4Icon key={i} sx={{ color: 'darkblue' }} />
                        ))}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="py-12 border-b">
                  <div className="pb-4">
                    <h2 className="text-xl font-medium">About this place</h2>
                  </div>
                  <p className="font-light leading-6">{data.description}</p>
                </div>
                <div className="py-12">
                  <div className="pb-6">
                    <h2 className="text-xl font-medium">What this place offers</h2>
                  </div>
                  <div className="flex flex-wrap gap-5">
                    {data.perks?.map((perk, index) => (
                      <div key={index} className="rounded-lg border py-4 px-8 content-center mb-5">
                        {perk}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-12 md:ml-20 w-full md:w-1/3">
                <div className="border rounded-xl relative shadow-[0_6px_16px_rgba(0,0,0,0.12)] px-5 py-6">
                  <BookingWidget />
                </div>
              </div>
            </div>
            <div className="py-12 border-b" ref={mapRef}>
              <div className="pb-6">
                <h2 className="text-xl font-medium">Where you'll be</h2>
              </div>
              <div className="mb-6">
                <span className="font-light">{data.address}</span>
              </div>
              <div>
                <Map address={data.address} city={data.city} />
              </div>
            </div>
            <div className="py-12">
              <div className="mb-8 flex gap-2 items-center">
                <span><StarIcon /></span>
                <h2 className="text-xl font-medium">4.79 &middot;</h2>
                <h2 className="text-xl font-medium">24 reviews</h2>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="w-full md:w-1/3">
                  Highly Recommended. I had a memorable, pleasant stay here at this famous & fascinating 500-year-old former
                  residence of Vasco Da Gama.
                </div>
                <div className="w-full md:w-1/3">
                  Highly Recommended. I had a memorable, pleasant stay here at this famous & fascinating 500-year-old former
                  residence of Vasco Da Gama.
                </div>
                <div className="w-full md:w-1/3">
                  Highly Recommended. I had a memorable, pleasant stay here at this famous & fascinating 500-year-old former
                  residence of Vasco Da Gama.
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            No data available
          </div>
        )}
      </main>
    </div>
  );
};

export default SingleHotelPage;
