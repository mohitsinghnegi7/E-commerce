import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    product : {
        data : []
},
cartItem : []   
}

export const ProductSlice = createSlice({
    name : "product",
    initialState,
    reducers : {
        setDataProduct : (state, action)=>{
            state.product.data = action.payload
       
            
        },
        addCartItem : (state, action)=>{
                console.log(action);
                const check = state.cartItem.some(el=>{
                   return el._id===action.payload._id

                })
                console.log(check);
                
                if(check){
                    toast("Item Already in Cart")
                }
                else{
                    const total = action.payload.price
                      state.cartItem = [...state.cartItem,{...action.payload, qty : 1, total : total }]
                }
        },
        delteCartItem : (state,action)=>{
            const index  = state.cartItem.findIndex(el=>{ return el._id === action.payload
            })
        
            state.cartItem.splice(index,1)
        },
        increaseQty : (state,action)=>{
            const index  = state.cartItem.findIndex(el=>{ return el._id === action.payload
            })
            let qty = state.cartItem[index].qty
            const qtyInc = qty + 1
            state.cartItem[index].qty = qty+1

            const price = state.cartItem[index].price
            const total = price * qtyInc

            state.cartItem[index].total = total
        },
        decreaseQty : (state,action)=>{
            const index  = state.cartItem.findIndex(el=>{ return el._id === action.payload
            })
            let qty = state.cartItem[index].qty
            if(qty>1){
                const qtyInc = qty-1
                state.cartItem[index].qty = qty-1
                const price = state.cartItem[index].price
                const total = price * qtyInc
                state.cartItem[index].total = total

            }
        }
    }
})

export const {setDataProduct,addCartItem,delteCartItem,increaseQty,decreaseQty} = ProductSlice.actions

export default ProductSlice.reducer