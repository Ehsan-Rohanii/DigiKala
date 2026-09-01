import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from  './AuthSlice'
import cartSliceReducer from  './CartSlice'
import phoneSliceReducer from './PhoneSlice'
const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        cart:cartSliceReducer,
        phone:phoneSliceReducer,
    }
})
export default store ;