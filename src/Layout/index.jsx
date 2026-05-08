import React from 'react'
import Navbar from '../Components/Navbar'
import Products from '../Pages/Products'
import Slider1 from '../Components/Slider1'
import ProductSlider from '../Components/ProductSlider.jsx'

export default function Layout() {
  return (
    <>
     <Navbar/>
     <Slider1/>
     <ProductSlider/>
     <Products/>
    </>
  )
}
