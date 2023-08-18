// import React from 'react'
// import Sidebar from './Sidebar';
// import Navbar from './Navbar';
// import Footer from './Footer';
// import { Outlet } from 'react-router-dom';


// const Layout = () => {
//   return (
//     <div className='flex h-screen w-screen '>
//       <Sidebar />
//       <div className="flex flex-col w-full overflow-auto">
//         <div className="bg-white ">
//           <Navbar />
//         </div>
//         <div className="flex-1 flex flex-col overflow-hidden">
//           <div className="bg-lime-50 flex-1 p-4 overflow-auto">
//             <Outlet/>
//           </div>
//           <div className='mt-auto'>
//             <Footer/>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Layout


import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='flex flex-row min-h-screen'>
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="bg-white">
          <Navbar />
        </div>
        <div className="flex flex-grow overflow-auto p-4">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
