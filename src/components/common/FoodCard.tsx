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
      className="food-card bg-white rounded-2xl overflow-hidden shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] hover:shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] transition-shadow duration-300 animate-slideUp"
      data-testid="food-card"
    >
      <div className="food-photo relative h-[250px] md:h-[301px] w-full">
        <Image
          src={food.image}
          alt={food.name}
          fill
          className="food-image object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 357px"
        />
        {food.price && (
          <div className="absolute top-4 md:top-6 left-4 md:left-6">
            <Badge variant="price">
              <FiTag size={18} />
              <span>${Number(food.price).toFixed(2)}</span>
            </Badge>
          </div>
        )}
      </div>

      <div className="food-details p-4 md:p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4 md:gap-6 flex-1">
            <div className="restaurant-logo relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
              <Image
                src={food.restaurant.logo}
                alt={food.restaurant.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>

            <div className="food-info flex-1 min-w-0">
              <h3 className="food-name text-[#424242] text-[18px] md:text-[22px] font-bold leading-[1.2] truncate mb-1">
                {food.name}
              </h3>
              <div className="food-rating flex items-center gap-2">
                <FiStar className="text-[#FFB30E] fill-[#FFB30E]" size={20} />
                <span className="food-rating-value text-[#FFB30E] text-[18px] md:text-[22px] font-semibold leading-[1]">
                  {food.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <Dropdown
            onEdit={() => onEdit(food)}
            onDelete={() => onDelete(food)}
          />
        </div>

        <div className="restaurant-status">
          <Badge variant={statusVariant}>
            {statusText}
          </Badge>
        </div>
      </div>
    </div>
  );
}
