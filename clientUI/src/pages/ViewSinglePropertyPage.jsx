import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import PropertyHeader from '../components/PropertyHeader';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import Loader from '../components/Loader';

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
            <Loader/>
          </div>
        ) : error ? (
            <div className="flex items-center justify-center h-full">
              {error}
            </div>
          ) : property ? (
              <div className="my-8">
                {property.name}
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

export default ViewSinglePropertyPage
