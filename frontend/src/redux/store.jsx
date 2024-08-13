import { configureStore } from '@reduxjs/toolkit'
import userReducer  from './UserSlice.jsx'
import ProductSliceReducer from './ProductSlice.jsx'


export const store = configureStore({
    reducer : {
        user : userReducer,
        product : ProductSliceReducer

    }
})