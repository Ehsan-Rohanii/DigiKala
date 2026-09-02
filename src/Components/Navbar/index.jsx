import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaBars,
  FaBell,
  FaMapMarkedAlt,
  FaSearch,
  FaShoppingCart,
  FaChevronDown,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState(null);
  const [id, setId] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [cartCount, setCartCount] = useState(0);

  // دریافت شماره کاربر از localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setUserPhone(user.phoneNumber || user.phone || "");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // دریافت تعداد سبد خرید
  useEffect(() => {
    const fetchCartCount = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCartCount(0);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/cart", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (res.ok) {
          const data = await res.json();
          const cart = data.data || data;
          setCartCount(cart?.totalItems || 0);
        }
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };

    fetchCartCount();
  }, []);

  useEffect(() => {
    if (!id) {
      setSearch(null);
      return;
    }
    
    (async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) {
          throw new Error("محصولی یافت نشد");
        }
        const data = await res.json();
        setSearch(data.data);
      } catch (error) {
        toast.error("محصولی پیدا نشد");
        setSearch(null);
      }
    })();
  }, [id]);

  // تابع خروج از حساب
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setUserPhone("");
    setCartCount(0);
    navigate("/");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav>
      <div className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* دکمه همبرگری برای موبایل */}
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsSearchOpen(false);
              }}
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* دکمه ورود/خروج - دسکتاپ */}
            {isLoggedIn ? (
              <div className="hidden sm:flex items-center gap-3">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 border border-red-300 rounded-lg px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-medium"
                >
                  خروج
                </button>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-200">
                  <FaUser className="text-gray-400 text-sm" />
                  <span className="text-sm font-medium text-gray-700 dir-ltr">
                    {userPhone || "کاربر"}
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="hidden sm:flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-1.5 bg-red-500 text-white hover:bg-red-600 transition-colors text-sm font-medium"
              >
                <span>ورود | ثبت‌نام</span>
              </button>
            )}

            {/* دکمه سبد خرید - لینک به /cart */}
            <button
              onClick={() => navigate("/cart")}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <FaShoppingCart size={18} className="sm:text-[22px] text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>

            <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
              <FaBell size={18} className="sm:text-[20px] text-gray-500" />
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            {/* جستجوی دسکتاپ */}
            <div className="relative hidden md:flex items-center">
              <input
                type="text"
                placeholder="جستجو در دیجی‌کالا"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-[300px] sm:w-[400px] lg:w-[600px] bg-gray-100 text-gray-700 border-none rounded-full py-2 sm:py-2.5 px-3 sm:px-5 pr-8 sm:pr-10 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-400 text-right text-sm sm:text-base"
              />
              <div className="absolute right-2 sm:right-3 text-gray-400">
                <FaSearch size={16} className="sm:text-[18px]" />
              </div>
            </div>

            <h1 
              onClick={() => navigate("/")}
              className="text-red-600 font-bold text-2xl sm:text-3xl tracking-tighter cursor-pointer whitespace-nowrap"
            >
              دیجی‌کالا
            </h1>

            {/* دکمه جستجو برای موبایل */}
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                setIsMobileMenuOpen(false);
              }}
            >
              {isSearchOpen ? (
                <FaTimes size={18} className="text-gray-600" />
              ) : (
                <FaSearch size={18} className="text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* جستجوی موبایل */}
        {isSearchOpen && (
          <div className="md:hidden container mx-auto px-4 pb-3">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="جستجو در دیجی‌کالا"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full bg-gray-100 text-gray-700 border-none rounded-full py-2.5 px-5 pr-10 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-400 text-right text-sm"
                autoFocus
              />
              <div className="absolute right-3 text-gray-400">
                <FaSearch size={16} />
              </div>
            </div>
          </div>
        )}

        {/* منوی موبایل */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg max-h-[80vh] overflow-y-auto">
            <div className="container mx-auto px-4 py-3">
              {/* جستجو در منوی موبایل */}
              <div className="relative flex items-center mb-4">
                <input
                  type="text"
                  placeholder="جستجو در دیجی‌کالا"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-full bg-gray-100 text-gray-700 border-none rounded-full py-2.5 px-5 pr-10 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-400 text-right text-sm"
                />
                <div className="absolute right-9 text-gray-400">
                  <FaSearch size={16} />
                </div>
              </div>

              {/* دکمه‌های کاربری در موبایل */}
              <div className="flex flex-col gap-2 mb-4">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-200">
                      <FaUser className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-700 dir-ltr">
                        {userPhone || "کاربر"}
                      </span>
                    </div>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-center bg-red-400 text-white rounded-lg py-2.5 hover:bg-red-500 transition-colors text-sm"
                    >
                      خروج از حساب کاربری
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-center bg-red-500 text-white rounded-lg py-2.5 hover:bg-red-600 transition-colors text-sm"
                  >
                    ورود | ثبت‌نام
                  </button>
                )}
              </div>

              {/* آدرس در موبایل */}
              <div className="flex items-center gap-2 bg-orange-50 rounded-full px-3 py-2 text-orange-800 cursor-pointer hover:bg-orange-100 transition-colors mb-4">
                <FaMapMarkedAlt className="text-gray-500" />
                <span className="text-sm">انتخاب آدرس</span>
              </div>

              {/* لینک‌های سریع در موبایل */}
              <div className="flex flex-col gap-1 border-t border-gray-200 pt-3">
                {[
                  "فروش در دیجیکالا",
                  "سوالی دارید؟",
                  "پرفروش‌ترین‌ها",
                  "طلای دیجیتال",
                  "سوپرمارکت",
                  "شگفت‌انگیزها"
                ].map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-700 hover:text-red-600 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* دسته‌بندی‌ها در موبایل */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3 text-sm">دسته‌بندی کالاها</h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat, index) => (
                    <div key={index} className="flex flex-col gap-1">
                      <h4 
                        className="font-semibold text-gray-700 text-sm cursor-pointer hover:text-red-600 transition-colors"
                        onClick={() => {
                          navigate('/allProducts');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {cat.title}
                      </h4>
                      <ul className="flex flex-col gap-0.5">
                        {cat.items.slice(0, 2).map((item, i) => (
                          <li
                            key={i}
                            className="text-gray-500 hover:text-red-600 cursor-pointer text-xs py-0.5 transition-colors"
                            onClick={() => {
                              navigate('/allProducts');
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="border-gray-200 hidden md:block">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 bg-orange-200 rounded-full px-3 py-1 text-orange-800 cursor-pointer hover:text-gray-900 transition-colors">
              <FaMapMarkedAlt className="text-gray-500" />
              <span>انتخاب آدرس</span>
            </div>

            <div className="flex items-center gap-6 flex-row-reverse">
              <div className="flex items-center gap-6 flex-row-reverse">
                <div
                  className="relative flex items-center gap-2 text-gray-700 font-bold cursor-pointer hover:text-red-600 transition-colors"
                  onMouseEnter={() => setIsMenuOpen(true)}
                  onMouseLeave={() => setIsMenuOpen(false)}
                >
                  <FaChevronDown size={12} className="mt-1" />
                  <span>دسته‌بندی کالاها</span>

                  <FaBars className="text-gray-500" />

                  {isMenuOpen && (
                    <div className="absolute top-[100%] right-0 w-full md:w-[750px] bg-white shadow-2xl rounded-b-lg border border-gray-100 p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 z-50 max-h-[70vh] overflow-y-auto">
                      {categories.map((cat, index) => (
                        <div 
                          key={index}
                          className="flex flex-col gap-2"
                          onClick={() => navigate('/allProducts')}
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
      {id && search && (
        <div className="container mx-auto px-4">
          <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out my-3">
            <img className="w-full h-48 object-contain p-4" src={search.image} alt={search.title} />
            <div className="px-6 py-4 border-t border-gray-100">
              <div className="font-bold text-lg mb-2 text-gray-800 line-clamp-2">
                {search.title}
              </div>
              <p className="text-red-600 font-bold">تومان {search.price?.toLocaleString()}</p>
              <button 
                onClick={() => {
                  navigate(`/product/${search._id}`);
                  setId('');
                  setSearch(null);
                }}
                className="mt-3 w-full bg-red-500 text-white rounded-lg py-2 hover:bg-red-600 transition-colors text-sm"
              >
                مشاهده محصول
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}