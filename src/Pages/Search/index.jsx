import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar'

export default function Search({search}) {
    useEffect(()=> {
        (async() => {
            try {
                const res = await fetch('http://localhost:5000/api/products')
                if(!res.ok) {
                    throw new Error ("محصولی یافت نشد")
                }
                const data = await res.json();
                
            } catch (error) {
                
            }
        })()
    })
  return (
    <>
     <Navbar search={search}/>
    </>
  )
}
