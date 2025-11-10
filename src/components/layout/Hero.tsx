'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiTruck, FiShoppingBag, FiSearch } from 'react-icons/fi';

interface HeroProps {
  onSearch: (query: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'delivery' | 'pickup'>('delivery');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="food-hero bg-[#FFB30E] pt-8 sm:pt-10 md:pt-12 lg:pt-18 pb-0 px-4 sm:px-6 md:px-8 lg:px-[110px] relative overflow-hidden min-h-[450px] sm:min-h-[500px] md:min-h-[550px] lg:min-h-[580px]">
      <div className="max-w-[1920px] mx-auto relative h-full">
        <div className="max-w-full sm:max-w-[600px] md:max-w-[650px] lg:max-w-[680px] relative z-10 pb-8 sm:pb-10 md:pb-12 lg:pb-18">
          <div className="food-hero-content mb-5 sm:mb-6 md:mb-7">
            <h1 className="text-white text-[32px] sm:text-[38px] md:text-[46px] lg:text-[70px] font-bold leading-[1.1] mb-3 sm:mb-3.5 md:mb-4">
              Are you starving?
            </h1>
            <p className="text-white text-[14px] sm:text-[15px] md:text-[17px] lg:text-[19px] leading-[1.3]">
              Within a few clicks, find meals that are accessible near you
            </p>
          </div>

          <div className="food-order-card bg-white rounded-xl sm:rounded-2xl shadow-[0px_5px_10px_0px_rgba(255,174,0,0.26),0px_20px_40px_0px_rgba(255,174,0,0.29)]">
            <div className="food-tabs flex gap-4 sm:gap-5 md:gap-6 lg:gap-7 px-4 sm:px-5 pt-4 sm:pt-5 pb-3 sm:pb-4 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('delivery')}
                className={`food-tab flex items-center gap-2 text-base sm:text-lg font-bold transition-colors ${
                  activeTab === 'delivery'
                    ? 'text-[#F17228]'
                    : 'text-[#757575]'
                }`}
              >
                <FiTruck size={20} className="sm:w-[22px] sm:h-[22px]" />
                <span>Delivery</span>
              </button>
              <button
                onClick={() => setActiveTab('pickup')}
                className={`food-tab flex items-center gap-2 text-base sm:text-lg font-bold transition-colors ${
                  activeTab === 'pickup'
                    ? 'text-[#F17228]'
                    : 'text-[#757575]'
                }`}
              >
                <FiShoppingBag size={20} className="sm:w-[22px] sm:h-[22px]" />
                <span>Pickup</span>
              </button>
            </div>

            <div className="food-search-section p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="food-search-input-wrapper flex-1 relative">
                  <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#9E9E9E]">
                    <FiSearch size={16} className="sm:w-[17px] sm:h-[17px]" />
                  </div>
                  <input
                    type="text"
                    name="food_search"
                    placeholder="What do you like to eat today?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="food-search-input w-full bg-[#F5F5F5] rounded-lg pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-[14px] text-[14px] sm:text-[15px] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F17228]"
                    data-testid="food-search-input"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="food-search-btn bg-[#F17228] hover:bg-[#D85D1E] text-white px-6 sm:px-7 py-3 sm:py-[14px] rounded-lg text-[14px] sm:text-[15px] font-bold whitespace-nowrap transition-colors flex items-center justify-center gap-2"
                >
                  <FiSearch size={14} className="sm:w-[15px] sm:h-[15px]" />
                  <span>Find Meal</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -right-[20px] -bottom-[80px] w-[250px] h-[300px] hidden sm:block md:-right-[30px] md:-bottom-[100px] md:w-[300px] md:h-[360px] lg:-right-[50px] lg:-bottom-[136px] lg:w-[410px] lg:h-[490px]">
          <div className="relative w-full h-full">
            <Image
              src="/images/Image Base.png"
              alt="Delicious ramen bowl"
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 640px) 250px, (max-width: 1024px) 300px, 410px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

