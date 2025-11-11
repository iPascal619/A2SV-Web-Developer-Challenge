export default function FoodCardSkeleton() {
  return (
    <div className="food-card bg-white rounded-[12px] sm:rounded-[16px] lg:rounded-[20px] overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="food-photo relative h-[200px] sm:h-[220px] md:h-[250px] lg:h-[301px] w-full bg-gray-200 rounded-t-[12px] sm:rounded-t-[16px] lg:rounded-t-[20px]" />
      
      {/* Content skeleton */}
      <div className="food-details pt-4 sm:pt-5 lg:pt-7 px-3 sm:px-4 lg:px-3 pb-4 flex flex-col gap-3">
        {/* Price badge skeleton */}
        <div className="self-start">
          <div className="h-8 w-20 bg-gray-200 rounded-lg" />
        </div>
        
        {/* Restaurant info skeleton */}
        <div className="flex items-start gap-2">
          {/* Restaurant logo skeleton */}
          <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full" />
          
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            {/* Restaurant name skeleton */}
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            
            {/* Status badge skeleton */}
            <div className="h-6 w-24 bg-gray-200 rounded-lg" />
          </div>
        </div>
        
        {/* Food info skeleton */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-2">
            {/* Food name skeleton */}
            <div className="h-5 bg-gray-200 rounded w-full" />
            
            {/* Rating skeleton */}
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-200 rounded" />
              <div className="h-4 w-12 bg-gray-200 rounded" />
            </div>
          </div>
          
          {/* Dropdown button skeleton */}
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}
