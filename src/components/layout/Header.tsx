'use client';

import Image from 'next/image';
import Button from '../common/Button';

interface HeaderProps {
  onAddMealClick: () => void;
}

export default function Header({ onAddMealClick }: HeaderProps) {
  return (
    <header className="food-header bg-white shadow-[0px_5px_10px_0px_rgba(255,174,0,0.26),0px_20px_40px_0px_rgba(255,174,0,0.29)] sticky top-0 z-40">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-[220px] py-4 sm:py-5 md:py-6 flex items-center justify-between gap-4">
        <div className="food-logo flex items-center gap-2 sm:gap-3">
          <div className="w-[24px] h-[26px] sm:w-[28px] sm:h-[30px] relative flex-shrink-0">
            <Image
              src="/images/Mask Group.svg"
              alt="FoodWagen Logo"
              width={28}
              height={30}
              priority
            />
          </div>
          <h1 className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[31px] font-bold leading-tight tracking-tight">
            <span className="text-[#F17228]">Food</span>
            <span className="text-[#FFB30E]">Wagen</span>
          </h1>
        </div>

        <Button
          onClick={onAddMealClick}
          className="food-add-meal-btn text-[13px] sm:text-[14px] md:text-base lg:text-[18px] px-4 sm:px-5 md:px-6 lg:px-8 font-semibold whitespace-nowrap"
          data-testid="food-add-meal-btn"
        >
          <span className="hidden sm:inline">Add Menu</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>
    </header>
  );
}
