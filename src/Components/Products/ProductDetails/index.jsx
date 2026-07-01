import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MoonLoader } from 'react-spinners';
import { FaShoppingCart, FaArrowLeft, FaCheckCircle, FaStar, FaHeart, FaShare } from 'react-icons/fa';

export default function ProductDetails() {
    const {id} = useParams()
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true)
    const [isLiked, setIsLiked] = useState(false)
    
    useEffect(() => {
        (async() => {
            try {
                const res = await fetch(`http://localhost:5000/api/products/${id}`)
                if(!res.ok) {
                    throw new Error ("محصولی یافت نشد")
                }
                const data = await res.json();
                setProduct(data.data)
            } catch (error) {
                console.log("Error fetching product:", error.message)
            } finally {
                setLoading(false)
            }
        })();
    },[id]);
     
    if(loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <MoonLoader size={80} color="#ef4444" />
            </div>
        )
    };

    if(!product) {
        return (
            <div className="text-center py-20 px-4">
                <div className="max-w-md mx-auto">
                    <div className="text-6xl mb-4">🔍</div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">محصولی یافت نشد</h2>
                    <p className="text-gray-500 mb-6">محصول با این شناسه در دسترس نیست</p>
                    <Link to="/home" className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors">
                        بازگشت به لیست محصولات
                    </Link>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
                {/* دکمه بازگشت */}
                <Link 
                    to="/home" 
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors duration-300 mb-4 sm:mb-6 group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="text-sm sm:text-base font-medium">بازگشت</span>
                </Link>

                {/* کارت اصلی */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex flex-col lg:flex-row">
                        {/* بخش تصویر */}
                        <div className="lg:w-1/2 relative bg-gray-50">
                            <div className="relative overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[500px]">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-contain p-4 sm:p-6 hover:scale-105 transition-transform duration-500"
                                    onError={(e) => (e.target.src = "https://via.placeholder.com/600x400?text=No+Image")}
                                />
                                {/* نشان‌های روی تصویر */}
                                <div className="absolute top-3 right-3 flex flex-col gap-2">
                                    <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                                        موجود
                                    </span>
                                </div>
                                {/* دکمه‌های روی تصویر */}
                                <div className="absolute top-3 left-3 flex flex-col gap-2">
                                    <button 
                                        onClick={() => setIsLiked(!isLiked)}
                                        className={`p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110 ${
                                            isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:text-red-500'
                                        }`}
                                    >
                                        <FaHeart size={18} />
                                    </button>
                                    <button className="bg-white p-2 rounded-full shadow-md hover:scale-110 transition-all duration-300 text-gray-600 hover:text-blue-500">
                                        <FaShare size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* بخش اطلاعات */}
                        <div className="lg:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
                            {/* عنوان */}
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 leading-tight">
                                {product.title}
                            </h1>
                            
                            {/* امتیاز */}
                            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={`text-sm ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <span className="text-xs sm:text-sm text-gray-500">(۱۲۸ نظر)</span>
                            </div>

                            {/* توضیحات */}
                            <div className="bg-gray-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                                <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
                                    {product.description || "توضیحات محصول در دسترس نیست."}
                                </p>
                            </div>
                            
                            {/* قیمت */}
                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600">
                                        {product.price ? `${product.price.toLocaleString()}` : "تماس بگیرید"}
                                    </span>
                                    <span className="text-xs sm:text-sm text-gray-500">تومان</span>
                                </div>
                                {product.price && (
                                    <span className="text-xs sm:text-sm text-gray-400 line-through">
                                        {Math.floor(product.price * 1.2).toLocaleString()} تومان
                                    </span>
                                )}
                                <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-green-100 text-green-700 rounded-full text-[10px] sm:text-xs font-semibold flex items-center gap-1">
                                    <FaCheckCircle size={12} />
                                    موجود
                                </span>
                            </div>

                            {/* ویژگی‌ها */}
                            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                                <div className="bg-gray-50 rounded-lg p-2 sm:p-3 text-center">
                                    <span className="text-[10px] sm:text-xs text-gray-500">ضمانت</span>
                                    <p className="text-[10px] sm:text-xs font-semibold text-gray-700">۱۸ ماهه</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-2 sm:p-3 text-center">
                                    <span className="text-[10px] sm:text-xs text-gray-500">ارسال</span>
                                    <p className="text-[10px] sm:text-xs font-semibold text-gray-700">۲۴ ساعته</p>
                                </div>
                            </div>

                            {/* دکمه افزودن به سبد خرید */}
                            <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2.5 sm:py-3 md:py-3.5 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95">
                                <FaShoppingCart size={18} />
                                افزودن به سبد خرید
                            </button>

                            {/* اطلاعات اضافی */}
                            <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-gray-400">
                                <span>دسته‌بندی: الکترونیک</span>
                                <span>|</span>
                                <span>کد محصول: #{product.id || 'XXXX'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* محصولات پیشنهادی */}
                <div className="mt-8 sm:mt-12">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                        محصولات مشابه
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-2 sm:p-3">
                                <div className="h-24 sm:h-32 md:h-40 bg-gray-100 rounded-lg mb-2 overflow-hidden">
                                    <img 
                                        src="/assets/nemone.jpg" 
                                        alt="محصول" 
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <h4 className="text-[10px] sm:text-xs font-medium text-gray-700 line-clamp-1">محصول پیشنهادی</h4>
                                <p className="text-[10px] sm:text-xs font-bold text-red-600 mt-1">۲۵۰,۰۰۰ تومان</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}