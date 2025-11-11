'use client';

import { useState, useCallback, memo } from 'react';
import Image from 'next/image';
import { FiTruck, FiShoppingBag, FiSearch } from 'react-icons/fi';

interface HeroProps {
  onSearch: (query: string) => void;
}

function Hero({ onSearch }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'delivery' | 'pickup'>('delivery');

  const handleSearch = useCallback(() => {
    onSearch(searchQuery);
  }, [onSearch, searchQuery]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  return (
    <section className="food-hero bg-[#FFB30E] pt-8 sm:pt-10 md:pt-8 lg:pt-32 pb-0 px-4 sm:px-6 md:px-8 lg:px-[110px] relative overflow-hidden min-h-[450px] sm:min-h-[500px] md:min-h-[480px] lg:min-h-[580px]">
      <div className="max-w-[1920px] mx-auto relative h-full">
        {/* Tablet & Desktop: Side-by-side layout */}
        <div className="hidden md:grid md:grid-cols-[1fr_0.6fr] lg:grid-cols-1 gap-8 items-center">
          {/* Left: Content + Search Card */}
          <div className="relative z-10 pb-6 lg:pb-18 lg:max-w-[680px]">
            <div className="food-hero-content mb-6 md:mb-7">
              <h1 className="text-white text-[46px] lg:text-[70px] font-bold leading-[1.1] mb-3.5 md:mb-4">
                Are you starving?
              </h1>
              <p className="text-white text-[17px] lg:text-[19px] leading-[1.3]">
                Within a few clicks, find meals that are accessible near you
              </p>
            </div>

            <div className="food-order-card bg-white rounded-xl lg:rounded-2xl shadow-[0px_5px_10px_0px_rgba(255,174,0,0.26),0px_20px_40px_0px_rgba(255,174,0,0.29)]">
              <div className="food-tabs flex gap-6 lg:gap-7 px-4 lg:px-5 pt-4 lg:pt-5 pb-3 lg:pb-4 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('delivery')}
                  className={`food-tab flex items-center gap-2 text-base lg:text-lg font-bold transition-colors ${
                    activeTab === 'delivery'
                      ? 'text-[#F17228]'
                      : 'text-[#757575]'
                  }`}
                >
                  <FiTruck size={20} className="lg:w-[22px] lg:h-[22px]" />
                  <span>Delivery</span>
                </button>
                <button
                  onClick={() => setActiveTab('pickup')}
                  className={`food-tab flex items-center gap-2 text-base lg:text-lg font-bold transition-colors ${
                    activeTab === 'pickup'
                      ? 'text-[#F17228]'
                      : 'text-[#757575]'
                  }`}
                >
                  <FiShoppingBag size={20} className="lg:w-[22px] lg:h-[22px]" />
                  <span>Pickup</span>
                </button>
              </div>

              <div className="food-search-section p-4 lg:p-5">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="food-search-input-wrapper flex-1 relative">
                    <div className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-[#9E9E9E]">
                      <FiSearch size={16} className="lg:w-[17px] lg:h-[17px]" />
                    </div>
                    <input
                      type="text"
                      name="food_search"
                      placeholder="What do you like to eat today?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="food-search-input w-full bg-[#F5F5F5] rounded-lg pl-10 lg:pl-12 pr-3 lg:pr-4 py-3 lg:py-[14px] text-[14px] lg:text-[15px] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F17228]"
                      data-testid="food-search-input"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="food-search-btn bg-[#F17228] hover:bg-[#D85D1E] text-white px-6 lg:px-7 py-3 lg:py-[14px] rounded-lg text-[14px] lg:text-[15px] font-bold whitespace-nowrap transition-colors flex items-center justify-center gap-2"
                  >
                    <FiSearch size={14} className="lg:w-[15px] lg:h-[15px]" />
                    <span>Find Meal</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Ramen Bowl (Tablet only) */}
          <div className="hidden md:flex lg:hidden justify-center items-end h-[480px]">
            <div className="relative w-full h-full max-w-[320px]">
              <Image
                src="/images/Image Base.png"
                alt="Delicious ramen bowl"
                fill
                className="object-contain object-bottom"
                sizes="320px"
                priority
              />
            </div>
          </div>
        </div>

        {/* Mobile: Original stacked layout */}
        <div className="md:hidden relative z-10 pb-8 sm:pb-10">
          <div className="food-hero-content mb-5 sm:mb-6">
            <h1 className="text-white text-[32px] sm:text-[38px] font-bold leading-[1.1] mb-3 sm:mb-3.5">
              Are you starving?
            </h1>
            <p className="text-white text-[14px] sm:text-[15px] leading-[1.3]">
              Within a few clicks, find meals that are accessible near you
            </p>
          </div>

          <div className="food-order-card bg-white rounded-xl sm:rounded-2xl shadow-[0px_5px_10px_0px_rgba(255,174,0,0.26),0px_20px_40px_0px_rgba(255,174,0,0.29)] relative z-20">
            <div className="food-tabs flex gap-4 sm:gap-5 px-4 sm:px-5 pt-4 sm:pt-5 pb-3 sm:pb-4 border-b border-gray-200">
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

          {/* Mobile Ramen Bowl - Below search card */}
          <div className="relative mt-8 -mb-[80px] w-full h-[220px] z-10">
            <div className="relative w-full h-full max-w-[280px] mx-auto">
              <Image
                src="/images/Image Base.png"
                alt="Delicious ramen bowl"
                fill
                className="object-contain object-bottom"
                sizes="280px"
                priority
              />
            </div>
          </div>
        </div>

        {/* Desktop Ramen Bowl - Original absolute position */}
        <div className="absolute -right-[50px] -bottom-[80px] w-[420px] h-[500px] hidden lg:block">
          <div className="relative w-full h-full" style={{ filter: 'drop-shadow(-20px 25px 35px rgba(0, 0, 0, 0.35))' }}>
            <Image
              src="/images/Image Base.png"
              alt="Delicious ramen bowl"
              fill
              className="object-contain object-bottom"
              sizes="420px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(Hero);

