import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function CategoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000";
  const PLACEHOLDER_IMAGE = "/assets/nemone.jpg";

  // ==========================================
  // دریافت URL صحیح تصویر
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

    // سپس image
    if (!image && product.image) {
      image = product.image;
    }

    // اگر تصویری وجود نداشت
    if (!image) {
      return PLACEHOLDER_IMAGE;
    }

    // اگر URL کامل است
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

    // حذف / های اضافی
    const cleanImage = String(image).replace(/^\/+/, "");

    return `${API_URL}/${cleanImage}`;
  };

  // ==========================================
  // دریافت محصولات
  // ==========================================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${API_URL}/api/products/${id}`
        );

        if (!res.ok) {
          throw new Error("محصولات یافت نشدند");
        }

        const data = await res.json();

        console.log("Category Products:", data);

        const productList = Array.isArray(data.data)
          ? data.data
          : [];

        // فقط محصولاتی که ID معتبر دارند
        const validProducts = productList.filter(
          (product) =>
            product &&
            (product._id || product.id)
        );

        setProducts(validProducts);

        // اگر API اطلاعات دسته را هم برگرداند
        if (data.category) {
          setCategory(data.category);
        }
      } catch (err) {
        console.error("Error fetching products:", err);

        setProducts([]);
        setError(
          "خطا در بارگذاری اطلاعات دسته یا محصولات."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProducts();
    }
  }, [id]);

  // ==========================================
  // نام دسته
  // ==========================================
  const categoryTitles = {
    1: "الکترونیک",
    2: "پوشاک",
    3: "لوازم خانگی",
    4: "کتاب و مدیا",
    5: "اسباب‌بازی",
    6: "خوراکی و نوشیدنی",
    7: "زیبایی و سلامت",
    8: "خودرو و لوازم جانبی",
  };

  const categoryTitle =
    category?.title ||
    categoryTitles[id] ||
    `دسته ${id}`;

  // ==========================================
  // Loading
  // ==========================================
  if (loading) {
    return (
      <div
        dir="rtl"
        className="flex justify-center items-center min-h-[400px]"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500"></div>

          <p className="text-gray-500 text-sm">
            در حال بارگذاری محصولات...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // Error
  // ==========================================
  if (error) {
    return (
      <div
        dir="rtl"
        className="text-center py-16 px-4"
      >
        <div className="max-w-md mx-auto">
          <div className="text-5xl mb-4">
            ⚠️
          </div>

          <p className="text-red-500 mb-6">
            {error}
          </p>

          <Link
            to="/"
            className="inline-block bg-blue-500 text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 transition-colors"
          >
            بازگشت به لیست دسته‌ها
          </Link>
        </div>
      </div>
    );
  }

  // ==========================================
  // Render
  // ==========================================
  return (
    <div
      dir="rtl"
      className="container mx-auto px-4 py-8"
    >
      {/* ==============================
          بازگشت
      ============================== */}
      <Link
        to="/"
        className="text-blue-500 hover:text-blue-700 transition-colors mb-6 inline-block"
      >
        ← بازگشت به لیست دسته‌ها
      </Link>

      {/* ==============================
          عنوان
      ============================== */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
        محصولات دسته:{" "}
        <span className="text-blue-600">
          {categoryTitle}
        </span>
      </h1>

      {/* ==============================
          محصولات
      ============================== */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((prod, index) => {
            const productId =
              prod._id ||
              prod.id ||
              `product-${index}`;

            const productImage =
              getProductImage(prod);

            return (
              <div
                key={productId}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* ==============================
                    تصویر
                ============================== */}
                <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={productImage}
                    alt={prod.title || "محصول"}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      // جلوگیری از loop شدن onError
                      if (
                        e.currentTarget.dataset.fallback ===
                        "true"
                      ) {
                        return;
                      }

                      e.currentTarget.dataset.fallback =
                        "true";

                      e.currentTarget.src =
                        PLACEHOLDER_IMAGE;
                    }}
                  />
                </div>

                {/* ==============================
                    اطلاعات محصول
                ============================== */}
                <div className="p-4">
                  <h4 className="font-bold text-gray-800 mb-3 line-clamp-2 min-h-[48px]">
                    {prod.title || "بدون عنوان"}
                  </h4>

                  {/* قیمت */}
                  {prod.price !== undefined &&
                    prod.price !== null &&
                    prod.price !== "" && (
                      <div className="text-red-600 font-bold mb-3">
                        {Number(prod.price).toLocaleString(
                          "fa-IR"
                        )}{" "}
                        تومان
                      </div>
                    )}

                  {/* مشاهده جزئیات */}
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/product/${productId}`
                      )
                    }
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    مشاهده جزئیات
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">
            📦
          </div>

          <p className="text-gray-500">
            محصولی در این دسته یافت نشد.
          </p>
        </div>
      )}
    </div>
  );
}