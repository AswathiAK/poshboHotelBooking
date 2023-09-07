import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { green, yellow } from '@mui/material/colors';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import { Footer, ImageSlider, Loader, PropertyHeader, RoomFormModal } from '../components';
import RoomFormPage from './RoomFormPage';

const ViewSinglePropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState();
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/hotels/${user._id}/${id}`);
  useEffect(() => {
    setProperty(data);
  }, [data]);
  
  return (
    <div>
      <PropertyHeader />
      <main className="min-h-screen px-4 md:px-20">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : error ? (
            <div className="flex items-center justify-center h-full">
              {error}
            </div>
          ) : property ? (
              <div className="flex flex-grow overflow-auto gap-3 my-8">
                <div className="w-1/2 border rounded-md flex flex-col overflow-auto p-5">
                  <div className="py-2 flex items-center ">                    
                    <div className="w-1/3 flex items-center pr-2">                      
                      <h1 className="text-lg font-bold">Hotel Name</h1>                      
                    </div>                    
                    <span className="text-lg mx-2">:</span>
                    <div className="w-2/3">
                      <p className="text-lg">{property.name}</p>
                    </div>
                  </div>
                  <div className="py-2 flex items-center  ">
                    <div className="w-1/3 flex items-center pr-2">
                      <h1 className="text-lg font-bold">Type of Stay</h1>
                    </div>
                    <span className="text-lg mx-2">:</span>
                    <div className="w-2/3">
                      <p className="text-lg">{property.type}</p>
                    </div>
                  </div>
                  <div className="py-2 flex items-center  ">
                    <div className="w-1/3 flex items-center pr-2">
                      <h1 className="text-lg font-bold">Title</h1>
                    </div>
                    <span className="text-lg mx-2">:</span>
                    <div className="w-2/3">
                      <p className="text-lg">{property.title}</p>
                    </div>
                  </div>
                  <div className="py-2 flex items-center  ">
                    <div className="w-1/3 flex items-center pr-2">
                      <h1 className="text-lg font-bold">Location</h1>
                    </div>
                    <span className="text-lg mx-2">:</span>
                    <div className="w-2/3">
                      <p className="text-lg">{property.city}</p>
                    </div>
                  </div>
                  <div className="py-2 flex items-center  ">
                    <div className="w-1/3 flex items-center pr-2">
                      <h1 className="text-lg font-bold">Address</h1>
                    </div>
                    <span className="text-lg mx-2">:</span>
                    <div className="w-2/3">
                      <p className="text-lg">{property.address}</p>
                    </div>
                  </div> 
                  <div className="py-2 flex items-center  ">
                    <div className="w-1/3 flex items-center pr-2">
                      <h1 className="text-lg font-bold">Check-in Time</h1>
                    </div>
                    <span className="text-lg mx-2">:</span>
                    <div className="w-2/3">
                      <p className="text-lg">{property.checkInTime}</p>
                    </div>
                  </div> 
                  <div className="py-2 flex items-center  ">
                    <div className="w-1/3 flex items-center pr-2">
                      <h1 className="text-lg font-bold">Check-out Time</h1>
                    </div>
                    <span className="text-lg mx-2">:</span>
                    <div className="w-2/3">
                      <p className="text-lg">{property.checkOutTime}</p>
                    </div>
                  </div> 
                  <div className="py-2 flex items-center  ">
                    <div className="w-1/3 flex items-center pr-2">
                      <h1 className="text-lg font-bold">Facilities</h1>
                    </div>
                    <span className="text-lg mx-2">:</span>
                    <div className="w-2/3">
                      {property.perks?.length> 0 && property.perks.map((perk, index) => (
                        <p className="text-lg" key={index}>{perk}</p>
                      ))}
                    </div>
                  </div>
                  <div className="py-2 flex items-center  ">
                    <div className="w-1/3 flex items-center pr-2">
                      <h1 className="text-lg font-bold">Verification Status</h1>
                    </div>
                    <span className="text-lg mx-2">:</span>
                    <div className="w-2/3">
                      {property.isVerified ?
                        <VerifiedIcon sx={{ color: green[500], margin: '15px' }} /> :
                        <PendingActionsIcon sx={{ color: yellow[500], margin: '15px' }}/>                        
                      } 
                    </div>
                  </div> 
                  <div className="py-2 flex items-center  ">
                    <div className="w-1/3 flex items-center pr-2">
                      <h1 className="text-lg font-bold">Rooms</h1>
                    </div>
                    <span className="text-lg mx-2">:</span>
                    <div className="w-2/3">
                      {/* <button
                        className='hover:bg-blue-500 text-blue-700 font-medium hover:text-white py-2 px-4 border 
                        border-blue-500 rounded ml-4'
                        onClick={handleAddRooms} 
                      >
                        Add Rooms
                      </button> */}
                      <RoomFormModal title="Add Room" >
                        <RoomFormPage propertyId={property._id} />
                      </RoomFormModal>                      
                    </div>
                  </div> 
                </div>                
                <div className="w-1/2 border rounded-md flex flex-col ">
                {/* Top right */}
                  <div className="h-1/2 p-5 border-b ">                    
                    <h1 className="text-lg font-bold mb-4 p-2">Photos</h1>   
                    <div className="py-2 my-0 mx-auto w-[500px] h-[280px]">
                      <ImageSlider property={property} />
                    </div>
                  </div>                 
                {/* Bottom right */}
                  <div className="h-auto p-5">
                    <h1 className="text-lg font-bold p-2">Document Proof</h1>
                    <div className="flex my-5 justify-center" >
                      <img
                        src={property.documentProof}
                        alt="photo"
                        className='border rounded-md w-1/2 object-cover'
                      />                      
                    </div> 
                  </div>
                </div>
              </div>
            ) : (
                <div className="flex items-center justify-center h-full">
                  No data available
                </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default ViewSinglePropertyPage
