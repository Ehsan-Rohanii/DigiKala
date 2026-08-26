import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import {
  FaShoppingCart,
  FaArrowLeft,
  FaCheckCircle,
  FaStar,
  FaHeart,
  FaShare,
} from 'react-icons/fa';

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  const API_URL = 'http://localhost:5000';
  const PLACEHOLDER_IMAGE = '/assets/nemone.jpg';

  // =========================================================
  // ساخت URL تصویر
  // =========================================================
  const getImageUrl = (image) => {
    if (!image) {
      return PLACEHOLDER_IMAGE;
    }

    if (typeof image !== 'string') {
      return PLACEHOLDER_IMAGE;
    }

    const cleanImage = image.trim();

    if (!cleanImage) {
      return PLACEHOLDER_IMAGE;
    }

    // URL کامل
    if (
      cleanImage.startsWith('http://') ||
      cleanImage.startsWith('https://') ||
      cleanImage.startsWith('data:')
    ) {
      return cleanImage;
    }

    // اگر مسیر با / شروع شده باشد
    if (cleanImage.startsWith('/')) {
      return `${API_URL}${cleanImage}`;
    }

    // مسیر نسبی
    return `${API_URL}/${cleanImage}`;
  };

  // =========================================================
  // دریافت تصویر محصول
  // =========================================================
  const getProductImage = (productData) => {
    if (!productData) {
      return PLACEHOLDER_IMAGE;
    }

    // اول images
    if (
      Array.isArray(productData.images) &&
      productData.images.length > 0
    ) {
      const firstImage = productData.images.find(
        (image) => image && typeof image === 'string'
      );

      if (firstImage) {
        return getImageUrl(firstImage);
      }
    }

    // سپس image
    if (
      productData.image &&
      typeof productData.image === 'string'
    ) {
      return getImageUrl(productData.image);
    }

    return PLACEHOLDER_IMAGE;
  };

  // =========================================================
  // دریافت محصول
  // =========================================================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/api/products/${id}`
        );

        if (!response.ok) {
          throw new Error('محصولی یافت نشد');
        }

        const result = await response.json();

        console.log('Product Details:', result.data);
        console.log('Product Images:', result.data?.images);

        setProduct(result.data || null);
      } catch (error) {
        console.error(
          'Error fetching product:',
          error.message
        );

        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // =========================================================
  // فرمت قیمت
  // =========================================================
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

  // =========================================================
  // دریافت قیمت محصول
  // =========================================================
  const getDisplayPrice = (productData) => {
    if (!productData) {
      return {
        price: null,
        originalPrice: null,
        hasDiscount: false,
        discountPercent: 0,
        isValid: false,
      };
    }

    // =====================================================
    // Variant
    // =====================================================
    if (
      productData.defaultProductVariantId &&
      typeof productData.defaultProductVariantId === 'object'
    ) {
      const variant =
        productData.defaultProductVariantId;

      const variantPrice =
        variant.price !== undefined &&
        variant.price !== null &&
        variant.price !== ''
          ? Number(variant.price)
          : null;

      const variantFinalPrice =
        variant.finalPrice !== undefined &&
        variant.finalPrice !== null &&
        variant.finalPrice !== ''
          ? Number(variant.finalPrice)
          : null;

      const discountPercent =
        variant.discountPercent !== undefined &&
        variant.discountPercent !== null &&
        variant.discountPercent !== ''
          ? Number(variant.discountPercent)
          : 0;

      const finalPrice =
        variantFinalPrice !== null &&
        !Number.isNaN(variantFinalPrice)
          ? variantFinalPrice
          : variantPrice;

      const originalPrice =
        variantPrice !== null &&
        !Number.isNaN(variantPrice)
          ? variantPrice
          : null;

      const hasDiscount =
        discountPercent > 0 &&
        originalPrice !== null &&
        finalPrice !== null &&
        originalPrice > finalPrice;

      return {
        price: finalPrice,
        originalPrice,
        hasDiscount,
        discountPercent,
        isValid:
          finalPrice !== null &&
          !Number.isNaN(finalPrice),
      };
    }

    // =====================================================
    // اگر Variant وجود نداشت
    // =====================================================
    if (
      productData.price !== undefined &&
      productData.price !== null &&
      productData.price !== ''
    ) {
      const price = Number(productData.price);

      if (!Number.isNaN(price)) {
        return {
          price,
          originalPrice: null,
          hasDiscount: false,
          discountPercent: 0,
          isValid: true,
        };
      }
    }

    return {
      price: null,
      originalPrice: null,
      hasDiscount: false,
      discountPercent: 0,
      isValid: false,
    };
  };

  // =========================================================
  // Loading
  // =========================================================
  if (loading) {
    return (
      <div
        dir="rtl"
        className="flex justify-center items-center min-h-screen bg-gray-50"
      >
        <MoonLoader
          size={80}
          color="#ef4444"
        />
      </div>
    );
  }

  // =========================================================
  // Product Not Found
  // =========================================================
  if (!product) {
    return (
      <div
        dir="rtl"
        className="min-h-screen flex items-center justify-center text-center py-20 px-4 bg-gray-50"
      >
        <div className="max-w-md mx-auto">

          <div className="text-6xl mb-4">
            🔍
          </div>

          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            محصولی یافت نشد
          </h2>

          <p className="text-gray-500 mb-6">
            محصول با این شناسه در دسترس نیست
          </p>

          <Link
            to="/home"
            className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            بازگشت به لیست محصولات
          </Link>

        </div>
      </div>
    );
  }

  // =========================================================
  // Product Data
  // =========================================================
  const priceInfo = getDisplayPrice(product);
  const productImage = getProductImage(product);

  console.log('Final Product Image:', productImage);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6"
    >
      <div className="max-w-6xl mx-auto">

        {/* ===================================================
            Back Button
        =================================================== */}
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors duration-300 mb-4 sm:mb-6 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />

          <span className="text-sm sm:text-base font-medium">
            بازگشت
          </span>
        </Link>

        {/* ===================================================
            Main Card
        =================================================== */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

          <div className="flex flex-col lg:flex-row">

            {/* =================================================
                Product Image
            ================================================= */}
            <div className="lg:w-1/2 relative bg-gray-50">

              <div className="relative overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[500px]">

                <img
                  src={productImage}
                  alt={product.title || 'محصول'}
                  className="w-full h-full object-contain p-4 sm:p-6 hover:scale-105 transition-transform duration-500"
                  onError={(event) => {
                    // جلوگیری کامل از loop
                    event.currentTarget.onerror = null;
                    event.currentTarget.src =
                      PLACEHOLDER_IMAGE;
                  }}
                />

                {/* موجودی */}
                {product.inStock === true && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                      موجود
                    </span>
                  </div>
                )}

                {/* دکمه‌ها */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      setIsLiked((prev) => !prev)
                    }
                    className={`p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110 ${
                      isLiked
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-600 hover:text-red-500'
                    }`}
                  >
                    <FaHeart size={18} />
                  </button>

                  <button
                    type="button"
                    className="bg-white p-2 rounded-full shadow-md hover:scale-110 transition-all duration-300 text-gray-600 hover:text-blue-500"
                  >
                    <FaShare size={18} />
                  </button>

                </div>

              </div>
            </div>

            {/* =================================================
                Product Information
            ================================================= */}
            <div className="lg:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-center">

              {/* برند */}
              {product.brandId &&
                typeof product.brandId === 'object' &&
                product.brandId.title && (
                  <span className="text-sm text-gray-500 mb-2">
                    {product.brandId.title}
                  </span>
                )}

              {/* عنوان */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 leading-tight">
                {product.title || 'بدون عنوان'}
              </h1>

              {/* امتیاز */}
              {product.ratingAvg !== undefined &&
                product.ratingAvg !== null &&
                Number(product.ratingAvg) > 0 && (
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">

                    <div className="flex items-center gap-1">

                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={`text-sm ${
                            index <
                            Math.round(
                              Number(product.ratingAvg)
                            )
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}

                    </div>

                    <span className="text-xs sm:text-sm text-gray-500">
                      ({product.ratingCount || 0} نظر)
                    </span>

                  </div>
                )}

              {/* توضیحات */}
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">

                <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
                  {product.description ||
                    'توضیحات محصول در دسترس نیست.'}
                </p>

              </div>

              {/* قیمت */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">

                <div className="flex items-baseline gap-2">

                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600">
                    {priceInfo.isValid
                      ? formatPrice(priceInfo.price)
                      : 'تماس بگیرید'}
                  </span>

                  {priceInfo.isValid && (
                    <span className="text-xs sm:text-sm text-gray-500">
                      تومان
                    </span>
                  )}

                </div>

                {/* قیمت قبلی */}
                {priceInfo.hasDiscount &&
                  priceInfo.originalPrice !== null && (
                    <span className="text-xs sm:text-sm text-gray-400 line-through">
                      {formatPrice(
                        priceInfo.originalPrice
                      )}{' '}
                      تومان
                    </span>
                  )}

                {/* درصد تخفیف */}
                {priceInfo.hasDiscount &&
                  priceInfo.discountPercent > 0 && (
                    <span className="px-2 sm:px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                      {formatPrice(
                        priceInfo.discountPercent
                      )}٪ تخفیف
                    </span>
                  )}

                {/* موجودی */}
                {product.inStock === true && (
                  <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
                    <FaCheckCircle size={12} />
                    موجود
                  </span>
                )}

              </div>

              {/* ویژگی‌ها */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">

                <div className="bg-gray-50 rounded-lg p-2 sm:p-3 text-center">

                  <span className="text-[10px] sm:text-xs text-gray-500">
                    ضمانت
                  </span>

                  <p className="text-[10px] sm:text-xs font-semibold text-gray-700">
                    ۱۸ ماهه
                  </p>

                </div>

                <div className="bg-gray-50 rounded-lg p-2 sm:p-3 text-center">

                  <span className="text-[10px] sm:text-xs text-gray-500">
                    ارسال
                  </span>

                  <p className="text-[10px] sm:text-xs font-semibold text-gray-700">
                    ۲۴ ساعته
                  </p>

                </div>

              </div>

              {/* سبد خرید */}
              <button
                type="button"
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2.5 sm:py-3 md:py-3.5 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
              >
                <FaShoppingCart size={18} />
                افزودن به سبد خرید
              </button>

              {/* اطلاعات اضافی */}
              <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-gray-400">

                {product.categoryIds &&
                  product.categoryIds.length > 0 && (
                    <span>
                      دسته‌بندی:{' '}

                      {typeof product.categoryIds[0] ===
                      'object'
                        ? product.categoryIds[0].title ||
                          '---'
                        : product.categoryIds[0]}
                    </span>
                  )}

                <span>|</span>

                <span>
                  کد محصول: #
                  {product._id || id || 'XXXX'}
                </span>

              </div>

            </div>
          </div>
        </div>

        {/* ===================================================
            Similar Products
        =================================================== */}
        <div className="mt-8 sm:mt-12">

          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
            محصولات مشابه
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-2 sm:p-3"
              >

                <div className="h-24 sm:h-32 md:h-40 bg-gray-100 rounded-lg mb-2 overflow-hidden">

                  <img
                    src="/assets/nemone.jpg"
                    alt="محصول پیشنهادی"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />

                </div>

                <h4 className="text-[10px] sm:text-xs font-medium text-gray-700 line-clamp-1">
                  محصول پیشنهادی
                </h4>

                <p className="text-[10px] sm:text-xs font-bold text-red-600 mt-1">
                  ۲۵۰,۰۰۰ تومان
                </p>

              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}