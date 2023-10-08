import React, { useContext } from 'react'
import { toast, Flip } from "react-toastify";
import { useFormik } from "formik";
import { reviewFormValidation } from '../formValidate';
import axios from "../services/axios";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddReviewPage = ({ propertyId }) => { 
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const initialValues = {
    rating: "",
    title:"",
    comment: "",
  }; 
  const handleAddReview = async (values,action) => {
    try { 
      const { data } = await axios.post(`/reviews/${user._id}/${propertyId}`, values); console.log(data);
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
      action.resetForm(); 
      navigate('/account/reviews');
    } catch (error) {
      const errorMessage =  error.response?.data?.message??error.response?.statusText??error.message ; 
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
    }
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({    
    initialValues: initialValues,
    validationSchema:reviewFormValidation,    
    onSubmit:handleAddReview
  }); 
  return (
    <main className='flex justify-center'>
      <div className=" border border-neutral-300 rounded-xl w-auto sm:w-[566px] ">        
        <div className="p-4">
          <div className="flex flex-col">            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className='font-semibold'>Rating</label>
                <input type="number" name='rating'
                  className='border border-neutral-400 rounded-lg w-full p-2 mt-2'
                  value={values.rating}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.rating && touched.rating ? (
                  <div className="text-red-500 rounded-lg text-sm">
                    {errors.rating}
                  </div>
                ): null}
              </div>
              <div className="mb-3">
                <label className='font-semibold'>Title</label>
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
                <label className='font-semibold'>Comments</label>
                <textarea name='comment' 
                  className='border border-neutral-400 rounded-lg w-full p-2 mt-2'
                  value={values.comment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.comment && touched.comment ? (
                  <div className="text-red-500 rounded-lg text-sm">
                    {errors.comment}
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

export default AddReviewPage
