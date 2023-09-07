import React from 'react'
import { useFormik } from "formik";
import { roomFormValidation } from '../formValidate';

const RoomFormPage = ({propertyId}) => {
  const initialValues = {
    title: "",
    price:"",
    maxGuests: "",
    description: "",
    roomNumbers:[]
  }; 
  const handleAddRoom = () => {
    console.log(propertyId);
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({    
    initialValues: initialValues,
    validationSchema:roomFormValidation,    
    onSubmit:handleAddRoom
  }); 
  return (
    <main className='flex justify-center'>
      <div className=" border border-neutral-300 rounded-xl w-auto sm:w-[566px] ">        
        <div className="p-4">
          <div className="flex flex-col">            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className='font-semibold'>Name of the Room</label>
                <input type="text" name='title'
                  className='border border-neutral-400 rounded-lg w-full p-2 mt-2'
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.title && touched.title ? (
                  <div className="text-red-500 rounded-lg text-sm">
                    {errors.title}
                  </div>
                ): null}
              </div>
              <div className="mb-3">
                <label className='font-semibold'>Price</label>
                <input type="number" name='price'
                  className='border border-neutral-400 rounded-lg w-full p-2 mt-2'
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.price && touched.price ? (
                  <div className="text-red-500 rounded-lg text-sm">
                    {errors.price}
                  </div>
                ): null}
              </div>
              <div className="mb-3">
                <label className='font-semibold'>Maximum no. of Guests</label>
                <input type="number" name='maxGuests'
                  className='border border-neutral-400 rounded-lg w-full p-2 mt-2'
                  value={values.maxGuests}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.maxGuests && touched.maxGuests ? (
                  <div className="text-red-500 rounded-lg text-sm">
                    {errors.maxGuests}
                  </div>
                ): null}
              </div>
              <div className="mb-3">
                <label className='font-semibold'>Description</label>
                <textarea name='description' 
                  className='border border-neutral-400 rounded-lg w-full p-2 mt-2'
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && touched.description ? (
                  <div className="text-red-500 rounded-lg text-sm">
                    {errors.description}
                  </div>
                ): null}
              </div>
              <div className="mb-3">
                <label className='font-semibold'>Room numbers</label>
                <textarea name='roomNumbers' placeholder='Give comma between room numbers' 
                  className='border border-neutral-400 rounded-lg w-full p-2 mt-2'
                  value={values.roomNumbers}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.roomNumbers && touched.roomNumbers ? (
                  <div className="text-red-500 rounded-lg text-sm">
                    {errors.roomNumbers}
                  </div>
                ): null}
              </div>                
              <button
                type='submit'
                className="bg-fuchsia-500 rounded-lg text-white w-full p-3 my-2 hover:bg-indigo-950"
              >
                Submit
              </button> 
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default RoomFormPage
