/**
 * Form validation utilities for FoodWagen
 */

import { FoodFormData, ValidationErrors } from '@/types/food';

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate food form data
 * Returns validation errors or null if valid
 */
export function validateFoodForm(data: Partial<FoodFormData>): ValidationErrors | null {
  const errors: ValidationErrors = {};

  // Validate food name
  if (!data.food_name || data.food_name.trim() === '') {
    errors['food-name-error'] = 'Food Name is required';
  }

  // Validate food rating
  if (data.food_rating === undefined || data.food_rating === null) {
    errors['food-rating-error'] = 'Food Rating must be a number';
  } else if (data.food_rating < 1 || data.food_rating > 5) {
    errors['food-rating-error'] = 'Food Rating must be between 1 and 5';
  }

  // Validate food image
  if (!data.food_image || data.food_image.trim() === '') {
    errors['food-image-error'] = 'Food Image URL is required';
  } else if (!isValidUrl(data.food_image)) {
    errors['food-image-error'] = 'Food Image URL is invalid';
  }

  // Validate restaurant name
  if (!data.restaurant_name || data.restaurant_name.trim() === '') {
    errors['restaurant-name-error'] = 'Restaurant Name is required';
  }

  // Validate restaurant logo
  if (!data.restaurant_logo || data.restaurant_logo.trim() === '') {
    errors['restaurant-logo-error'] = 'Restaurant Logo URL is required';
  } else if (!isValidUrl(data.restaurant_logo)) {
    errors['restaurant-logo-error'] = 'Restaurant Logo URL is invalid';
  }

  // Validate restaurant status
  if (
    !data.restaurant_status ||
    (data.restaurant_status !== 'Open Now' && data.restaurant_status !== 'Closed')
  ) {
    errors['restaurant-status-error'] = "Restaurant Status must be 'Open Now' or 'Closed'";
  }

  return Object.keys(errors).length > 0 ? errors : null;
}
