import React, { useState } from 'react'
import { IoMdCloudUpload } from "react-icons/io";
import { ImageToBase64 } from '../utils/ImageToBase64.js';
import axios from 'axios';
import { toast } from 'react-toastify';

const NewProduct = () => {

  const [productImage, setProductImage] = useState('')
  const [name , setName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price , setPrice] = useState('')


  const uploadImage =async(e)=>{
    const data = await ImageToBase64(e.target.files[0])
   // console.log(data)
    setProductImage(data )

  }

  const handleSubmit =async (e)=>{
    
   try{
    e.preventDefault()

    const res = await axios.post('http://localhost:3000/api/v1/product/upload',{
      name,
      category,
      productImage,
      price,
      description
    })

    console.log(res);
   if(res.data.success){
    toast(res.data.message,{
      theme : 'dark'
    })

  }
    if(res.data.error){
      toast(res.data.message,{
        theme : 'dark'
      })
    }
   
   }
   catch(e){
    console.log("new Page ",e)
    if(e.response.data.error){
      toast(e.response.data.message,{
        theme : 'dark'
      })
    }
   }

   
    
  }

  return (
    <div className='p-4'>
      <form className='m-auto w-full max-w-md shadow flex flex-col p-4 bg-white' onSubmit={handleSubmit}>

        <div className='flex gap-5 justify-center items-center '>
        <label>Name</label>
        <input type={"text" }  className='bg-slate-200 p-1 my-1 w-full rounded-sm'
        onChange={(e)=>{
          setName(e.target.value)
        }}/>
        </div>


         <div className='flex items-center justify-center gap-8'> 
        <label>Category</label>
        <select className='bg-slate-200 p-1 my-1 rounded-sm w-full' onChange={(e)=>{
          setCategory(e.target.value)
        }}>
          <option>Select</option>
          <option>Fruits</option>
          <option>Vegetable</option>
          <option>Ice Cream</option>
          <option>Dosa</option>
          <option>Pizza</option>
          <option>Cake</option>
          <option>Fast Food</option>
          <option>Chicken</option>
          <option>Thali</option>
          <option>Others</option>
          
        </select>
        </div>

        <label htmlFor='image' className=''>Image
        <div className='h-40 w-full bg-slate-300 my-3 rounded flex items-center justify-center cursor-pointer'>
          {productImage ? ( <img src={productImage} className='h-full'/>) :( <span className='text-5xl'> <IoMdCloudUpload/></span>)}
          
        
         <input type={'file'} id="image" accept='image/*' onChange={uploadImage} className='hidden cursor-pointer'/>
        </div>
        </label>

        <div className='flex gap-5 justify-center items-center'>
        <label>Price</label>
        <input type={'text'} className='bg-slate-200 p-1 my-1 w-full rounded-sm' 
         onChange={(e)=>{
          setPrice(e.target.value)
        }}/>
        </div>

        <label>Description</label>
        <textarea row={3} className='bg-slate-200 p-1 my-1 resize-none rounded-sm' 
         onChange={(e)=>{
          setDescription(e.target.value)
        }}></textarea>

        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white text-lg py-1 mt-2 mb-2 rounded-sm' >Save</button>

      </form>
    </div>
  )
}

export default NewProduct
