import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import notify from "../../../Utils/Notify";

export default function Auth() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      notify("error", "لطفا شماره همراه خود را وارد کنید");
      return;
    }

    if (phoneNumber === "09353926941") {
      navigate("/home");
      localStorage.setItem("isLoggedIn", "true");
    } else {
      notify("error", "ورود ناموفق. شماره صحیح نیست.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        {/* هدر */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ورود یا ثبت‌نام
          </h2>
          <p className="text-gray-500 text-sm">
            لطفا شماره موبایل خود را وارد کنید
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="tel"
              placeholder="شماره موبایل"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 text-left"
              dir="ltr"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            ورود به دیجی‌کالا
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 leading-relaxed">
            ورود شما به معنای پذیرش{" "}
            <span className="hover:underline cursor-pointer">
              شرایط دیجی‌کالا
            </span>{" "}
            و{" "}
            <span className="hover:underline cursor-pointer">
              قوانین حریم خصوصی
            </span>{" "}
            است.
          </p>
        </div>
        <p className="text-center mt-4 text-gray-400">09353926941</p>
      </div>
    </div>
  );
}
