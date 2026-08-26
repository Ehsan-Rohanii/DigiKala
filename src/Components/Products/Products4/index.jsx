import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Products() {
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
        setProducts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleProductClick = (productId) => {
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(price)) {
      return 'نامشخص';
    }
    try {
      return Number(price).toLocaleString('fa-IR');
    } catch (error) {
      return String(price);
    }
  };

  const getDisplayPrice = (product) => {
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

  // تابع برای ایجاد placeholder با SVG (بدون درخواست خارجی)
  const getPlaceholderImage = () => {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' fill='%23999' text-anchor='middle' dy='.3em'%3E%D8%A8%D8%AF%D9%88%D9%86 %D8%AA%D8%B5%D9%88%DB%8C%D8%B1%3C/text%3E%3C/svg%3E";
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-gray-100 rounded-xl h-48 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-500">محصولی برای نمایش وجود ندارد</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-right">محصولات</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((pr) => {
          const priceInfo = getDisplayPrice(pr);
          
          return (
            <div
              key={pr._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer border border-gray-100"
              onClick={() => handleProductClick(pr._id)}
            >
              <div className="p-4 flex flex-col flex-grow">
                {pr.brandId && (
                  <span className="text-xs text-gray-500 mb-1">
                    {typeof pr.brandId === 'object' ? pr.brandId.title || '' : ''}
                  </span>
                )}

                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
                  {pr.title || 'بدون عنوان'}
                </h3>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
                  {pr.description || 'توضیحاتی موجود نیست'}
                </p>

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

                {pr.ratingAvg !== undefined && pr.ratingAvg !== null && pr.ratingAvg > 0 && (
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600">
                      {Number(pr.ratingAvg).toFixed(1)} ({pr.ratingCount || 0})
                    </span>
                  </div>
                )}

                {pr.inStock === true && (
                  <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full mb-2">
                    موجود
                  </span>
                )}

                <div className="mt-auto pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-1">
                      <span className="text-red-600 font-bold text-lg">
                        {priceInfo.isValid && priceInfo.price !== null
                          ? formatPrice(priceInfo.price)
                          : 'نامشخص'
                        }
                      </span>
                      <span className="text-xs text-gray-500">تومان</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {priceInfo.hasDiscount && priceInfo.originalPrice !== null && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(priceInfo.originalPrice)}
                        </span>
                      )}
                      
                      {priceInfo.hasDiscount && priceInfo.discountPercent > 0 && (
                        <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                          {priceInfo.discountPercent}٪
                        </span>
                      )}
                    </div>
                  </div>
                </div>

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
    </div>
  );
}