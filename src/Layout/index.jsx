import React from 'react'
import Navbar from '../Components/Navbar'
import Products from '../Components/Products/index.jsx'
import ProductSlider from '../Components/ProductSlider/index.jsx'
import Category1 from '../Components/Category1/index.jsx'
import AdSection1 from '../Components/AdSection1/index.jsx'
import AdSlider1 from '../Components/AdSlider1/index.jsx'
import Category2 from '../Components/Category2/index.jsx'
import AdSection2 from '../Components/AdSection2/index.jsx'
import BrandsIcons from '../Components/BrandsIcons/index.jsx'
import AdSection3 from '../Components/AdSection3/index.jsx'
import Products4 from '../Components/Products/Products4/index.jsx'


export default function Layout() {
  return (
    <>
     <Navbar/>
     <AdSlider1/>
     <Category1/>
     <ProductSlider/>
     <AdSection1/>
     <Category2/>
     <AdSection2/>
     <BrandsIcons/>
     <AdSection3/>
     <Products/>
     <Products4/>
    </>
  )
}
