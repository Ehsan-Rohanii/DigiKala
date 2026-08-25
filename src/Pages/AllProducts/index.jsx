import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // تابع برای فرمت قیمت
  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(price)) {
      return 'نامشخص';
    }
    try {
      return price.toLocaleString('fa-IR');
    } catch (error) {
      return String(price);
    }
  };

  // تابع برای نمایش قیمت با تخفیف یا بدون تخفیف
  const getDisplayPrice = (product) => {
    // بررسی وجود defaultProductVariantId
    if (!product || !product.defaultProductVariantId) {
      return {
        price: null,
        originalPrice: null,
        hasDiscount: false,
        discountPercent: 0,
        isValid: false
      };
    }

    const variant = product.defaultProductVariantId;
    
    // دریافت قیمت‌ها با بررسی undefined
    const finalPrice = variant.finalPrice !== undefined && variant.finalPrice !== null 
      ? Number(variant.finalPrice) 
      : (variant.price !== undefined && variant.price !== null ? Number(variant.price) : null);
    
    const originalPrice = variant.price !== undefined && variant.price !== null 
      ? Number(variant.price) 
      : null;
    
    const discount = variant.discountPercent !== undefined && variant.discountPercent !== null 
      ? Number(variant.discountPercent) 
      : 0;

    const hasDiscount = discount > 0 && originalPrice !== null && finalPrice !== null && originalPrice > finalPrice;

    return {
      price: finalPrice,
      originalPrice: originalPrice,
      hasDiscount,
      discountPercent: discount,
      isValid: finalPrice !== null
    };
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-6">
          <p className="text-center text-gray-500">در حال بارگذاری...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-6">
        {products.length === 0 ? (
          <p className="text-center text-gray-500">محصولی یافت نشد</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((pr) => {
              const priceInfo = getDisplayPrice(pr);
              
              return (
                <div
                  key={pr._id || Math.random()}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer"
                  onClick={() => handleProductClick(pr._id)}
                >
                  <div className="h-48 overflow-hidden bg-gray-100 relative">
                    <img
                      src={pr.images && pr.images.length > 0 && pr.images[0]
                        ? `http://localhost:5000/${pr.images[0]}`
                        : "/assets/nemone.jpg"
                      }
                      alt={pr.title || 'محصول'}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "/assets/nemone.jpg";
                      }}
                    />
                    
                    {/* نشان‌دهنده موجودی */}
                    {pr.inStock === true && (
                      <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        موجود
                      </span>
                    )}
                    
                    {/* نشان‌دهنده تخفیف */}
                    {priceInfo.hasDiscount && priceInfo.discountPercent > 0 && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {priceInfo.discountPercent}٪ تخفیف
                      </span>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    {/* برند */}
                    {pr.brandId && (
                      <span className="text-xs text-gray-500 mb-1">
                        {typeof pr.brandId === 'object' ? pr.brandId.title || '' : ''}
                      </span>
                    )}

                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                      {pr.title || 'بدون عنوان'}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                      {pr.description || 'توضیحاتی موجود نیست'}
                    </p>

                    {/* دسته‌بندی‌ها */}
                    {pr.categoryIds && pr.categoryIds.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {pr.categoryIds.slice(0, 2).map((cat, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                          >
                            {typeof cat === 'object' ? cat.title || '' : cat || ''}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* امتیاز */}
                    {pr.ratingAvg !== undefined && pr.ratingAvg !== null && pr.ratingAvg > 0 && (
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-gray-600">
                          {Number(pr.ratingAvg).toFixed(1)} ({pr.ratingCount || 0})
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="text-red-600 font-bold text-lg">
                          {priceInfo.isValid && priceInfo.price !== null
                            ? formatPrice(priceInfo.price)
                            : 'نامشخص'
                          }
                        </span>
                        <span className="text-xs text-gray-500">تومان</span>
                      </div>
                      
                      {priceInfo.hasDiscount && priceInfo.originalPrice !== null && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(priceInfo.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* تعداد فروش */}
                    {pr.boughtCount !== undefined && pr.boughtCount !== null && pr.boughtCount > 0 && (
                      <div className="text-xs text-gray-400 mt-2">
                        {formatPrice(pr.boughtCount)} فروخته شده
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}