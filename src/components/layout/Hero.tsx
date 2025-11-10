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
    <section className="food-hero bg-[#FFB30E] pt-10 md:pt-18 pb-0 px-8 md:px-[110px] relative overflow-hidden min-h-[580px]">
      <div className="max-w-[1920px] mx-auto relative h-full">
        <div className="max-w-[680px] relative z-10 pb-10 md:pb-18">
          <div className="food-hero-content mb-7">
            <h1 className="text-white text-[46px] md:text-[70px] font-bold leading-[1.1] mb-4">
              Are you starving?
            </h1>
            <p className="text-white text-[17px] md:text-[19px] leading-[1.3]">
              Within a few clicks, find meals that are accessible near you
            </p>
          </div>

          <div className="food-order-card bg-white rounded-2xl shadow-[0px_5px_10px_0px_rgba(255,174,0,0.26),0px_20px_40px_0px_rgba(255,174,0,0.29)]">
            <div className="food-tabs flex gap-7 px-5 pt-5 pb-4 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('delivery')}
                className={`food-tab flex items-center gap-2 text-lg font-bold transition-colors ${
                  activeTab === 'delivery'
                    ? 'text-[#F17228]'
                    : 'text-[#757575]'
                }`}
              >
                <FiTruck size={22} />
                <span>Delivery</span>
              </button>
              <button
                onClick={() => setActiveTab('pickup')}
                className={`food-tab flex items-center gap-2 text-lg font-bold transition-colors ${
                  activeTab === 'pickup'
                    ? 'text-[#F17228]'
                    : 'text-[#757575]'
                }`}
              >
                <FiShoppingBag size={22} />
                <span>Pickup</span>
              </button>
            </div>

            <div className="food-search-section p-5">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="food-search-input-wrapper flex-1 relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9E9E9E]">
                    <FiSearch size={17} />
                  </div>
                  <input
                    type="text"
                    name="food_search"
                    placeholder="What do you like to eat today?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="food-search-input w-full bg-[#F5F5F5] rounded-lg pl-12 pr-4 py-[14px] text-[15px] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F17228]"
                    data-testid="food-search-input"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="food-search-btn bg-[#F17228] hover:bg-[#D85D1E] text-white px-7 py-[14px] rounded-lg text-[15px] font-bold whitespace-nowrap transition-colors flex items-center justify-center gap-2"
                >
                  <FiSearch size={15} />
                  <span>Find Meal</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -right-[50px] -bottom-[136px] w-[410px] h-[490px] hidden lg:block">
          <div className="relative w-full h-full">
            <Image
              src="/images/Image Base.png"
              alt="Delicious ramen bowl"
              fill
              className="object-contain object-bottom"
              sizes="410px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

