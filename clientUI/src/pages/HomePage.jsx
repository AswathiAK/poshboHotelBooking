import React from 'react'
import CommonHeader from '../components/CommonHeader';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <CommonHeader/>
      <main className="h-auto sm:h-screen px-4 md:px-20">
        Home page
      </main>
      <Footer/>
    </div>
  )
}

export default HomePage