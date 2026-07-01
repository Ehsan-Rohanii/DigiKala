import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Products4() {
  const [products, setProducts] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data.data); 
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    })();
  }, []);
  
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6">
      {!products ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
        </div>
      ) : (
        <>
          {/* عنوان بخش */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
              محصولات جدید
            </h2>
            <a href="#" className="text-red-500 hover:text-red-600 text-sm sm:text-base font-medium transition-colors">
              مشاهده همه
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {products.map((pr) => (
              <div 
                key={pr.id} 
                onClick={() => handleProductClick(pr.id)}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
              >
                <div className="h-36 xs:h-40 sm:h-44 md:h-48 lg:h-56 overflow-hidden bg-gray-100">
                  <img 
                    src="/assets/nemone.jpg"
                    alt={pr.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                    loading="lazy"
                  />
                </div>
                
                <div className="p-2 sm:p-3 md:p-4 flex flex-col flex-grow">
                  <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-800 mb-1 sm:mb-2 line-clamp-1">
                    {pr.title}
                  </h3>
                  
                  <p className="text-gray-600 text-[10px] sm:text-xs md:text-sm mb-2 sm:mb-3 md:mb-4 line-clamp-2 flex-grow">
                    {pr.description}
                  </p>
                  
                  <div className="flex items-center mt-auto pt-1 sm:pt-2 border-t border-gray-100">
                    <span className="text-red-600 font-bold text-xs sm:text-sm md:text-base lg:text-lg">
                      {formatPrice(pr.price)}
                    </span>
                    <span className="text-gray-500 text-[8px] sm:text-[10px] md:text-xs mr-1">
                      تومان
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}