import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000";
  const PLACEHOLDER_IMAGE = "/assets/nemone.jpg";

  // ==============================
  // دریافت آدرس تصویر
  // ==============================
  const getImageUrl = (image) => {
    if (!image) {
      return PLACEHOLDER_IMAGE;
    }

    // اگر URL کامل باشد
    if (
      typeof image === "string" &&
      (
        image.startsWith("http://") ||
        image.startsWith("https://") ||
        image.startsWith("data:")
      )
    ) {
      return image;
    }

    // حذف / اضافی
    const cleanImage = String(image).replace(/^\/+/, "");

    return `${API_URL}/${cleanImage}`;
  };

  // ==============================
  // دریافت دسته‌بندی‌ها
  // ==============================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const result = await fetch(`${API_URL}/api/categories`);

        if (!result.ok) {
          throw new Error("خطا در دریافت دسته‌بندی‌ها");
        }

        const data = await result.json();

        console.log("Categories:", data.data);

        setCategories(
          Array.isArray(data.data)
            ? data.data
            : []
        );
      } catch (error) {
        console.error(
          "Error fetching categories:",
          error.message
        );

        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // ==============================
  // کلیک روی دسته‌بندی
  // ==============================
  const handleCategoryClick = (category) => {
    const categoryId = category?._id || category?.id;

    if (!categoryId) {
      console.error("Category ID not found:", category);
      return;
    }

    navigate(`/category/${categoryId}`);
  };

  // ==============================
  // Loading
  // ==============================
  if (loading) {
    return (
      <div
        dir="rtl"
        className="container mx-auto px-4 py-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          دسته‌بندی‌های محصولات
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={`category-skeleton-${item}`}
              className="rounded-xl p-4 text-center border-2 border-gray-200 bg-white animate-pulse"
            >
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gray-200" />

              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ==============================
  // بدون دسته‌بندی
  // ==============================
  if (categories.length === 0) {
    return (
      <div
        dir="rtl"
        className="container mx-auto px-4 py-16 text-center"
      >
        <div className="text-5xl mb-4">
          📦
        </div>

        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          دسته‌بندی‌ای یافت نشد
        </h2>

        <p className="text-gray-500">
          در حال حاضر دسته‌بندی محصولی وجود ندارد.
        </p>
      </div>
    );
  }

  // ==============================
  // Render
  // ==============================
  return (
    <div
      dir="rtl"
      className="container mx-auto px-4 py-8"
    >
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          دسته‌بندی‌های محصولات
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">

          {categories.map((cat, index) => {
            // اولویت با _id چون MongoDB معمولاً _id دارد
            const categoryId =
              cat?._id ||
              cat?.id ||
              `category-${index}`;

            const imageUrl = getImageUrl(
              cat?.image ||
              cat?.images?.[0]
            );

            return (
              <div
                key={categoryId}
                onClick={() =>
                  handleCategoryClick(cat)
                }
                className="
                  cursor-pointer
                  rounded-xl
                  p-4
                  text-center
                  transition-all
                  duration-300
                  border-2
                  border-gray-200
                  bg-white
                  hover:border-blue-500
                  hover:shadow-lg
                  hover:-translate-y-1
                "
              >
                {/* تصویر */}
                <div className="w-20 h-20 mx-auto mb-3 overflow-hidden rounded-full bg-gray-100">

                  <img
                    src={imageUrl}
                    alt={cat?.title || "دسته‌بندی محصول"}
                    className="
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-300
                      hover:scale-110
                    "
                    onError={(e) => {
                      // جلوگیری از loop شدن onError
                      if (
                        e.currentTarget.src !==
                        window.location.origin +
                          PLACEHOLDER_IMAGE
                      ) {
                        e.currentTarget.src =
                          PLACEHOLDER_IMAGE;
                      }
                    }}
                  />

                </div>

                {/* عنوان */}
                <p className="
                  font-semibold
                  text-gray-700
                  hover:text-blue-600
                  transition-colors
                ">
                  {cat?.title || "بدون عنوان"}
                </p>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}