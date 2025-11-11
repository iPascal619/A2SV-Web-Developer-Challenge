/**
 * API Service for FoodWagen
 */

import { Food, FoodFormData } from '@/types/food';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://6852821e0594059b23cdd834.mockapi.io';

// Input sanitization helper
const sanitizeString = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove < and > to prevent XSS
    .trim()
    .substring(0, 500); // Limit length
};

// Validate URL format
const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

// Type for MockAPI response structure
interface MockAPIFoodItem {
  id: string;
  name: string;
  rating: number | string;
  image?: string;
  Price?: string;
  restaurantName?: string;
  logo?: string;
  status?: string;
  restaurant?: {
    name?: string;
    logo?: string;
    status?: string;
  };
  createdAt?: string;
  [key: string]: unknown;
}

/**
 * Get all featured foods/restaurants
 */
export async function getFeaturedFoods(): Promise<Food[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/Food`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform API response to match our Food type
    return data.map((item: MockAPIFoodItem) => ({
      id: item.id,
      name: item.name,
      rating: typeof item.rating === 'string' ? parseFloat(item.rating) : item.rating,
      image: item.image || '',
      price: item.Price ? parseFloat(item.Price) : undefined,
      restaurant: {
        name: item.restaurantName || item.restaurant?.name || '',
        logo: item.logo || item.restaurant?.logo || '',
        status: item.status || item.restaurant?.status || 'Closed'
      },
      createdAt: item.createdAt
    }));
  } catch (error) {
    console.error('Error fetching featured foods:', error);
    throw error;
  }
}

/**
 * Search/Filter foods by name
 */
export async function searchFoods(searchParam: string): Promise<Food[]> {
  try {
    // MockAPI doesn't support query parameters, so fetch all and filter client-side
    const allFoods = await getFeaturedFoods();
    
    if (!searchParam || searchParam.trim() === '') {
      return allFoods;
    }
    
    const searchLower = searchParam.toLowerCase().trim();
    return allFoods.filter((food) => 
      food.name.toLowerCase().includes(searchLower) ||
      food.restaurant?.name.toLowerCase().includes(searchLower)
    );
  } catch (error) {
    console.error('Error searching foods:', error);
    throw error;
  }
}

/**
 * Create a new food item
 */
export async function createFood(foodData: FoodFormData): Promise<Food> {
  try {
    // Sanitize inputs
    const sanitizedName = sanitizeString(foodData.food_name);
    const sanitizedRestaurantName = sanitizeString(foodData.restaurant_name);
    const sanitizedImage = foodData.food_image && isValidUrl(foodData.food_image) ? foodData.food_image : '';
    const sanitizedLogo = foodData.restaurant_logo && isValidUrl(foodData.restaurant_logo) ? foodData.restaurant_logo : '';
    
    // Validate rating range
    const validRating = Math.min(5, Math.max(1, Number(foodData.food_rating)));

    const payload = {
      name: sanitizedName,
      rating: validRating,
      image: sanitizedImage,
      Price: '0.00', // MockAPI expects Price field
      restaurantName: sanitizedRestaurantName,
      logo: sanitizedLogo,
      status: foodData.restaurant_status,
    };

    const response = await fetch(`${API_BASE_URL}/Food`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const item = await response.json();
    
    // Transform response to match our Food type
    return {
      id: item.id,
      name: item.name,
      rating: typeof item.rating === 'string' ? parseFloat(item.rating) : item.rating,
      image: item.image || '',
      price: item.Price ? parseFloat(item.Price) : undefined,
      restaurant: {
        name: item.restaurantName || '',
        logo: item.logo || '',
        status: item.status || 'Closed'
      },
      createdAt: item.createdAt
    };
  } catch (error) {
    console.error('Error creating food:', error);
    throw error;
  }
}

/**
 * Update an existing food item
 */
export async function updateFood(id: string, foodData: FoodFormData): Promise<Food> {
  try {
    // Sanitize inputs
    const sanitizedName = sanitizeString(foodData.food_name);
    const sanitizedRestaurantName = sanitizeString(foodData.restaurant_name);
    const sanitizedImage = foodData.food_image && isValidUrl(foodData.food_image) ? foodData.food_image : '';
    const sanitizedLogo = foodData.restaurant_logo && isValidUrl(foodData.restaurant_logo) ? foodData.restaurant_logo : '';
    
    // Validate rating range
    const validRating = Math.min(5, Math.max(1, Number(foodData.food_rating)));

    const payload = {
      name: sanitizedName,
      rating: validRating,
      image: sanitizedImage,
      Price: '0.00', // MockAPI expects Price field
      restaurantName: sanitizedRestaurantName,
      logo: sanitizedLogo,
      status: foodData.restaurant_status,
    };

    const response = await fetch(`${API_BASE_URL}/Food/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const item = await response.json();
    
    // Transform response to match our Food type
    return {
      id: item.id,
      name: item.name,
      rating: typeof item.rating === 'string' ? parseFloat(item.rating) : item.rating,
      image: item.image || '',
      price: item.Price ? parseFloat(item.Price) : undefined,
      restaurant: {
        name: item.restaurantName || '',
        logo: item.logo || '',
        status: item.status || 'Closed'
      },
      createdAt: item.createdAt
    };
  } catch (error) {
    console.error('Error updating food:', error);
    throw error;
  }
}

/**
 * Delete a food item
 */
export async function deleteFood(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/Food/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting food:', error);
    throw error;
  }
}
