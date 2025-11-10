'use client';

import Image from 'next/image';
import Button from '../common/Button';

interface HeaderProps {
  onAddMealClick: () => void;
}

export default function Header({ onAddMealClick }: HeaderProps) {
  return (
    <header className="food-header bg-white shadow-[0px_5px_10px_0px_rgba(255,174,0,0.26),0px_20px_40px_0px_rgba(255,174,0,0.29)] sticky top-0 z-40">
      <div className="max-w-[1920px] mx-auto px-8 md:px-[220px] py-6 flex items-center justify-between">
        <div className="food-logo flex items-center gap-3">
          <div className="w-[28px] h-[30px] relative">
            <Image
              src="/images/Mask Group.svg"
              alt="FoodWagen Logo"
              width={28}
              height={30}
              priority
            />
          </div>
          <h1 className="text-[24px] md:text-[31px] font-bold leading-tight tracking-tight">
            <span className="text-[#F17228]">Food</span>
            <span className="text-[#FFB30E]">Wagen</span>
          </h1>
        </div>

        <Button
          onClick={onAddMealClick}
          className="food-add-meal-btn text-base md:text-[18px] px-6 md:px-8 font-semibold"
          data-testid="food-add-meal-btn"
        >
          Add Menu
        </Button>
      </div>
    </header>
  );
}
