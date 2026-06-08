import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function CategoryDetails() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        
        if (!res.ok) {
          throw new Error("محصولات یافت نشدند");
        }

        const data = await res.json();
        setProducts(data.data);
        

      } catch (err) {
        console.error("Error fetching data:", err);
        setError("خطا در بارگذاری اطلاعات دسته یا محصولات.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>{error}</p>
        <Link to="/" className="text-blue-500 hover:underline mt-2 inline-block">
          بازگشت به لیست دسته‌ها
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-500 hover:underline mb-6 inline-block">
        ← بازگشت به لیست دسته‌ها
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
        محصولات دسته: <span className="text-blue-600">{categoryTitles[id] || `دسته ${id}`}</span>
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((prod) => (
            <div key={prod.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img 
                src={prod.image} 
                alt={prod.title} 
                className="w-full h-48 object-cover"
                onError={(e) => e.target.src = "https://via.placeholder.com/300x200?text=No+Image"}
              />
              <div className="p-4">
                <h4 className="font-bold text-gray-800 mb-2">{prod.title}</h4>
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
                  مشاهده جزئیات
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-10">محصولی در این دسته یافت نشد.</p>
      )}
    </div>
  );
}
