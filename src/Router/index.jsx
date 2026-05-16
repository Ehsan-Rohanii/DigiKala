import { createBrowserRouter, Route } from "react-router";
import Layout from "../Layout";
import ProductDetails from "../Components/Products/ProductDetails";
import CategoruDetails from "../Components/Products/CategoryDetails";
import CategoryDetails from "../Components/Products/CategoryDetails";
import Auth from "../Pages/Auth/FirstStep";
import Search from "../Pages/Search";
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
    
    
])
export default router