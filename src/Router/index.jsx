import { createBrowserRouter, Route } from "react-router";
import Layout from "../Layout";
import ProductDetails from "../Components/Products/ProductDetails";
import AllProducts from "../Pages/AllProducts";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import LoginOtp from "../Pages/Auth/LoginOtp";
import LoginPass from "../Pages/Auth/LoginPass";

const router = createBrowserRouter ([
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/' ,
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
        path:'/layout' ,
        element:<Layout/>,
        
    },
    {
        path:'/allProducts' ,
        element:<AllProducts/>,
        
    },
    {
        path:"/product/:id" ,
        element:<ProductDetails/>
    }
    
    
])
export default router