import React, { useEffect, useState } from 'react'

export default function Products4() {
  const [products, setProducts] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        // مطمئن شو که دیتا در data.data قرار داره
        setProducts(data.data); 
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    })();
  }, []);

  return (
    <div className="p-6">
      {!products ? (
        <p className="text-center text-gray-500">در حال بارگذاری...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((pr) => (
            <div 
              key={pr.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="h-48 overflow-hidden bg-gray-100">
                <img 
                  src="/assets/nemone.jpg"
                  alt={pr.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                />
              </div>
              
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                  {pr.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                  {pr.description}
                </p>
                
                <div className="flex items-center mt-auto pt-2 border-t border-gray-100">
                    <span className='mr-1'>تومان</span>
                  <span className="text-red-600 font-bold text-lg">
                    {pr.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

