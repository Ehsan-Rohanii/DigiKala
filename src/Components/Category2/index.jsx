import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Category2() {
  const scrollContainerRef = useRef(null);

  const products = [
    { id: 2, title : 'مبایل', image: '/assets/cat1.jpg' },
    { id: 3, title : 'لپ تاپ', image: '/assets/cat2.jpg' },
    { id: 4, title : 'کالای دیجیتال', image: '/assets/cat3.jpg' },
    { id: 5, title : 'خانه و آشپزخانه', image: '/assets/cat4.jpg' },
    { id: 6, title : 'لوازم خانگی برقی', image: '/assets/cat5.jpg' },
    { id: 1, title : 'آرایشی و بهداشتی', image: '/assets/cat6.jpg' },
    { id: 7, title : 'مد و پوشاک', image: '/assets/cat7.jpg' },
    { id: 8, title : 'طلا و نقره', image: '/assets/cat8.jpg' },
    { id: 9, title : 'خودرو و موتور سیکلت', image: '/assets/cat9.jpg' },
    { id: 10, title : 'سلامت و پزشکی', image: '/assets/cat10.jpg' },
    { id: 11, title : 'ابزار آلات', image: '/assets/cat11.jpg' },
    { id: 12, title : 'ورزشی', image: '/assets/cat12.jpg' },
    { id: 13, title : 'سوپر مارکت آنلاین', image: '/assets/cat13.jpg' },
    { id: 14, title : 'پت شاپ', image: '/assets/cat14.jpg' },
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
      
      {/* دکمه بعدی (حالا سمت چپ قرار می‌گیره) */}
      <button 
        onClick={() => handleScroll('next')} 
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95 border border-gray-200"
      >
        <FaChevronLeft/> {/* فلش به سمت راست (بعدی) */}
      </button>
      
      {/* کانتینر محصولات - جهت اسکرول برعکس شده */}
      <div 
        ref={scrollContainerRef} 
        className="flex gap-4 overflow-x-auto p-4 scrollbar-hide scroll-smooth flex-row-reverse"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => {
          

          return (
            <div 
              key={product.id} 
              className="flex-shrink-0 w-[160px]  bg-white  rounded-xl text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-[140px] object-cover rounded-lg mb-2" 
                />
              </div>
              
              <p className="text-sm font-medium text-gray-800 mb-2 h-10 overflow-hidden">{product.title}</p>
              
              <div className="flex flex-col items-center gap-1">
        
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
