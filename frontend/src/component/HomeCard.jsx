import React from 'react'
import { Link } from 'react-router-dom'

const HomeCard = ({name, productImage, category, price,loading,id}) => {
  return (
    <div className='bg-white shadow-md p-2 rounded min-w-[150px]'>
        
      {
        name ? <div> 
          <Link to={`menu/${id}`}>
          <div className='w-40 min-h-[160px]'>
        <img src={productImage} className='h-full w-full'/>
    </div>
    <h3 className='font-semibold text-slate-600  capitalize text-lg'>{name}</h3>
    <div className='flex justify-between'>
    <p className=' text-slate-500 font-medium'>{category}</p>
    <p className='font-bold'><span className='text-red-500'>₹</span> {price}</p>
    </div>
    </Link>
    </div>
    : <div className='flex justify-center items-center h-full'>
    <p>{loading}</p>
    </div>
      }
    </div>
  )
}

export default HomeCard
