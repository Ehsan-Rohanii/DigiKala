import React, { useRef, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function ProductSlider() {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:5000';
  const PLACEHOLDER_IMAGE = '/assets/nemone.jpg';

  // ==========================================
  // دریافت محصولات
  // ==========================================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/api/products`);

        if (!res.ok) {
          throw new Error(`خطای سرور: ${res.status}`);
        }

        const data = await res.json();

        const productList = Array.isArray(data?.data)
          ? data.data
          : [];

        setProducts(productList.slice(0, 20));
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ==========================================
  // رفتن به صفحه محصول
  // ==========================================
  const handleProductClick = (productId) => {
    if (!productId) {
      console.warn('Product ID is missing');
      return;
    }

    navigate(`/product/${productId}`);
  };

  // ==========================================
  // اسکرول اسلایدر
  // ==========================================
  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = direction === 'next' ? -250 : 250;

    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  // ==========================================
  // فرمت قیمت
  // ==========================================
  const formatPrice = (price) => {
    if (
      price === undefined ||
      price === null ||
      price === '' ||
      Number.isNaN(Number(price))
    ) {
      return 'نامشخص';
    }

    return Number(price).toLocaleString('fa-IR');
  };

  // ==========================================
  // دریافت قیمت محصول
  // ==========================================
  const getDisplayPrice = (product) => {
    if (!product) {
      return {
        price: null,
        originalPrice: null,
        hasDiscount: false,
        discountPercent: 0,
        isValid: false
      };
    }

    // ------------------------------------------
    // اگر variant به صورت object باشد
    // ------------------------------------------
    if (
      product.defaultProductVariantId &&
      typeof product.defaultProductVariantId === 'object'
    ) {
      const variant = product.defaultProductVariantId;

      const finalPrice =
        variant.finalPrice !== undefined &&
        variant.finalPrice !== null &&
        variant.finalPrice !== ''
          ? Number(variant.finalPrice)
          : variant.price !== undefined &&
              variant.price !== null &&
              variant.price !== ''
            ? Number(variant.price)
            : null;

      const originalPrice =
        variant.price !== undefined &&
        variant.price !== null &&
        variant.price !== ''
          ? Number(variant.price)
          : null;

      const discount =
        variant.discountPercent !== undefined &&
        variant.discountPercent !== null &&
        variant.discountPercent !== ''
          ? Number(variant.discountPercent)
          : 0;

      const hasDiscount =
        discount > 0 &&
        originalPrice !== null &&
        finalPrice !== null &&
        originalPrice > finalPrice;

      return {
        price: finalPrice,
        originalPrice,
        hasDiscount,
        discountPercent: discount,
        isValid:
          finalPrice !== null &&
          !Number.isNaN(finalPrice)
      };
    }

    // ------------------------------------------
    // اگر variant وجود نداشت
    // از price خود محصول استفاده می‌کنیم
    // ------------------------------------------
    if (
      product.price !== undefined &&
      product.price !== null &&
      product.price !== ''
    ) {
      const price = Number(product.price);

      if (!Number.isNaN(price)) {
        return {
          price,
          originalPrice: null,
          hasDiscount: false,
          discountPercent: 0,
          isValid: true
        };
      }
    }

    // ------------------------------------------
    // قیمت نامعتبر
    // ------------------------------------------
    return {
      price: null,
      originalPrice: null,
      hasDiscount: false,
      discountPercent: 0,
      isValid: false
    };
  };

  // ==========================================
  // دریافت تصویر محصول
  // ==========================================
  const getProductImage = (product) => {
    if (!product) {
      return PLACEHOLDER_IMAGE;
    }

    let image = null;

    // اول images
    if (
      Array.isArray(product.images) &&
      product.images.length > 0 &&
      product.images[0]
    ) {
      image = product.images[0];
    }

    // اگر images نبود از image استفاده کن
    if (!image && product.image) {
      image = product.image;
    }

    // هیچ تصویری وجود ندارد
    if (!image) {
      return PLACEHOLDER_IMAGE;
    }

    // اگر URL کامل است
    if (
      typeof image === 'string' &&
      (
        image.startsWith('http://') ||
        image.startsWith('https://') ||
        image.startsWith('data:')
      )
    ) {
      return image;
    }

    // تبدیل مسیر نسبی به URL سرور
    const cleanImage = String(image).replace(/^\/+/, '');

    return `${API_URL}/${cleanImage}`;
  };

  // ==========================================
  // Loading
  // ==========================================
  if (loading) {
    return (
      <div
        dir="rtl"
        className="relative w-full sm:w-[95%] md:w-[92%] lg:w-[90%] mx-auto my-6 sm:my-8 md:my-10 font-sans"
      >
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-3 sm:p-4 md:p-5">

          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-lg sm:text-xl">
                  🔥
                </span>
              </div>

              <h2 className="text-white text-sm sm:text-base md:text-lg font-bold">
                پیشنهادات ویژه
              </h2>
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3 md:gap-4 overflow-hidden pb-2">

            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={`skeleton-${item}`}
                className="flex-shrink-0 w-[130px] sm:w-[150px] md:w-[170px] lg:w-[190px] p-2 sm:p-3 bg-white rounded-xl animate-pulse"
              >
                <div className="w-full h-[110px] sm:h-[130px] md:h-[150px] bg-gray-200 rounded-lg mb-2" />

                <div className="h-4 bg-gray-200 rounded mb-2" />

                <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
              </div>
            ))}

          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // محصولی وجود ندارد
  // ==========================================
  if (products.length === 0) {
    return null;
  }

  // ==========================================
  // Render
  // ==========================================
  return (
    <div
      dir="rtl"
      className="relative w-full sm:w-[95%] md:w-[92%] lg:w-[90%] mx-auto my-6 sm:my-8 md:my-10 font-sans"
    >

      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-3 sm:p-4 md:p-5">

        {/* ==================================
            Header
        ================================== */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">

          <div className="flex items-center gap-2 sm:gap-3">

            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-white text-lg sm:text-xl">
                🔥
              </span>
            </div>

            <h2 className="text-white text-sm sm:text-base md:text-lg font-bold">
              پیشنهادات ویژه
            </h2>

          </div>

          <button
            type="button"
            onClick={() => navigate('/products')}
            className="text-white/90 hover:text-white text-xs sm:text-sm font-medium transition-colors border-b border-white/30 hover:border-white pb-0.5"
          >
            مشاهده همه
          </button>

        </div>

        {/* ==================================
            Previous Button
        ================================== */}
        <button
          type="button"
          onClick={() => handleScroll('next')}
          aria-label="محصولات قبلی"
          className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95 border border-gray-200 hidden lg:flex"
        >
          <FaChevronLeft className="text-xs sm:text-sm" />
        </button>

        {/* ==================================
            Products
        ================================== */}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto overflow-y-hidden scroll-smooth pb-2"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >

          {products.map((product, index) => {

            const priceInfo = getDisplayPrice(product);
            const productImage = getProductImage(product);

            // کلید ثابت و یکتا
            const productKey =
              product?._id ||
              product?.id ||
              product?.productId ||
              `product-${index}`;

            return (
              <div
                key={productKey}
                className="flex-shrink-0 w-[130px] sm:w-[150px] md:w-[170px] lg:w-[190px] p-2 sm:p-3 bg-white rounded-xl text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                onClick={() => handleProductClick(product?._id || product?.id)}
              >

                {/* ==================================
                    Image
                ================================== */}
                <div className="relative">

                  <div className="w-full h-[110px] sm:h-[130px] md:h-[150px] bg-gray-100 rounded-lg mb-2 overflow-hidden flex items-center justify-center">

                    <img
                      src={productImage}
                      alt={product?.title || 'محصول'}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        const image = e.currentTarget;

                        // جلوگیری از loop
                        if (
                          !image.dataset.fallback &&
                          image.src !== window.location.origin + PLACEHOLDER_IMAGE
                        ) {
                          image.dataset.fallback = 'true';
                          image.src = PLACEHOLDER_IMAGE;
                        }
                      }}
                    />

                  </div>

                  {/* تخفیف */}
                  {priceInfo.hasDiscount &&
                    priceInfo.discountPercent > 0 && (
                      <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {formatPrice(priceInfo.discountPercent)}٪
                      </span>
                    )}

                </div>

                {/* ==================================
                    Title
                ================================== */}
                <p className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-800 mb-2 h-8 sm:h-10 overflow-hidden line-clamp-2">
                  {product?.title || 'بدون عنوان'}
                </p>

                {/* ==================================
                    Price
                ================================== */}
                <div className="flex flex-col items-center gap-0.5">

                  {priceInfo.hasDiscount &&
                  priceInfo.discountPercent > 0 ? (
                    <>
                      <div className="flex items-center justify-center w-full gap-1 sm:gap-2">

                        <span className="text-[10px] xs:text-xs sm:text-sm font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                          {formatPrice(priceInfo.discountPercent)}٪
                        </span>

                        <span className="text-xs sm:text-sm md:text-base font-bold text-black">
                          {priceInfo.isValid &&
                          priceInfo.price !== null
                            ? formatPrice(priceInfo.price)
                            : 'نامشخص'}
                        </span>

                      </div>

                      {priceInfo.originalPrice !== null && (
                        <span className="text-[8px] xs:text-[10px] sm:text-xs text-gray-400 line-through">
                          {formatPrice(priceInfo.originalPrice)}
                        </span>
                      )}

                      <span className="text-[8px] sm:text-[10px] text-gray-500">
                        تومان
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-xs sm:text-sm md:text-base font-bold text-gray-800">
                        {priceInfo.isValid &&
                        priceInfo.price !== null
                          ? formatPrice(priceInfo.price)
                          : 'نامشخص'}
                      </span>

                      {priceInfo.isValid && (
                        <span className="text-[8px] sm:text-[10px] text-gray-500">
                          تومان
                        </span>
                      )}
                    </>
                  )}

                </div>

              </div>
            );
          })}

        </div>

        {/* ==================================
            Next Button
        ================================== */}
        <button
          type="button"
          onClick={() => handleScroll('prev')}
          aria-label="محصولات بعدی"
          className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95 border border-gray-200 hidden lg:flex"
        >
          <FaChevronRight className="text-xs sm:text-sm" />
        </button>

      </div>

      {/* ==================================
          Scrollbar CSS
      ================================== */}
      <style>{`
        .product-slider-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>

    </div>
  );
}