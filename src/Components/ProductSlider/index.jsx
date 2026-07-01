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
      const scrollAmount = direction === 'next' ? -200 : 200;
      
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
    <div className="relative w-full sm:w-[95%] md:w-[92%] lg:w-[90%] mx-auto my-6 sm:my-8 md:my-10 font-sans">
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-3 sm:p-4 md:p-5">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-white text-lg sm:text-xl">🔥</span>
            </div>
            <h2 className="text-white text-sm sm:text-base md:text-lg font-bold">
              پیشنهادات ویژه
            </h2>
          </div>
          <a href="#" className="text-white/90 hover:text-white text-xs sm:text-sm font-medium transition-colors border-b border-white/30 hover:border-white pb-0.5">
            مشاهده همه
          </a>
        </div>
      
        <button 
          onClick={() => handleScroll('next')} 
          className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95 border border-gray-200 hidden lg:flex"
        >
          <FaChevronLeft className="text-xs sm:text-sm" />
        </button>
        
        <div 
          ref={scrollContainerRef} 
          className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto overflow-y-hidden scroll-smooth pb-2 flex-row-reverse"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {products.map((product) => {
            const discountedPrice = Math.floor(product.price * (1 - product.discount / 100));
            const hasDiscount = product.discount > 0;

            return (
              <div 
                key={product.id} 
                className="flex-shrink-0 w-[130px] sm:w-[150px] md:w-[170px] lg:w-[190px] p-2 sm:p-3 bg-white rounded-xl text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-[110px] sm:h-[130px] md:h-[150px] object-cover rounded-lg mb-2" 
                  />
                  {hasDiscount && (
                    <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {product.discount}%
                    </span>
                  )}
                </div>
                
                <p className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-800 mb-2 h-8 sm:h-10 overflow-hidden line-clamp-2">
                  {product.title}
                </p>
                
                <div className="flex flex-col items-center gap-0.5">
                  {hasDiscount ? (
                    <>
                      <div className="flex items-center justify-center w-full gap-1 sm:gap-2">
                        <span className="text-[10px] xs:text-xs sm:text-sm font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                          {product.discount}%
                        </span>
                        <span className="text-xs sm:text-sm md:text-base font-bold text-black">
                          {formatPrice(discountedPrice)}
                        </span>
                      </div>
                      
                      <span className="text-[8px] xs:text-[10px] sm:text-xs text-gray-400 line-through">
                        {formatPrice(product.price)}
                      </span>
                      
                      <span className="text-[8px] sm:text-[10px] text-gray-500">تومان</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xs sm:text-sm md:text-base font-bold text-gray-800">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-[8px] sm:text-[10px] text-gray-500">تومان</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button 
          onClick={() => handleScroll('prev')} 
          className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95 border border-gray-200 hidden lg:flex"
        >
          <FaChevronRight className="text-xs sm:text-sm" />
        </button>
      </div>

      <style jsx>{`
        ::-webkit-scrollbar {
          display: none;
        }
        * {
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}