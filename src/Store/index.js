import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from  './AuthSlice'
import cartSliceReducer from  './CartSlice'
const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        cart:cartSliceReducer,
    }
})
export default store