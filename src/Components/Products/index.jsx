import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState();

  useEffect(() => {
    (async () => {
      try {
        const result = await fetch("http://localhost:5000/api/categories");
        const data = await result.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    })();
  }, []);
  

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          دسته‌بندی‌های محصولات
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="cursor-pointer rounded-xl p-4 text-center transition-all duration-300 border-2 border-gray-200 bg-white hover:border-blue-500 hover:shadow-lg hover:-translate-y-1"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-20 h-20 mx-auto mb-3 object-cover rounded-full"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/80?text=No+Image")
                }
              />
              <p className="font-semibold text-gray-700 hover:text-blue-600 transition-colors">
                {cat.title}
              </p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
