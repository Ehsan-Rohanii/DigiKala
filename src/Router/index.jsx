import { createBrowserRouter, Route } from "react-router";
import Layout from "../Layout";
import ProductDetails from "../Components/Products/ProductDetails";
import Auth from "../Pages/Auth/FirstStep";
import AllProducts from "../Pages/AllProducts";

const router = createBrowserRouter ([
    {
        path:'/',
        element:<Auth/>
    },
    {
        path:'/home' ,
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