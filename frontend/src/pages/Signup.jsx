import React from 'react'
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Signup = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()
    
    const handleShowPassword = ()=>{
      setShowPassword(prev => !prev)
    }
    
    const handleShowConfirmPassword = ()=>{
        setShowConfirmPassword(prev => !prev)
      }

      const handleSubmit = async (e)=>{
        e.preventDefault()
        console.log(name);
        console.log(email);
        
        
      console.log(password);
      console.log(confirmPassword);
      
      
        try{
       if(password !== confirmPassword){
          toast.error("Password is not same")
       }
       else{
        const res = await axios.post("http://localhost:3000/api/v1/users/register",{
        name ,
        email,
        password
        })

        console.log(res);
        
    
       if(res.data.success){
      toast.success(res.data.message ,{
        theme : 'dark'
      })
      navigate('/login')
    }
  }
  

        }
  catch(e){
    console.log("Error while fetching ", e)
    
    console.log(e.response.data.message)
    if(e.response.data.error){
      toast.error(e.response.data.message,{
        theme : 'dark'
      })
    }
  }
  
}


  return (
    <div>
      <section id='singup'>
            <div className='mx-auto container pt-3'>

                <div className='bg-white w-full p-2 px-7 py-5 max-w-sm mx-auto rounded-md shadow-xl drop-shadow-lg'>
                    
                    <div className='flex flex-col justify-center items-center mt-2 text-center '>
                     <div className='font-bold text-2xl text-blue-500'>
                        Sign Up
                     </div>
                     <div className='text-md mt-2'>
                        Enter your information to create an Account
                     </div>
                    </div>

                    <form onSubmit={handleSubmit} className='mt-4'>
                                        {/* //<form  className='mt-6'> */}

                        <div className='text-sm'>

                        <label>Name : </label>
                            <div className='bg-slate-200 p-2 rounded-lg focus-within:outline focus-within:outline-blue-500 mt-3' >
                            <input 
                            type='text'
                            value={name}
                            placeholder='John Doe'
                            onChange={(e)=>{
                              setName(e.target.value)
                            }}
                            className='w-full h-full outline-none bg-transparent'
                            />
                            </div>

                        <div className='mt-2'>
                            <label>Email : </label>
                            <div className='bg-slate-200 p-2 rounded-lg focus-within:outline  focus-within:outline-blue-500 mt-3' >
                            <input 
                            type='email'
                            value={email}
                            placeholder='abc@gmail.com'
                            onChange={(e)=>{
                              setEmail(e.target.value)
                            }}
                            className='w-full h-full outline-none bg-transparent'
                            />
                            </div>

                            </div>
                        </div>

                        <div className='mt-2'>
                            <label>Password : </label>
                            <div className='bg-slate-200 p-2 rounded-lg focus-within:outline focus-within:outline-blue-500 mt-3 flex justify-between'>
                            <input 
                            type={showPassword?'text':'password'}
                            value={password}
                            onChange={(e)=>{
                              setPassword(e.target.value)
                            }}
                              className='w-full h-full outline-none bg-transparent'
                            />
                            <div className='cursor-pointer text-xl pr-2' onClick={handleShowPassword}>
                            <span>{showPassword?<IoEye/>:<IoMdEyeOff/>}</span>
                            </div>
                            </div>
                        </div>

                        <div className='mt-2'>
                            <label>Confirm Password : </label>
                            <div className='bg-slate-200 p-2 rounded-lg focus-within:outline focus-within:outline-blue-500 mt-3 flex justify-between'>
                            <input 
                            type={showConfirmPassword?'text':'password'}
                            value={confirmPassword}
                            onChange={(e)=>{
                              setConfirmPassword(e.target.value)
                            }}
                              className='w-full h-full outline-none bg-transparent'
                            />
                            <div className='cursor-pointer text-xl pr-2' onClick={handleShowConfirmPassword}>
                            <span>{showConfirmPassword?<IoEye/>:<IoMdEyeOff/>}</span>
                            </div>
                            </div>
                        </div>
                      
                      <div className='hover:bg-blue-800'>
                      <button type='submit' className='mt-3 font-bold w-full bg-blue-500 text-white flex justify-center p-2 text-xl rounded-lg hover:bg-blue-700'>Sign Up</button>
                      </div>

                    </form>

                    <p className='mt-3 mb-2'>Already Have An Account ? <Link to={'/login'} className=' underline text-blue-500' >Login</Link></p>

                      

                </div>

            </div>
      </section>
    </div>
  )
}

export default Signup
