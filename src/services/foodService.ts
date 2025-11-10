/**
 * API Service for FoodWagen
 * Base URL: https://6852821e0594059b23cdd834.mockapi.io
 */

import { Food, FoodFormData, ApiResponse } from '@/types/food';

const API_BASE_URL = 'https://6852821e0594059b23cdd834.mockapi.io';

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
    return data;
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
    const response = await fetch(`${API_BASE_URL}/Food?name=${encodeURIComponent(searchParam)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
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
    const payload = {
      name: foodData.food_name,
      rating: foodData.food_rating,
      image: foodData.food_image,
      restaurant: {
        name: foodData.restaurant_name,
        logo: foodData.restaurant_logo,
        status: foodData.restaurant_status,
      },
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

    const data = await response.json();
    return data;
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
    const payload = {
      name: foodData.food_name,
      rating: foodData.food_rating,
      image: foodData.food_image,
      restaurant: {
        name: foodData.restaurant_name,
        logo: foodData.restaurant_logo,
        status: foodData.restaurant_status,
      },
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

    const data = await response.json();
    return data;
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
