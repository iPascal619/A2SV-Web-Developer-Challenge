'use client';

import Image from 'next/image';
import { FiTag, FiStar } from 'react-icons/fi';
import { Food } from '@/types/food';
import Badge from './Badge';
import Dropdown from './Dropdown';

interface FoodCardProps {
  food: Food;
  onEdit: (food: Food) => void;
  onDelete: (food: Food) => void;
}

export default function FoodCard({ food, onEdit, onDelete }: FoodCardProps) {
  if (!food.restaurant) {
    return null;
  }

  const statusText = food.restaurant.status === 'Open Now' ? 'Open' : 'Closed';
  const statusVariant = food.restaurant.status === 'Open Now' ? 'open' : 'closed';

  return (
    <div 
      className="food-card bg-white rounded-[12px] sm:rounded-[16px] lg:rounded-[20px] overflow-hidden animate-slideUp"
      data-testid="food-card"
    >
      <div className="food-photo relative h-[200px] sm:h-[220px] md:h-[250px] lg:h-[301px] w-full bg-gray-100">
        {food.image && (
          <Image
            src={food.image}
            alt={food.name}
            fill
            className="food-image object-cover"
            sizes="(max-width: 500px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 357px"
          />
        )}
        {food.price && (
          <div className="absolute top-4 sm:top-5 lg:top-6 left-4 sm:left-5 lg:left-6">
            <Badge variant="price">
              <FiTag size={14} className="sm:w-[16px] sm:h-[16px] lg:w-[18px] lg:h-[18px]" />
              <span className="text-[14px] sm:text-[16px] lg:text-[18px]">${Number(food.price).toFixed(2)}</span>
            </Badge>
          </div>
        )}
      </div>

      <div className="food-details pt-4 sm:pt-5 lg:pt-7 px-3 sm:px-4 lg:px-3 pb-0 flex flex-col">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-[22px] flex-1 min-w-0">
            <div className="restaurant-logo relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
              {food.restaurant.logo && (
                <Image
                  src={food.restaurant.logo}
                  alt={food.restaurant.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, (max-width: 1024px) 56px, 64px"
                />
              )}
            </div>

            <div className="food-info flex-1 min-w-0">
              <h3 className="food-name text-[#424242] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-bold leading-[1.2] truncate mb-1 sm:mb-1.5 lg:mb-[4px]">
                {food.name}
              </h3>
              <div className="food-rating flex items-center gap-1.5 sm:gap-2 lg:gap-[8px]">
                <FiStar className="text-[#FFB30E] fill-[#FFB30E] w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] lg:w-[25px] lg:h-[23px]" />
                <span className="food-rating-value text-[#FFB30E] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-semibold leading-[1.2]">
                  {Number(food.rating).toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <Dropdown
            onEdit={() => onEdit(food)}
            onDelete={() => onDelete(food)}
          />
        </div>

        <div className="restaurant-status mt-4 sm:mt-5 lg:mt-[28px] mb-2 sm:mb-2.5 lg:mb-3">
          <Badge variant={statusVariant}>
            {statusText}
          </Badge>
        </div>
      </div>
    </div>
  );
}
