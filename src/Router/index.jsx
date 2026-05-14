import { createBrowserRouter, Route } from "react-router";
import Layout from "../Layout";
import ProductDetails from "../Components/Products/ProductDetails";
import CategoruDetails from "../Components/Products/CategoryDetails";
import CategoryDetails from "../Components/Products/CategoryDetails";

const router = createBrowserRouter ([
    {
        path:'/' ,
        element:<Layout/>,
        
    },
    {
        path:"/product/:id",
        element:<ProductDetails />
    }
])
export default router