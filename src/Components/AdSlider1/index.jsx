import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function AdSlider1() {
  return (
    <div className="w-full mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4 mt-4">
      <div className="max-w-7xl mx-auto">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          interval={3000}
          stopOnHover={true}
          dynamicHeight={false}
          showArrows={true}
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-none rounded-full w-8 h-8 sm:w-10 sm:h-10 cursor-pointer z-10 text-sm sm:text-base flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <FaChevronRight className="text-xs sm:text-sm md:text-base" />
              </button>
            )
          }
          renderArrowPrev={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-none rounded-full w-8 h-8 sm:w-10 sm:h-10 cursor-pointer z-10 text-sm sm:text-base flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <FaChevronLeft className="text-xs sm:text-sm md:text-base" />
              </button>
            )
          }
          renderIndicator={(onClickHandler, isSelected, index, label) => {
            const baseStyle = {
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              margin: '0 4px',
              transition: 'all 0.3s ease',
              display: 'inline-block',
            };
            
            if (isSelected) {
              return (
                <li
                  key={index}
                  style={{
                    ...baseStyle,
                    background: 'white',
                    width: '20px',
                    borderRadius: '4px',
                  }}
                  aria-label={`${label} ${index + 1}`}
                  title={`${label} ${index + 1}`}
                  onClick={onClickHandler}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onClickHandler();
                    }
                  }}
                  role="button"
                  tabIndex={0}
                />
              );
            } else {
              return (
                <li
                  key={index}
                  style={{
                    ...baseStyle,
                    background: 'rgba(255,255,255,0.4)',
                  }}
                  aria-label={`${label} ${index + 1}`}
                  title={`${label} ${index + 1}`}
                  onClick={onClickHandler}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onClickHandler();
                    }
                  }}
                  role="button"
                  tabIndex={0}
                />
              );
            }
          }}
          renderThumbs={() => null}
        >
          <div>
            <img 
              src="/assets/ad1.jpg" 
              alt="Ad 1" 
              className="w-full h-auto object-cover rounded-lg shadow-md"
              loading="lazy"
            />
          </div>
          
          <div>
            <img 
              src="/assets/ad2.jpg" 
              alt="Ad 2" 
              className="w-full h-auto object-cover rounded-lg shadow-md"
              loading="lazy"
            />
          </div>

          <div>
            <img 
              src="/assets/ad4.jpg" 
              alt="Ad 3" 
              className="w-full h-auto object-cover rounded-lg shadow-md"
              loading="lazy"
            />
          </div>
          
          <div>
            <img 
              src="/assets/ad5.jpg" 
              alt="Ad 4" 
              className="w-full h-auto object-cover rounded-lg shadow-md"
              loading="lazy"
            />
          </div>
          
          <div>
            <img 
              src="/assets/ad6.jpg" 
              alt="Ad 5" 
              className="w-full h-auto object-cover rounded-lg shadow-md"
              loading="lazy"
            />
          </div>
          
          <div>
            <img 
              src="/assets/ad7.jpg" 
              alt="Ad 6" 
              className="w-full h-auto object-cover rounded-lg shadow-md"
              loading="lazy"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
}