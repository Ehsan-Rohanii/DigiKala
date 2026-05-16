import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaBars,
  FaBell,
  FaMapMarkedAlt,
  FaSearch,
  FaShoppingCart,
  FaChevronDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import notify from "../../Utils/Notify";

// لیست دسته‌بندی‌ها برای مگامنو
const categories = [
  {
    title: "همه محصولات",
    items: ["همه محصولات"],
  },
  {
    title: "موبایل و تبلت",
    items: ["گوشی موبایل", "تبلت", "گوشی‌های ارزان", "لوازم جانبی موبایل"],
  },
  {
    title: "لپ‌تاپ و کامپیوتر",
    items: ["لپ‌تاپ", "قطعات کامپیوتر", "مانیتور", "کیبورد و موس"],
  },
  {
    title: "تلویزیون و صوتی",
    items: ["تلویزیون", "سینمای خانگی", "هدفون", "اسپیکر"],
  },
  {
    title: "خانه و آشپزخانه",
    items: ["یخچال و فریزر", "ماشین لباسشویی", "ظروف آشپزخانه", "دکوراسیون"],
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState();
  const [id, setId] = useState("");
  const [search1, setSearch1] = useState();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) {
          throw new Error("محصولی یافت نشد");
        }
        const data = await res.json();
        setSearch(data.data);
      } catch (error) {
        alert("محصولی پیدا نشد");
      }
    })();
  }, [id]);
  console.log(search);

  return (
    <nav>
      <div className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* بخش سمت چپ: دکمه‌ها و آیکون‌ها */}
          <div className="flex items-center gap-4">
            {/* دکمه ورود/ثبت نام */}
            <button
              onClick={() => {
                navigate("/");
              }}
              className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <span>ورود | ثبت‌نام</span>
            </button>

            {/* آیکون سبد خرید */}
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <FaShoppingCart size={22} className="text-gray-700" />
            </button>

            {/* آیکون اعلان‌ها */}
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FaBell size={20} className="text-gray-500" />
            </button>
          </div>

          {/* بخش سمت راست: لوگو و سرچ */}
          <div className="flex items-center gap-6">
            <div className="relative hidden md:flex items-center">
              <input
                type="text"
                placeholder="جستجو در دیجی‌کالا"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-[600px] bg-gray-100 text-gray-700 border-none rounded-full py-2.5 px-5 pr-10 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-400 text-right"
              />
              <div className="absolute right-3 text-gray-400">
                <FaSearch size={18} />
              </div>
            </div>

            <h1 className="text-red-600 font-bold text-3xl tracking-tighter cursor-pointer">
              دیجی‌کالا
            </h1>
          </div>
        </div>

        {/* ردیف پایین: آدرس و دسته‌بندی */}
        <div className="  border-gray-200">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
            {/* بخش انتخاب آدرس (سمت چپ) */}
            <div className="flex items-center gap-2 bg-orange-200 rounded-full px-3 py-1 text-orange-800 cursor-pointer hover:text-gray-900 transition-colors">
              <FaMapMarkedAlt className="text-gray-500" />
              <span>انتخاب آدرس</span>
            </div>

            {/* بخش دسته‌بندی و لینک‌ها (با چیدمان معکوس: راست به چپ) */}
            <div className="flex items-center gap-6 flex-row-reverse">
              {/* بخش دسته‌بندی با مگامنو */}
              <div className="flex items-center gap-6 flex-row-reverse">
                {/* بخش دسته‌بندی با مگامنو */}
                <div
                  className="relative flex items-center gap-2 text-gray-700 font-bold cursor-pointer hover:text-red-600 transition-colors"
                  onMouseEnter={() => setIsMenuOpen(true)}
                  onMouseLeave={() => setIsMenuOpen(false)}
                >
                  <FaChevronDown size={12} className="mt-1" />
                  <span>دسته‌بندی کالاها</span>

                  <FaBars className="text-gray-500" />

                  {/* مگامنو */}
                  {isMenuOpen && (
                    <div className="absolute top-[100%] right-0 w-full md:w-[750px] bg-white shadow-2xl rounded-b-lg border border-gray-100 p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 z-50 max-h-[70vh] overflow-y-auto">
                      {categories.map((cat, index) => (
                        <div 
                        key={index}
                        className="flex flex-col gap-2"
                        onClick={()=> (navigate('/allProducts'))}
                        >
                          <h3 className="font-bold text-gray-800 border-b pb-2 mb-2 text-sm md:text-base">
                            {cat.title}
                          </h3>
                          <ul className="flex flex-col gap-1">
                            {cat.items.map((item, i) => (
                              <li
                                key={i}
                                className="text-gray-600 hover:text-red-600 hover:underline cursor-pointer text-sm md:text-sm py-1"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* سایر لینک‌های سریع */}
              <div className="hidden lg:flex items-center gap-4 text-gray-600 text-sm">
                <a href="#" className="hover:text-red-600">
                  !در دیجیکالا بفروشید
                </a>
                <a href="#" className="hover:text-red-600">
                  سوالی دارید؟
                </a>
                <a href="#" className="hover:text-red-600">
                  پرفروش‌ترین‌ها
                </a>
                <a href="#" className="hover:text-red-600">
                  طلای دیجیتال
                </a>
                <a href="#" className="hover:text-red-600">
                  سوپرمارکت
                </a>
                <a href="#" className="hover:text-red-600">
                  شگفت‌انگیزها
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {id && (
        <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out m-5">
          <img className="w-[70%] h-48 mx-auto " src={search.image} alt={search.title} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-gray-800">
              {search.title}
            </div>
            <p>تومان {search.price}</p>
          </div>
        </div>
      )}
    </nav>
  );
}
