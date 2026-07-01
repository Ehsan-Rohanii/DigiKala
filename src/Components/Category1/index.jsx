import React from 'react'

export default function Category1() {
  const category = [
    {id : 1 , title :"ارسال فوری خواربار" , img : '/assets/c-icon1.jpg'},
    {id : 2 , title :"طلای دیجیتال" , img : '/assets/c-icon2.jpg'},
    {id : 3 , title :"ارسال 3 ساعته" , img : '/assets/c-icon3.jpg'},
    {id : 4 , title :"وام بانکی , اعتبار خرید" , img : '/assets/c-icon4.jpg'},
    {id : 5 , title :"نمایشگاه کتاب" , img : '/assets/c-icon5.jpg'},
    {id : 6 , title :"تخفیف طلا" , img : '/assets/c-icon6.jpg'},
    {id : 7 , title :"بهترین های اپل" , img : '/assets/c-icon7.jpg'},
    {id : 8 , title :"پنکه و کولر قسطی" , img : '/assets/c-icon8.jpg'},
    {id : 9 , title :"خوش تخفیف دیجیتال" , img : '/assets/c-icon9.jpg'},
  ];

  const categories = category.map((ct) => {
    return (
      <a href='#' key={ct.id} className='flex flex-col items-center gap-2 group'>
        <img 
            src={ct.img} 
            alt={ct.title} 
            className='w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105' 
        />
        <p className='text-[10px] sm:text-xs text-gray-700 text-center leading-tight line-clamp-2'>{ct.title}</p>
      </a>
    )
  });

  return (
    <div className='container mx-auto px-2 sm:px-4 py-4'>
      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-4 sm:gap-6 items-center justify-center'>
        
        <div className='flex flex-col items-center gap-2 group cursor-pointer'>
          <div className='w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gray-100 rounded-lg flex items-center justify-center shadow-sm transition-colors duration-300 group-hover:bg-gray-200'>
            <span className='text-xl sm:text-2xl text-gray-400'>...</span>
          </div>
          <p className='text-[10px] sm:text-xs text-gray-700'>بیشتر</p>
        </div>

        {categories}
      </div>
    </div>
  )
}