import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MoonLoader } from 'react-spinners';

export default function ProductDetails() {
    const {id} = useParams()
    const [product , setProduct] = useState();
    const [loading , setLoading] = useState(true)
    useEffect(() => {
        (async() => {
            try {
                const res = await fetch(`http://localhost:5000/api/products/${id}`)
                if(!res.ok) {
                    throw new Error ("محصولی یافت نشد")
                }
                const data = await res.json();
                setProduct(data.data)
            } catch (error) {
                console.log("Error fetching product:", error.message)
            } finally {
                setLoading(false)
            }
        })();
    },[id]);
     
    if(loading) {
        return (
            <MoonLoader size={200} color="red" className="ml-[700px] mt-[80px]"/>
        )
    };

    if(!product) {
        return (
      <div className="text-center py-10 text-gray-500">
        <p>محصولی با این شناسه یافت نشد.</p>
        <Link to="/" className="text-blue-500 hover:underline mt-2 inline-block">
          بازگشت به لیست
        </Link>
      </div>
    );
    }
    
  return (
    <div  className="container mx-auto px-4 py-8">
      <Link to="/" className="text-red-800 mb-4 inline-block border-3 bg-red-300 border-red-400 rounded-2xl px-1">
          بازگشت
      </Link>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-80 md:h-full object-cover"
              onError={(e) => (e.target.src = "https://via.placeholder.com/600x400?text=No+Image")}
            />
          </div>
          
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
            
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                {product.description || "توضیحات محصول در دسترس نیست."}
              </p>
              
              <div className="flex items-center space-x-4 mt-4">
                <span className="text-2xl font-bold text-red-600">
                  {product.price ? `تومان ${product.price.toLocaleString()}` : "قیمت تماس بگیرید"}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  موجود در انبار
                </span>
              </div>

              <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold mt-6">
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



