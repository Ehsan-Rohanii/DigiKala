import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // فرض بر این است که react-router-dom نصب است
import notify from '../../../Utils/Notify';

export default function Auth() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate(); // استفاده از هوک برای ریدایرکت

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // اعتبارسنجی شماره
    if (!phoneNumber.trim()) {
      notify("error", "لطفا شماره همراه خود را وارد کنید");
      return;
    }

    // شبیه‌سازی بررسی شماره (در پروژه واقعی اینجا به API درخواست می‌فرستی)
    if (phoneNumber === '09353926941') {
      // ریدایرکت موفق
      navigate('/home');
    } else {
      notify('error', "ورود ناموفق. شماره صحیح نیست.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        
        {/* هدر */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">ورود یا ثبت‌نام</h2>
          <p className="text-gray-500 text-sm">
            لطفا شماره موبایل خود را وارد کنید
          </p>
        </div>

        {/* فرم */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* اینپوت شماره */}
          <div className="relative">
            <input
              type="tel"
              placeholder="شماره موبایل"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 text-left"
              dir="ltr" // چون شماره انگلیسی تایپ می‌شود
            />
            
          </div>

          {/* دکمه ورود */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            ورود به دیجی‌کالا
          </button>
        </form>

        {/* فوتر و قوانین */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 leading-relaxed">
            ورود شما به معنای پذیرش{' '}
            <span className="hover:underline cursor-pointer">شرایط دیجی‌کالا</span>{' '}
            و{' '}
            <span className="hover:underline cursor-pointer">قوانین حریم خصوصی</span>{' '}
            است.
          </p>
        </div>
        <p className='text-center mt-4 text-gray-400'>09353926941</p>
      </div>
    </div>
  );
}

