import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../component/CartProduct';

const Cart = () => {

    const productCartItem = useSelector(state=>state.product.cartItem)
    console.log(productCartItem);
    
    const totalPrice = productCartItem.reduce((acc,curr)=>
        acc + parseInt(curr.total),0
    )

    const totalQty = productCartItem.reduce((acc,curr)=>
        acc + parseInt(curr.qty),0
    )

  return (
    <div>
      <div className='p-2 md:p-4'>
        <h2 className='text-lg md:text-xl font-bold text-slate-600'>Your Card Items</h2>

        <div className='my-4 flex gap-4'>

            <div className='w-full max-w-2xl'>
               {
                productCartItem.map((el,index)=>{
                    return(
                        <CartProduct 
                        key={index}
                        id={el._id}
                        name={el.name}
                        price={el.price}
                        productImage={el.productImage}
                        category={el.category}
                        qty={el.qty}
                        total={el.total}
                        />
                    )
                })
               }
            </div>

            <div className='w-full max-w-md  ml-auto'>
                <h2 className='bg-blue-500 text-white p-2 text-xl font-bold text-center'>Summary</h2>

            <div className='flex w-full py-2 text-lg border-b'>
                <p>Total Qty</p>
                <p className='ml-auto w-32 font-bold'>{totalQty}</p>
            </div>
            <div className='flex w-full py-2 text-lg border-b'>
                <p>Total Price</p>
                <p className='ml-auto w-32 font-bold'> <span className='text-red-500'>₹  </span>{totalPrice}</p>
            </div>
            <button className='bg-red-600 w-full text-lg font-bold py-2 text-white hover:bg-red-700'> Payment</button>

            </div>

        </div>
      </div>
    </div>
  )
}

export default Cart
