import React from 'react'
import { IoFilter } from "react-icons/io5";



const FilterProduct = ({category,onClick}) => {
  return (
    <div onClick={onClick}>
        <div className='text-3xl p-5 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-600'>
              <IoFilter/>
            </div>
            <p className='text-center font-medium my-1 capitalize'>{category}</p>
    </div>
  )
}

export default FilterProduct
