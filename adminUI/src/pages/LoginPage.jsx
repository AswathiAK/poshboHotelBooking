import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast, Flip } from "react-toastify";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import background from "../assets/loginbackground.jpg";
import poshbo from "../assets/poshbo.svg";
import axios from "../services/axios";
import { loginValidation } from '../formValidate';
import passwordToggle from '../hooks/passwordToggle';

const LoginPage = () => {
  const auth = Cookies.get('adminToken');
  if (auth) {
    return <Navigate to='/'/>
  }
  const [passwordInputType, toggleIcon] = passwordToggle();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: ""
  };
  const handleLogin = async (values, action) => {
    try {
      const { data } = await axios.post('/admin', values); 
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });      
      action.resetForm();
      navigate('/');
    } catch (error) {     
      const err =  error.response?.data?.message??error.response?.statusText??error.message ; 
      toast.error(err, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
    };
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({    
    initialValues: initialValues,
    validationSchema:loginValidation,    
    onSubmit:handleLogin
  });

  return (
    <div className='flex flex-col flex-auto w-full h-screen'>
      <div className="h-full">
        <div className="grid lg:grid-cols-3 h-full">
          <div className="bg-blue-900 bg-cover lg:flex bg-no-repeat hidden" style={{backgroundImage:`url(${background})`}}></div>
          <div className="col-span-2 flex justify-center items-center">
            <div className="min-w-[450px] px-8">
              <div className="flex flex-col items-center mb-8">
                <img src={poshbo} alt="poshbo" className='w-52 mb-5' />
                <h1 className="text-3xl font-medium text-purple-900">Welcome Admin</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className='flex mb-2 font-medium'>Email</label>
                  <input
                    type="email" name='email'
                    placeholder='your@email.com'
                    className='w-full border rounded-md bg-transparent border-gray-400 p-3'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <div className="text-red-500 px-4 py-2 rounded-lg text-sm">
                      {errors.email}
                    </div>
                  ): null}
                </div>
                <div className="mb-6 relative">
                  <label className='flex mb-2 font-medium'>Password</label>
                  <input
                    type={passwordInputType}
                    name='password'
                    placeholder='*******'
                    className='w-full border rounded-md bg-transparent border-gray-400 p-3'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="absolute top-10 right-2.5 cursor-pointer z-10">{toggleIcon}</span>
                  {errors.password && touched.password ? (
                    <div className="text-red-500 px-4 py-2 rounded-lg text-sm">
                      {errors.password}
                    </div>
                  ): null}
                </div>
                <button
                  type="submit"
                  className='block bg-purple-800 text-white w-full py-2 px-8 rounded hover:bg-blue-950'
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>      
    </div>
  )
}

export default LoginPage
