import React from 'react'
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../redux/UserSlice.jsx';


const Login = () => {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn , setLoggedIn] = useState(false)
  const dispatch = useDispatch()

  const handleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

 
    const handleSubmit = async (e) => {
      e.preventDefault()

      try {
        const res = await axios.post("/api/v1/users/login", {
          email,
          password
        })
        console.log(res)
        if (res.data.success) {
          toast.success(res.data.message, {
            theme: 'dark'
          })
          setLoggedIn(true)
          
        }
      } catch (e) {
        console.log("Error while fetching ", e)
        if (e.response.data.error) {
          toast.error(e.response.data.message, {
            theme: 'dark'
          })
        }
      }
    }
    useEffect(() => {
      if (loggedIn) {
          axios.get('/api/v1/users/detail', { withCredentials: true })
              .then(response => {
                console.log('URL called successfully:', response);
                  if (response.data.success) {
                        dispatch(setUserDetails(response.data.data))
                       }
                       navigate("/")
              })
              .catch(error => {
                  console.error('Error calling the URL:', error);
              });
      }
  }, [loggedIn,navigate]);

    return (
      <div>
        <section id='login'>
          <div className='mx-auto container pt-8'>

            <div className='bg-white w-full p-2 px-7 py-5 max-w-sm mx-auto rounded-md shadow-xl drop-shadow-lg'>

              <div className='flex flex-col justify-center items-center mt-2 text-center '>
                <div className='font-bold text-3xl text-blue-500'>
                  Sign In
                </div>
                <div className='text-lg mt-2'>
                  Enter your credentials to access your account
                </div>
              </div>

              <form onSubmit={handleSubmit} className='mt-6'>
              {/* <form  className='mt-6'> */}

                <div>
                  <label>Email : </label>
                  <div className='bg-slate-200 p-2 rounded-lg focus-within:outline focus-within:outline-blue-500 mt-3' >
                    <input
                      type='email'
                      value={email}
                      placeholder='abc@gmail.com'
                      onChange={(e) => {
                        setEmail(e.target.value)
                      }}
                      className='w-full h-full outline-none bg-transparent'
                    />
                  </div>
                </div>

                <div className='mt-3'>
                  <label>Password : </label>
                  <div className='bg-slate-200 p-2 rounded-lg focus-within:outline focus-within:outline-blue-500 mt-3 flex justify-between'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                      className='w-full h-full outline-none bg-transparent'
                    />
                    <div className='cursor-pointer text-xl pr-2' onClick={handleShowPassword}>
                      <span>{showPassword ? <IoEye /> : <IoMdEyeOff />}</span>
                    </div>
                  </div>
                </div>

                <div className='mt-3'>
                  <Link to={'/forget-password'} className='block w-fit ml-auto '>
                    Forgot Password ?
                  </Link>
                </div>

                <button type='submit' className='mt-4 font-bold w-full bg-blue-500 text-white flex justify-center p-2 text-xl rounded-lg hover:bg-blue-700'>Login</button>


              </form>

              <p className='mt-4 mb-5'>Create An Account ? <Link to={'/signup'} className=' underline text-blue-500' >Sign Up</Link></p>



            </div>

          </div>
        </section>
      </div>
    )
  }

  export default Login
