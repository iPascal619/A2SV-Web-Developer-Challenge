'use client';

import Button from '../common/Button';

interface HeaderProps {
  onAddMealClick: () => void;
}

export default function Header({ onAddMealClick }: HeaderProps) {
  return (
    <header className="food-header bg-white shadow-[0px_5px_10px_0px_rgba(255,174,0,0.26),0px_20px_40px_0px_rgba(255,174,0,0.29)] sticky top-0 z-40">
      <div className="max-w-[1920px] mx-auto px-8 md:px-[220px] py-4 flex items-center justify-between">
        <div className="food-logo flex items-center gap-3">
          <div className="w-7 h-7 relative flex items-center justify-center">
            <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 3.5117C14 1.5708 12.4292 0 10.4883 0C8.5474 0 6.9766 1.5708 6.9766 3.5117V16.9649C6.9766 18.9058 8.5474 20.4766 10.4883 20.4766C12.4292 20.4766 14 18.9058 14 16.9649V3.5117Z" fill="#F17228"/>
              <path d="M28 3.5117C28 1.5708 26.4292 0 24.4883 0C22.5474 0 20.9766 1.5708 20.9766 3.5117V16.9649C20.9766 18.9058 22.5474 20.4766 24.4883 20.4766C26.4292 20.4766 28 18.9058 28 16.9649V3.5117Z" fill="#F17228"/>
              <path d="M0 9.4883C0 7.5474 1.5708 5.9766 3.5117 5.9766H31C31 7.9175 29.4292 9.4883 27.4883 9.4883H3.5117C1.5708 9.4883 0 7.9175 0 9.4883Z" fill="#F17228"/>
            </svg>
          </div>
          <h1 className="text-[24px] md:text-[31px] font-bold leading-tight tracking-tight">
            <span className="text-[#F17228]">Food</span>
            <span className="text-[#FFB30E]">Wagen</span>
          </h1>
        </div>

        <Button
          onClick={onAddMealClick}
          className="food-add-meal-btn text-sm md:text-lg px-4 md:px-6"
          data-testid="food-add-meal-btn"
        >
          Add Meal
        </Button>
      </div>
    </header>
  );
}
