import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { toast, Flip } from "react-toastify";
import { useFormik } from "formik";
import { loginValidation } from '../formValidate';
import Footer from '../components/Footer';
import usePasswordToggle from '../hooks/usePasswordToggle';
import axios from "../services/axios";
import UserLoginHeader from '../components/UserLoginHeader';

const LoginPage = () => {  
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: ""
  };
  const [passwordInputType, toggleIcon] = usePasswordToggle();
  const userLogin = async (values, action) => {
    try {
      const { data } = await axios.post('/users/login', values);
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
      action.resetForm();
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
    };
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({    
    initialValues: initialValues,
    validationSchema:loginValidation,    
    onSubmit:userLogin
  });

  return (
    <>
      <UserLoginHeader/>
      <main className=" pt-3 flex justify-center h-auto sm:h-[678px]">
        <div className="relative top-6 bottom-0 my-8 border border-neutral-500 rounded-xl w-auto sm:w-[566px] h-[560px]">
          <div className="flex items-center justify-center px-6 border-b h-16">
            <h2 className='text-lg font-semibold'>Log in</h2>
          </div>
          <div className="p-4 sm:p-8">
            <div className="flex flex-col">
              <div className="mt-2 mb-6">
                <h3 className="text-xl font-semibold text-center text-gray-600">
                  Welcome to <span className='text-violet-900'>POSHBO</span>                  
                </h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mt-2 mb-5">
                  <label className='font-normal'>Email</label>
                  <input type="email" name='email'
                    placeholder='your@email.com'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <div className="text-red-500 rounded-lg text-sm">
                      {errors.email}
                    </div>
                  ): null}
                </div>
                <div className="relative mb-5 mt-2">
                  <label className='font-normal'>Password</label>
                  <input type={passwordInputType} name='password'
                    placeholder='************'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />                  
                  <span className="absolute top-9 right-2.5 cursor-pointer">{toggleIcon}</span>
                  {errors.password && touched.password ? (
                    <div className="text-red-500 rounded-lg text-sm">
                      {errors.password}
                    </div>
                  ): null}
                </div>
                <button
                  type='submit'
                  className="bg-fuchsia-500 rounded-lg text-white w-full p-3 my-3 hover:bg-indigo-950"
                >
                  Sign in
                </button>
                <div className="my-3 underline text-gray-600">
                  <Link to={'/forgot_password'}>Forgotten your password?</Link>
                </div>
                <div className="text-center py-2 text-gray-600">
                  Don't have an account yet? 
                  <Link to={'/register'} className='underline text-black'> Register now</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default LoginPage
