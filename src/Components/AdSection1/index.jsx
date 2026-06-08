import React from 'react'

export default function AdSection1() {
    const ads = [
        {id:1 , img:'/assets/ad-1.jpg'},
        {id:2 , img:'/assets/ad-2.jpg'},
        {id:3 , img:'/assets/ad-3.jpg'},
        {id:4 , img:'/assets/ad-4.jpg'},
        {id:5 , img:'/assets/ad-5.jpg'},
        {id:6 , img:'/assets/ad-6.jpg'},
        {id:7 , img:'/assets/ad-7.jpg'},
        {id:8 , img:'/assets/ad-8.jpg'},
    ];

    const ad = ads.map((a) => {
        return (
            <a key={a.id} href='#' className='group'>
                <img 
                    src={a.img} 
                    alt="" 
                    className='w-full h-auto rounded-xl object-cover transition-transform duration-300 group-hover:scale-[1.02]' 
                />
            </a>
        )
    });

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[90%] mx-auto gap-4 mb-[3%]'>
      {ad}
    </div>
  )
}

