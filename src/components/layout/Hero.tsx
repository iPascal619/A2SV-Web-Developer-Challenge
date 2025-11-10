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
    <section className="food-hero bg-[#FFB30E] py-16 md:py-24 px-8 md:px-[220px] relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-[856px_1fr] gap-8 items-center">
        <div className="relative z-10">
          <div className="food-hero-content mb-10">
            <h1 className="text-white text-[56px] md:text-[88px] font-bold leading-[1] mb-6">
              Are you starving?
            </h1>
            <p className="text-white text-[20px] md:text-[22px] leading-[1.2]">
              Within a few clicks, find meals that are accessible near you
            </p>
          </div>

          <div className="food-order-card bg-white rounded-2xl shadow-[0px_5px_10px_0px_rgba(255,174,0,0.26),0px_20px_40px_0px_rgba(255,174,0,0.29)]">
            <div className="food-tabs flex gap-8 px-6 pt-6 pb-5 border-b border-gray-200">
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

            <div className="food-search-section p-6">
              <div className="flex gap-4">
                <div className="food-search-input-wrapper flex-1 relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9E9E9E]">
                    <FiSearch size={18} />
                  </div>
                  <input
                    type="text"
                    name="food_search"
                    placeholder="What do you like to eat today?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="food-search-input w-full bg-[#F5F5F5] rounded-lg pl-12 pr-4 py-[17px] text-[17px] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F17228]"
                    data-testid="food-search-input"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="food-search-btn bg-[#F17228] hover:bg-[#D85D1E] text-white px-12 py-[17px] rounded-lg text-[17px] font-bold whitespace-nowrap transition-colors flex items-center gap-2"
                >
                  <FiSearch size={16} />
                  <span>Find Meal</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full h-[400px] lg:h-[505px] hidden lg:flex items-center justify-end -mr-[220px]">
          <div className="relative w-[604px] h-[505px]">
            <Image
              src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=800&fit=crop"
              alt="Delicious ramen bowl"
              fill
              className="object-cover rounded-full"
              sizes="604px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

