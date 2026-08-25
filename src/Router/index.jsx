import { createBrowserRouter, Route } from "react-router";
import Layout from "../Layout";
import ProductDetails from "../Components/Products/ProductDetails";
import AllProducts from "../Pages/AllProducts";
import Register from "../Pages/Auth/Register";

const router = createBrowserRouter ([
    {
        path:'/',
        element:<Register/>
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