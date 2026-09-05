import { createBrowserRouter, Route } from "react-router";
import Layout from "../Layout";
import ProductDetails from "../Components/Products/ProductDetails";
import AllProducts from "../Pages/AllProducts";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import LoginOtp from "../Pages/Auth/LoginOtp";
import LoginPass from "../Pages/Auth/LoginPass";
import Cart from "../Pages/Cart";

const router = createBrowserRouter ([
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/login' ,
        element:<Login/>
    },
    {
        path:'/loginOtp' ,
        element:<LoginOtp/>
    },
    {
        path:'/loginPass' ,
        element:<LoginPass/>
    },
    {
        path:'/' ,
        element:<Layout/>,
        
    },
    {
        path:'/allProducts' ,
        element:<AllProducts/>,
        
    },
    {
        path:"/product/:id" ,
        element:<ProductDetails/>
    },
    {
        path:"/cart" ,
        element:<Cart/>
    },
    
    
])
export default router