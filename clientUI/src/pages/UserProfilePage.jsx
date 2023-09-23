import React from 'react'
import { useParams } from 'react-router-dom';
import { PersonalInfo, SidebarUserAccount, UserSecurity } from '../components';

const UserProfilePage = () => {
  const { active } = useParams();

  return (
    <div>
      <main className="h-auto sm:min-h-screen px-4 md:px-20">
        <div className="my-8 flex gap-5">
          <div className="w-1/4 border border-gray-300 rounded-md p-2">
            <SidebarUserAccount activePage={active} />
          </div>
          <div className="w-full border border-gray-300 rounded-md p-2">
            {active === 'personal' && <PersonalInfo />}
            {active === 'bookings' && 'bookings'}            
            {active==='wallet' && 'wallet'}
            {active === 'security' && <UserSecurity />}
          </div>
        </div>
      </main>
    </div>
  )
}

export default UserProfilePage
