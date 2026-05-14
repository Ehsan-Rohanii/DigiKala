import React from 'react'

export default function AdSection3() {
    const ads = [
        {id:1 , img:'/assets/ad3-1.jpg'},
        {id:2 , img:'/assets/ad3-2.jpg'},
    ];

    const ad = ads.map((a) => {
        return (
            <a key={a.id} href='#' className='group'>
                {/* تصویر ریسپانسیو با حفظ نسبت ابعاد */}
                <img 
                    src={a.img} 
                    alt="" 
                    className='w-full h-auto rounded-xl object-cover transition-transform duration-300 group-hover:scale-[1.02]' 
                />
            </a>
        )
    });

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 w-[90%] mx-auto gap-4 mb-[3%]'>
      {ad}
    </div>
  )
}