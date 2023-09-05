import React from 'react'
import { Link } from 'react-router-dom';
import CommonHeader from '../components/CommonHeader';
import Footer from '../components/Footer';
import useFetch from '../hooks/useFetch';
import Loader from '../components/Loader';

const HomePage = () => {
  const { data, loading, error } = useFetch(`/hotels`);
  console.log(data);
  return (
    <div>
      <CommonHeader/>
      <main className="h-auto sm:h-screen px-4 md:px-20">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader/>
          </div>
        ) : error ? (
            <div className="flex items-center justify-center h-full">
              {error}
            </div>
          ) : data ? (
              <div className="my-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-8">
                {data.length > 0 && data.map(item => (
                  <Link to={'/'} className="" key={item._id}>
                    <div className="bg-gray-500 mb-2 rounded-2xl flex">
                      {item.photos?.[0] && (
                        <img src={item.photos?.[0]} alt="property photo" className="rounded-2xl object-cover aspect-square" />
                      )}
                    </div>
                    <h2 className="font-bold">{item.city}</h2>
                    <h3 className="text-sm text-gray-500">{item.title}</h3>
                    <div className="mt-1">
                      <span className="font-medium">Rs. {item.cheapestPrice}/- onwards</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
                <div className="flex items-center justify-center h-full">
                  No data available
                </div>
        )}
      </main>
      <Footer/>
    </div>
  )
}

export default HomePage
