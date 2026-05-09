import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function ProductSlider() {
  const scrollContainerRef = useRef(null);

  const products = [
    { id: 2, title : 'شال مبل', price: 350000, discount: 17, image: '/assets/p5.jpg' },
    { id: 3, title : 'تی‌شرت نخی مردانه', price: 890000, discount: 20, image: '/assets/p3.jpg' },
    { id: 4, title : 'پودر پروتئین', price: 180000, discount: 10, image: '/assets/p4.jpg' },
    { id: 5, title : 'هارد اکسترنال وسترن دیجیتال', price: 450000, discount: 25, image: '/assets/p2.jpg' },
    { id: 6, title : 'توستر نان', price: 3200000, discount: 5, image: '/assets/p6.jpg' },
    { id: 1, title : 'هارد اکسترنال توشیبا', price: 2500000, discount: 15, image: '/assets/p1.jpg' },
    { id: 7, title : 'چندراهی برق آی کیو پاور', price: 1200000, discount: 30, image: '/assets/p7.jpg' },
    { id: 8, title : 'هدفون بلوتوثی ریولینک', price: 1800000, discount: 12, image: '/assets/p8.jpg' },
    { id: 9, title : 'هودی گرم زمستانی', price: 650000, discount: 18, image: '/assets/p1.jpg' },
    { id: 10, title : 'جوراب نخی ۳ تایی', price: 95000, discount: 0, image: '/assets/p1.jpg' },
    { id: 11, title : 'کمربند چرم طبیعی', price: 420000, discount: 15, image: '/assets/p1.jpg' },
    { id: 12, title : 'کوله پشتی مسافرتی', price: 980000, discount: 22, image: '/assets/p1.jpg' },
    { id: 13, title : 'کاپشن بارانی', price: 1500000, discount: 10, image: '/assets/p1.jpg' },
    { id: 14, title : 'شال گردن پشمی', price: 280000, discount: 5, image: '/assets/p1.jpg' },
    { id: 15, title : 'دستکش چرمی', price: 320000, discount: 0, image: '/assets/p1.jpg' },
    { id: 16, title : 'کفش راحتی تابستانی', price: 550000, discount: 28, image: '/assets/p1.jpg' },
    { id: 17, title : 'پیراهن رسمی', price: 780000, discount: 15, image: '/assets/p1.jpg' },
    { id: 18, title : 'شال و روسری', price: 190000, discount: 10, image: '/assets/p1.jpg' },
    { id: 19, title : 'کفش اسپرت زنانه', price: 1100000, discount: 20, image: '/assets/p1.jpg' },
    { id: 20, title : 'کلاه بافتنی', price: 120000, discount: 0, image: '/assets/p1.jpg' },
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

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="relative w-[90%] mx-auto my-10 font-sans bg-red-400 rounded-2xl">
      
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
          const discountedPrice = Math.floor(product.price * (1 - product.discount / 100));
          const hasDiscount = product.discount > 0;

          return (
            <div 
              key={product.id} 
              className="flex-shrink-0 w-[160px] p-3 bg-white border border-gray-200 rounded-xl text-center shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
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
                {hasDiscount ? (
                  <>
                    <div className="flex items-center justify-start w-full px-1 gap-2">
                      <span className="text-xs font-bold text-red-500 bg-red-100 px-1.5 py-0.5 rounded">
                        {product.discount}%
                      </span>
                      <span className="text-lg font-bold text-black">
                        {formatPrice(discountedPrice)}
                      </span>
                    </div>
                    
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                    
                    <span className="text-[10px] text-gray-500">تومان</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg font-bold text-gray-800">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-[10px] text-gray-500">تومان</span>
                  </>
                )}
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











