import React from 'react'
import { Link } from 'react-router-dom'
import { addCartItem } from '../redux/ProductSlice.jsx'
import { useDispatch } from 'react-redux'

const CardFeature = ({name, price, productImage, category,loading,id}) => {
  const dispatch = useDispatch()
  const handleAddCardProduct = (e)=>{
    e.stopPropagation()
    dispatch(addCartItem({
      _id : id,
      name : name,
      price : price, 
      category : category,
      productImage : productImage
    }))
  }


  return (
    <div className='w-full min-w-[200px] max-w-[200px] bg-white py-5 px-4 drop-shadow-lg hover:shadow-lg rounded-sm cursor-pointer'>
        {
            name ? <div>
              <Link to={`menu/${id}`}>
                <div className='h-28 flex justify-center items-center mb-3'>
        <img src={productImage} className='h-full'/>
      </div>
      <h3 className='font-semibold text-slate-600  capitalize text-lg'>{name}</h3>
    <div className='flex justify-between'>
    <p className=' text-slate-500 font-medium'>{category}</p>
    <p className='font-bold'><span className='text-red-500'>₹</span> {price}</p>
    </div>
    </Link>
    <button className='bg-yellow-400 w-full mt-4 py-1 rounded-full hover:bg-yellow-500' onClick={handleAddCardProduct}>Add to Cart </button>
            </div> : <div>'
                <p className='min-h-[150px] flex justify-center items-center'>{loading}</p>
            </div>

        }
      
    </div>
  )
}

export default CardFeature
