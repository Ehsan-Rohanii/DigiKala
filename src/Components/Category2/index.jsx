import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Category2() {
  const scrollContainerRef = useRef(null);
  const [categories, setCategories] = useState([]); // ✅ مقدار اولیه [] بده

  useEffect(() => {
    (async() => {
      try {
        const result = await fetch('http://localhost:5000/api/categories');
        const data = await result.json();
        setCategories(data.data || []); // ✅ اگه data.data undefined بود، [] بذار
      } catch (error) {
        console.log(error.message);
        setCategories([]); // ✅ در صورت خطا هم [] بذار
      }
    })(); // ✅ این رو فراموش کرده بودی اجرا کنی!
  }, []); // ✅ dependency خالی بذار تا یک بار اجرا بشه

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'next' ? -160 : 160;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative w-[90%] mx-auto my-10 rounded-2xl">
      <button 
        onClick={() => handleScroll('next')} 
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95 border border-gray-200"
      >
        <FaChevronLeft/>
      </button>
      
      <div 
        ref={scrollContainerRef} 
        className="flex gap-4 overflow-x-auto p-4 scrollbar-hide scroll-smooth flex-row-reverse"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* ✅ شرط اضافه کن که اگه categories وجود داشت و آرایه بود، map رو اجرا کن */}
        {categories && categories.length > 0 ? (
          categories.map((product) => (
            <div 
              key={product._id || product.id} 
              className="flex-shrink-0 w-[160px] bg-white rounded-xl text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-[140px] object-cover rounded-lg mb-2" 
                />
              </div>
              
              <p className="text-sm font-medium text-gray-800 mb-2 h-10 overflow-hidden">
                {product.title}
              </p>
              
              <div className="flex flex-col items-center gap-1">
                {/* محتوای خالی */}
              </div>
            </div>
          ))
        ) : (
          // ✅ در صورت خالی بودن یا نداشتن داده، یه پیام یا لودر نشون بده
          <div className="w-full text-center py-10 text-gray-400">
            در حال بارگذاری دسته‌بندی‌ها...
          </div>
        )}
      </div>

      <button 
        onClick={() => handleScroll('prev')} 
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95 border border-gray-200"
      >
        <FaChevronRight/>
      </button>
    </div>
  );
}