import React from 'react'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { delteCartItem } from '../redux/ProductSlice';
import { increaseQty,decreaseQty } from '../redux/ProductSlice';

const CartProduct = ({name, price , category, productImage, qty, total,id}) => {

    const dispatch = useDispatch()
        console.log(id);
        

  return (
    <div className='p-4 bg-slate-200 flex gap-4 rounded border-2 border-slate-300'>
      <div className='bg-white p-3 overflow-hidden'>
        <img src={productImage} className='h-28 w-36 object-cover '/>
      </div>
      <div className='w-full p-4'>
        <div  className='flex justify-between items-center'>
            <div>
        <h3 className='font-semibold text-slate-600  capitalize text-2xl md:text-3xl'>{name}</h3>
        </div>
        <div className='text-4xl hover:text-red-500 ' onClick={()=>{
            dispatch(delteCartItem(id))
        }}>
        <MdDelete/></div>
        </div>
    <div className='flex justify-between mt-1 m-auto items-center'>
    <p className=' text-slate-500  text-2xl md:text-xl font-medium'>{category}</p>
    <p className='font-bold text-3xl md:text-xl'><span className='text-red-500'>₹</span> {price}</p>
    </div>
    <div className='flex justify-between items-center gap-6'>
    <div className='flex flex-col sm:flex-row gap-7'>
    <button className='bg-yellow-400 text-2xl p-2   mt-2 py-1 rounded-md hover:bg-yellow-500' onClick={()=>dispatch(decreaseQty(id))} ><FaMinus/></button>
    <p className='font-semibold text-2xl flex items-center justify-center'>{qty}</p>
    <button className='bg-yellow-400 text-2xl  mt-2 py-1 rounded-md p-2 hover:bg-yellow-500' onClick={()=>dispatch(increaseQty(id))}  ><FaPlus/></button>
    </div>

    <div className='flex gap-5'>
        <p className='text-xl font-bold'>Total</p>
        <p className=' text-xl font-bold text-red-500'>₹ < span className='text-black'>{total}</span></p>
    </div>

    </div>
    
        </div>
    </div>
  )
}

export default CartProduct
