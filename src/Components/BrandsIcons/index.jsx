import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function BrandsIcons() {
  const scrollContainerRef = useRef(null);

  const products = [
    { id: 1, image: '/assets/brand9.jpg' },
    { id: 2, image: '/assets/brand2.jpg' },
    { id: 3, image: '/assets/brand3.jpg' },
    { id: 4, image: '/assets/brand4.jpg' },
    { id: 5, image: '/assets/brand5.jpg' },
    { id: 6, image: '/assets/brand6.jpg' },
    { id: 7, image: '/assets/brand7.jpg' },
    { id: 8, image: '/assets/brand10.jpg' },
    { id: 9, image: '/assets/brand1.jpg' },
    { id: 10, image: '/assets/brand8.jpg' },
    { id: 11, image: '/assets/brand11.jpg' },
  ];

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      // در حالت row-reverse، اسکرول مثبت میره راست (بعدی) و منفی میره چپ (قبلی)
      // اما چون می‌خوایم دکمه چپ "بعدی" باشه، باید اسکرول به سمت چپ (منفی) انجام بشه
      const scrollAmount = direction === 'next' ? -160 : 160;
      
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative w-[90%] mx-auto my-10  rounded-2xl">
      <h3 className='text-center text-xl'>معروف ترین برند ها</h3>
      <button 
        onClick={() => handleScroll('next')} 
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95 border border-gray-200"
      >
        <FaChevronLeft/>
      </button>
      
      <div 
        ref={scrollContainerRef} 
        className="flex overflow-x-auto p-4 scrollbar-hide scroll-smooth flex-row-reverse"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => {
          

          return (
            <div 
              key={product.id} 
              className="flex-shrink-0 w-[160px]  bg-white  rounded-xl duration-300"
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-[80%] h-[90px]  rounded-lg " 
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* دکمه قبلی (حالا سمت راست قرار می‌گیره) */}
      <button 
        onClick={() => handleScroll('prev')} 
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95 border border-gray-200"
      >
        <FaChevronRight/> {/* فلش به سمت چپ (قبلی) */}
      </button>
    </div>
  );
}
