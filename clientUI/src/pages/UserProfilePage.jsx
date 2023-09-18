import React from 'react'
import { useParams } from 'react-router-dom';

const UserProfilePage = () => {
  const { active } = useParams();

  return (
    <div>
      <main className="h-auto sm:min-h-screen px-4 md:px-20">
        <div className="my-8 flex gap-5">
          <div className="w-1/4 border border-gray-300 rounded-md p-2">
            Sidebar
          </div>
          <div className="w-full border border-gray-300 rounded-md p-2">
            {active === 'personal' && 'personalinfo'}
            {active === 'bookings' && 'bookings'}            
            
          </div>
        </div>
      </main>
    </div>
  )
}

export default UserProfilePage
