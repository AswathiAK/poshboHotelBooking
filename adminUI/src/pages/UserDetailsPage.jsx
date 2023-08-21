import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from '../components/Loader';

const UserDetailsPage = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [user, setUser] = useState();
  const { data, loading, error } = useFetch(`/admin/users/${path}`);
  useEffect(() => {
    setUser(data);
  }, [data]);

  return (
    <div className="flex flex-col h-full w-full  overflow-auto">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader/>
        </div>
      ) : error ? (
          <div className="flex items-center justify-center h-full">
            {error}
          </div>
      ) : user ? (
            <div className="w-full border rounded-md flex flex-col">                
              <div className="px-10 py-5 flex items-center justify-center">
                <div className=" flex items-center pr-2 w-1/4">
                  <h1 className="text-lg font-medium">Name of the User</h1>
                </div>
                <span className="text-lg mx-2">:</span>
                <div className="w-1/2">
                  <p className="text-lg">{user.name}</p>
                </div>
              </div>              
              <div className="px-10 py-5 flex items-center justify-center ">
                <div className=" flex items-center pr-2 w-1/4">
                  <h1 className="text-lg font-medium">Role</h1>
                </div>
                <span className="text-lg mx-2">:</span>
                <div className="w-1/2">
                  <p className="text-lg">{user.role}</p>
                </div>
              </div>
              <div className="px-10 py-5 flex items-center justify-center ">
                <div className=" flex items-center pr-2 w-1/4">
                  <h1 className="text-lg font-medium">Email</h1>
                </div>
                <span className="text-lg mx-2">:</span>
                <div className="w-1/2">
                  <p className="text-lg">{user.email}</p>
                </div>
              </div>
              <div className="px-10 py-5 flex items-center justify-center ">
                <div className=" flex items-center pr-2 w-1/4">
                  <h1 className="text-lg font-medium">Contact No.</h1>
                </div>
                <span className="text-lg mx-2">:</span>
                <div className="w-1/2">
                  <p className="text-lg">{user.mobile}</p>
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
  )
}

export default UserDetailsPage
