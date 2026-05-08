import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // ✅ استایل‌های پیش‌فرض

export default function Slider1() {
  return (
    <div style={{ width: '100%', marginBottom: '2rem' }}>
      <Carousel
        autoPlay={true}       // ✅ پخش خودکار
        infiniteLoop={true}   // ✅ لوپ بی‌نهایت
        showThumbs={false}    // ✅ حذف تصاویر کوچک پایین
        showStatus={false}    // ✅ حذف متن وضعیت (مثلا 1/2)
        interval={3000}       // ✅ زمان تغییر اسلاید (3 ثانیه)
        stopOnHover={false}   // ✅ با بردن موس روی اسلایدر، پخش متوقف نشه
        dynamicHeight={false} // ✅ ارتفاع ثابت
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                zIndex: 10,
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FaChevronRight/>
            </button>
          )
        }
        renderArrowPrev={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                zIndex: 10,
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FaChevronLeft/>
            </button>
          )
        }
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          if (isSelected) {
            return (
              <li
                key={index}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  margin: '0 5px'
                }}
                aria-label={`${label} ${index + 1}`}
                title={`${label} ${index + 1}`}
              />
            );
          } else {
            return (
              <li
                key={index}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.5)',
                  border: 'none',
                  cursor: 'pointer',
                  margin: '0 5px'
                }}
                aria-label={`${label} ${index + 1}`}
                title={`${label} ${index + 1}`}
              />
            );
          }
        }}
      >
        <div>
          <img 
            src="/assets/ad1.jpg" 
            alt="Ad 1" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />
        </div>
        
        
        <div>
          <img 
            src="/assets/ad2.jpg" 
            alt="Ad 2" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />
        </div>


        <div>
            <img 
            src="/assets/ad4.jpg" 
            alt="Ad3" 
            style={{ width: '100%', height: 'auto', display: 'block' }}
            />
        </div>
        <div>
            <img 
            src="/assets/ad5.jpg" 
            alt="Ad3" 
            style={{ width: '100%', height: 'auto', display: 'block' }}
            />
        </div>
        <div>
            <img 
            src="/assets/ad6.jpg" 
            alt="Ad3" 
            style={{ width: '100%', height: 'auto', display: 'block' }}
            />
        </div>
        <div>
            <img 
            src="/assets/ad7.jpg" 
            alt="Ad3" 
            style={{ width: '100%', height: 'auto', display: 'block' }}
            />
        </div>
      </Carousel>
    </div>
  );
}


