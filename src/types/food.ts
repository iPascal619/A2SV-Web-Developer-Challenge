/**
 * Type definitions for FoodWagen application
 */

export interface Restaurant {
  name: string;
  logo: string;
  status: 'Open Now' | 'Closed';
}

export interface Food {
  id: string;
  name: string;
  rating: number;
  image: string;
  price?: number;
  discount?: number;
  restaurant: Restaurant;
  createdAt?: string;
}

export interface FoodFormData {
  food_name: string;
  food_rating: number;
  food_image: string;
  food_price: number;
  restaurant_name: string;
  restaurant_logo: string;
  restaurant_status: 'Open Now' | 'Closed';
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface ValidationErrors {
  'food-name-error'?: string;
  'food-rating-error'?: string;
  'food-image-error'?: string;
  'restaurant-name-error'?: string;
  'restaurant-logo-error'?: string;
  'restaurant-status-error'?: string;
}
