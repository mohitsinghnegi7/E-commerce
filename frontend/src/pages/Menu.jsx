import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addCartItem } from '../redux/ProductSlice'

const Menu = () => {
  const [productData, setProductData] = useState(null)
  const [productDisplay, setProductDisplay] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const _id = params.filterby
   // console.log(_id)

   const dispatch = useDispatch()
   const handleAddCardProduct = (e)=>{
     e.stopPropagation()
     dispatch(addCartItem({productDisplay
     }))
   }

   useEffect(() => {
    const getProduct = async () => {
      setLoading(true); 
      try {
        const res = await axios.post('/api/v1/product/productDetail', { 
          _id 
        });
        setProductData(res.data.foundProduct); // Update state with fetched data
      } catch (err) {
        console.log("Error while fetching from backend", err);
      }
    };
    getProduct();
  }, [_id]);

  console.log(productData);
  useEffect(() => {
    if (productData) {
      const item = productData.find(el => el._id === _id);
      setLoading(false)
      setProductDisplay(item);
    }
  }, [productData, _id]);
 
  console.log(loading);
  
  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </div>
  //     </div>
  //   );
  // }
 
  return (
  <>  
   {
    loading? (<>
        <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>) : (
      <>
      <div className='p-2 md:p-7'>
      <div className='w-full max-w-4xl  m-auto md:flex bg-white'>
        <div className='md:max-w-md drop-shadow-lg overflow-hidden max-w-sm m-auto flex justify-center items-center p-2' >
          <img  src={productDisplay.productImage} className='hover:scale-105 transition-all'/>
        </div>
        <div className='w-full p-4'>
        <h3 className='font-semibold text-slate-600  capitalize text-4xl md:text-5xl'>{productDisplay.name}</h3>
    <div className='flex justify-between mt-3 m-auto items-center'>
    <p className=' text-slate-500  text-2xl md:text-3xl font-medium'>{productDisplay.category}</p>
    <p className='font-bold text-3xl md:text-4xl'><span className='text-red-500'>₹</span> {productDisplay.price}</p>
    </div>
    <div className='flex flex-col sm:flex-row gap-5'>
    <button className='bg-yellow-400 text-lg w-full sm:w-1/2  mt-4 py-1 rounded-full hover:bg-yellow-500' onClick={handleAddCardProduct}>Add to Cart </button>
    <button className='bg-yellow-500 text-lg w-full sm:w-1/2 mt-4 py-1 rounded-full hover:bg-yellow-600'>Buy </button>
    </div>
    <div className='mt-2 text-lg'>
    <p className='font-semibold'>Description : </p>
    <p>{productDisplay.description}</p>
    </div>
        </div>
      </div>
    </div>
    
      </>
    )
   }
 
    
  
 
 </>
  )
}

export default Menu
