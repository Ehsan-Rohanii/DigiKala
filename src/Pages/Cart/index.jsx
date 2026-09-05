// src/Pages/Cart/index.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaShoppingCart,
  FaArrowLeft,
  FaTrash,
  FaPlus,
  FaMinus,
  FaTruck,
  FaShieldAlt,
  FaCheckCircle,
  FaTimes,
  FaCreditCard,
  FaStore,
  FaChevronRight,
} from "react-icons/fa";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch("http://localhost:5000/api/carts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!res.ok) {
        throw new Error("خطا در دریافت سبد خرید");
      }

      const data = await res.json();
      setCart(data.data || data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "مشکلی در دریافت سبد خرید پیش آمده");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      if (newQuantity < 1) {
        await handleRemoveItem(itemId);
        return;
      }

      setUpdating(true);

      const res = await fetch("http://localhost:5000/api/carts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          productVariantId: itemId,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        throw new Error("خطا در بروزرسانی تعداد");
      }

      await fetchCart();
      toast.success("تعداد بروزرسانی شد");
    } catch (err) {
      toast.error(err.message || "خطا در بروزرسانی تعداد");
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      setUpdating(true);

      const res = await fetch("http://localhost:5000/api/carts/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          productVariantId: itemId,
        }),
      });

      if (!res.ok) {
        throw new Error("خطا در حذف محصول");
      }

      await fetchCart();
      toast.success("محصول حذف شد");
    } catch (err) {
      toast.error(err.message || "خطا در حذف محصول");
    } finally {
      setUpdating(false);
    }
  };

  const handleClearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      setUpdating(true);

      const res = await fetch("http://localhost:5000/api/carts/clear", {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!res.ok) {
        throw new Error("خطا در خالی کردن سبد خرید");
      }

      setCart({ items: [], totalPrice: 0, totalItems: 0 });
      toast.success("سبد خرید خالی شد");
    } catch (err) {
      toast.error(err.message || "خطا در خالی کردن سبد خرید");
    } finally {
      setUpdating(false);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  // Loading Skeleton
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-4 max-w-3xl" dir="rtl">
        <div className="flex items-center justify-between mb-4">
          <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 h-48 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  if (error && !cart) {
    return (
      <div className="container mx-auto px-4 py-12 text-center max-w-md" dir="rtl">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-4">
          <p className="text-red-600">{error}</p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="bg-red-500 text-white rounded-lg px-6 py-2.5 hover:bg-red-600 transition-colors text-sm font-medium"
        >
          بازگشت به فروشگاه
        </button>
      </div>
    );
  }

  const cartItems = cart?.items || [];
  const totalPrice = cart?.totalPrice || 0;
  const totalItems = cart?.totalItems || 0;
  const isEmpty = cartItems.length === 0;

  return (
    <div className="container mx-auto px-4 py-4 max-w-3xl" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-gray-800">سبد خرید</h1>
          {!isEmpty && (
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          )}
        </div>
        <button
          onClick={() => navigate("/")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1 text-gray-600"
        >
          <FaArrowLeft className="text-sm" />
          <span className="text-sm">بازگشت</span>
        </button>
      </div>

      {isEmpty ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl text-center py-16 px-4">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">سبد خرید شما خالی است</h2>
          <p className="text-gray-500 text-sm mb-6">محصولات مورد نظر خود را به سبد خرید اضافه کنید</p>
          <button
            onClick={() => navigate("/")}
            className="bg-red-500 text-white rounded-xl px-8 py-2.5 hover:bg-red-600 transition-colors text-sm font-bold"
          >
            شروع خرید
          </button>
        </div>
      ) : (
        <>
          {/* Clear Cart Button */}
          <div className="flex justify-end mb-3">
            <button
              onClick={handleClearCart}
              disabled={updating}
              className="flex items-center gap-1.5 text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
            >
              <FaTrash className="text-sm" />
              خالی کردن سبد
            </button>
          </div>

          {/* Cart Items */}
          <div className="space-y-3">
            {cartItems.map((item, index) => {
              const product = item.productId || {};
              const variant = item.variantId || {};
              const imageUrl = product.images?.[0]
                ? `http://localhost:5000/${product.images[0]}`
                : "https://via.placeholder.com/80x80?text=No+Image";

              return (
                <div
                  key={item._id || index}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-4"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
                        {product.title || "بدون عنوان"}
                      </h3>
                      {variant.title && (
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded mt-1">
                          {variant.title}
                        </span>
                      )}
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-red-600 font-bold text-sm">
                          {item.price?.toLocaleString("fa-IR")} تومان
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-gray-400 text-xs line-through">
                            {item.originalPrice?.toLocaleString("fa-IR")}
                          </span>
                        )}
                        {item.discountPercent > 0 && (
                          <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            {item.discountPercent}%
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1 || updating}
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-30"
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        <span className="w-7 text-center font-bold text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                          disabled={updating}
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-30"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        disabled={updating}
                        className="w-8 h-8 flex items-center justify-center text-red-400 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h2 className="font-bold text-gray-800 text-base mb-3">خلاصه سبد خرید</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">تعداد محصولات</span>
                <span className="font-semibold">{totalItems} عدد</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">قیمت کل</span>
                <span className="font-semibold">{totalPrice.toLocaleString("fa-IR")} تومان</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">هزینه ارسال</span>
                <span className="text-green-600 font-bold">رایگان</span>
              </div>
            </div>

            <hr className="my-3 border-gray-200" />

            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-gray-800">مبلغ قابل پرداخت</span>
              <span className="text-red-600 font-bold text-lg">
                {totalPrice.toLocaleString("fa-IR")}
                <span className="text-xs text-gray-500 mr-1">تومان</span>
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isEmpty || updating}
              className="w-full bg-red-500 text-white rounded-xl py-3 hover:bg-red-600 transition-colors font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaCreditCard className="text-sm" />
              ادامه فرآیند خرید
            </button>

            {/* Guarantee Badge */}
            <div className="flex justify-end mt-3">
              <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
                <FaCheckCircle className="text-green-500 text-sm" />
                <span className="text-green-600 text-xs font-medium">ضمانت بازگشت وجه</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;