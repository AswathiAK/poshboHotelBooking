import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, Flip } from "react-toastify";
import { useFormik } from "formik";
import { propertyFormValidation } from '../formValidate';
import PropertyHeader from '../components/PropertyHeader';
import Footer from '../components/Footer';
import DocPreview from '../components/DocPreview';
import axios from "../services/axios";
import axiosToUrl from 'axios';
import Loader from "../components/Loader";
import PerksItems from '../components/PerksItems';
import PhotosUploadPreview from '../components/PhotosUploadPreview';
  
const AddPropertyPage = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    type: "",
    title: "",
    city: "",
    address: "",
    description: "",
    extraInfo: "",
    checkInTime: "",
    checkOutTime: "",
    cheapestPrice: "",
    documentProof: null,    
    perks: [],
    photos: [],
  };

  const availablePerks = [
    { name: 'wifi', label: 'Wifi' },
    { name: 'parking', label: 'Free Parking spot' },
    { name: 'swimming pool', label: 'Swimming pool' },
    { name: 'AC', label: 'Air conditioning' },
    { name: 'tv', label: 'TV' },
    { name: 'radio', label: 'Radio' },
    { name: 'pets', label: 'Pets' },
    { name: 'airport shuttle', label: 'Airport shuttle' },
    { name: 'fitness center', label: 'Fitness center' },    
  ];
  
  // const handleAddProperty = async (values, action) => {
  //   const { documentProof } = values;
  //   const formData = new FormData();
  //   formData.append("file", documentProof);
  //   formData.append("upload_preset", "upload");
  //   setLoading(true);
  //   try {
  //     const uploadResponse = await axiosToUrl.post('https://api.cloudinary.com/v1_1/dr2r9xviv/image/upload', formData);
  //     const docProofUrl = uploadResponse.data.url;
  //     const propertyData = { ...values };
  //     delete propertyData.documentProof;
  //     propertyData.documentProof = docProofUrl;
  //     const { data } = await axios.post('/hotels', propertyData); console.log('data from backend', data);
  //     toast.success(data.message, {
  //       position: toast.POSITION.TOP_CENTER,
  //       transition: Flip,
  //       autoClose: 2000
  //     });
  //     action.resetForm(); 
  //     navigate('/host/home');
  //   } catch (error) {
  //     toast.error(error.message, {
  //       position: toast.POSITION.TOP_CENTER,
  //       transition: Flip,
  //       autoClose: 2000
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  const handleAddProperty = async (values, action) => {
    const { documentProof } = values;
    const { photos } = values; 
    try {
      setLoading(true);   
      const formData = new FormData();
      formData.append("file", documentProof);
      formData.append("upload_preset", "upload");
      const uploadResponse = await axiosToUrl.post('https://api.cloudinary.com/v1_1/dr2r9xviv/image/upload', formData);
      const docProofUrl = uploadResponse.data.url;
      // setLoading(true);  
      const photosList = await Promise.all(
        photos.map(async (file) => {
          const formPhoto = new FormData();
          formPhoto.append("file", file);
          formPhoto.append("upload_preset", "upload");
          const uploadPhotos = await axiosToUrl.post('https://api.cloudinary.com/v1_1/dr2r9xviv/image/upload', formPhoto);
          const photosUrl = uploadPhotos.data.url;
          return photosUrl;
        })
      );      
      const propertyData = { ...values };
      delete propertyData.documentProof;
      delete propertyData.photos;
      propertyData.documentProof = docProofUrl;
      propertyData.photos = photosList;      
      const { data } = await axios.post('/hotels', propertyData); 
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
      action.resetForm(); 
      navigate('/host/view_properties');
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
    } finally {
      setLoading(false);
    }
  }; 
  
  const { values, errors, touched, handleBlur, handleChange, handleSubmit ,setFieldValue } = useFormik({    
    initialValues: initialValues,
    validationSchema:propertyFormValidation,    
    onSubmit:handleAddProperty
  });  

  return (
    <div>
      <PropertyHeader/>
      <main className='min-h-screen px-4 md:px-20'>
        {loading ?
          <Loader />
          : (            
            <div className="my-8 p-4 border border-neutral-500 rounded-xl">
              <form onSubmit={handleSubmit}>
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Name of the property</label>
                  <input type="text" name='name'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.name}
                    </div>
                  ): null}
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Type of the property</label>
                  <select name='type'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" disabled>Select Property type</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Resort">Resort</option>
                  </select>
                  {errors.type && touched.type ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.type}
                    </div>
                  ): null}
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Title</label>
                  <input type="text" name='title'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.title}
                    </div>
                  ): null}
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Location</label>
                  <input type="text" name='city'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.city && touched.city ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.city}
                    </div>
                  ): null}
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Address</label>
                  <input type="text" name='address'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.address && touched.address ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.address}
                    </div>
                  ): null}
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>About the property</label>
                  <textarea name='description'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.description && touched.description ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.description}
                    </div>
                  ): null}
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Extra Information</label>
                  <textarea type="text" name='extraInfo'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.extraInfo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.extraInfo && touched.extraInfo ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.extraInfo}
                    </div>
                  ): null}
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Check In & Check Out Times</label>
                  <div className="flex justify-between">
                    <div className="w-1/2">
                      <label className="block mt-2">Check In time</label>
                      <input type="text" name='checkInTime' placeholder='12:00 pm'
                        className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                        value={values.checkInTime}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.checkInTime && touched.checkInTime ? (
                        <div className="text-red-500 rounded-lg text-sm pt-2">
                          {errors.checkInTime}
                        </div>
                      ): null}
                    </div>
                    <div className="w-1/2">
                      <label className="block mt-2">Check Out time</label>
                      <input type="text" name='checkOutTime' placeholder='11:00 am'
                        className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                        value={values.checkOutTime}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.checkOutTime && touched.checkOutTime ? (
                        <div className="text-red-500 rounded-lg text-sm pt-2">
                          {errors.checkOutTime}
                        </div>
                      ): null}
                    </div>
                  </div>              
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Price starts from</label>
                  <input type="number" name='cheapestPrice'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.cheapestPrice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.cheapestPrice && touched.cheapestPrice ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.cheapestPrice}
                    </div>
                  ): null}
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Select Amenities</label>
                  <PerksItems selectedPerks={values.perks} availablePerks={availablePerks} 
                    onPerkChange={(perkName, isChecked) => {
                      if (isChecked) {
                        setFieldValue('perks', [...values.perks, perkName]);
                      } else {
                        setFieldValue('perks', values.perks.filter(perk => perk !== perkName));
                      }
                    }}
                  />                  
                  {errors.perks && touched.perks ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.perks}
                    </div>
                  ) : null}
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Add Property Document</label>
                  {values.documentProof && <DocPreview file={values.documentProof}/> } 
                  <input type="file" name='documentProof' 
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    onChange={(e)=>setFieldValue("documentProof",e.target.files[0])}
                    onBlur={handleBlur}
                  />
                  {errors.documentProof && touched.documentProof ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.documentProof}
                    </div>
                  ) : null}
                </div>               
                
                {/* <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Upload Photos</label>
                  <input type="file" name='photos'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    onChange={(e) => setFieldValue("photos", Array.from(e.target.files))}
                    onBlur={handleBlur}
                    multiple
                  />                  
                  <PhotosUploadPreview photos={values.photos} />                  
                  {errors.photos && touched.photos ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.photos}
                    </div>
                  ): null}
                </div> */}

                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Upload Photos</label>                  
                  <PhotosUploadPreview photos={values.photos}
                    onChange={(e) => setFieldValue("photos", Array.from(e.target.files))} 
                    onBlur={handleBlur}
                  />                  
                  {errors.photos && touched.photos ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.photos}
                    </div>
                  ): null}
                </div>
                <button
                  type='submit'
                  className="bg-fuchsia-500 rounded-lg text-white w-full p-3 my-3 hover:bg-indigo-950"
                >
                  Save 
                </button>
              </form>              
            </div>
          )}        
      </main>
      <Footer/>
    </div>
  )
}

export default AddPropertyPage
