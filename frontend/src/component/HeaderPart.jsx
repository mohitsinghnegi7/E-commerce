import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/logo.png'
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setUserDetails } from '../redux/UserSlice.jsx';
import { homeCardData } from '../utils/homeCardData.js';

const HeaderPart = () => {
  const dispatch = useDispatch()
  const [showAccount, setShowAccount] = useState(false);
  const [email, setEmail] = useState('')
  const [firstLetter, setFirstLetter] = useState('')
  const userData = useSelector(state=>state?.user?.user?.user)
  const productData = useSelector(state=>state?.product.product.data)
  //console.log(productData);
  
  
  useEffect(()=>{
    if(userData){
      const name = userData.name;
      const letter = name.charAt(0).toUpperCase()
      setFirstLetter(letter)
      setEmail(userData.email)
    }
  },[userData])


  const handleShowAccount = ()=>{
    setShowAccount(prev=>!prev)
  }

  const handleLogout = async()=>{
    try{
      const res = await axios.get('/api/v1/users/logout',{ 
        withCredentials : true
      })

      // console.log("logout res", res)
      if(res.data.success){
        toast(res.data.message,{
            theme : 'dark'
        })
        dispatch(setUserDetails(null))
    }

    }
    catch(err){
      console.error('Error while logging out:', err);
    }
  }

  const cartItemNumber = useSelector((state)=>state.product.cartItem)


  return (
    <div className='fixed shadow-lg w-full h-16 px-2 md:px-4 '>
      

      <div className=' flex items-center h-full justify-between'>
        <div className='h-16'>
            <img src={'https://logos.textgiraffe.com/logos/logo-name/Mohit-designstyle-jungle-m.png'} className='h-full'/>
        </div>


        <div className='flex items-center h-full gap-3 md:gap-7 bg-transparent '>

          <nav className='hidden sm:flex gap-3 md:gap-7'>
          <Link to={""}>Home</Link>
          <Link to={"menu"}>Menu</Link>
        
          </nav>

          <div className='text-2xl text-gray-800 cursor-pointer relative'>
         <Link to={"cart"}><FaShoppingCart/></Link> 
          <div className='absolute -top-1 -right-2 text-white bg-red-500 h-4 w-4 rounded-full  text-sm text-center  '>{cartItemNumber.length}</div>
          </div>

          <div className=' text-gray-800 cursor-pointer' onClick={handleShowAccount}>
            <div>
             { userData ? (
              <p className='text-2xl cursor-pointer h-8 w-8 flex justify-center items-center rounded-full  bg-blue-600 text-white'>{firstLetter}</p>
             ) : ( <div className='text-3xl cursor-pointer'>
          <FaUserCircle/>
          </div>)}
                    </div>


          <div className=''>
            { showAccount && (<div className='absolute right-3 bg-white px-2 py-2 shadow-md drop-shadow-md text-md flex flex-col rounded-md '>

              {
                email === "negi23@gmail.com" &&   <Link to={"newproduct"} className='whitespace-nowrap cursor-pointer '>New Product</Link>
              }
            {
              userData ? (<button onClick={handleLogout} className=' text-red-600'>
                Logout
              </button>) : (<Link to={"login"} className='whitespace-nowrap cursor-pointer  '>Login</Link>)
            }
               <nav className='flex flex-col gap-3 md:gap-7 mt-3 md:hidden lg:hidden sm:hidden'>
          <Link to={""}>Home</Link>
          <Link to={"menu"}>Menu</Link>
         
          </nav>

          </div>
        )}
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderPart
