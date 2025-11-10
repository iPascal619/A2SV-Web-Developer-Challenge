'use client';

import { useState, useEffect } from 'react';
import { Food, FoodFormData } from '@/types/food';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';

interface AddEditFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (food: FoodFormData) => Promise<void>;
  food?: Food | null;
}

interface FormErrors {
  food_name?: string;
  food_rating?: string;
  food_image?: string;
  food_price?: string;
  restaurant_name?: string;
  restaurant_logo?: string;
  restaurant_status?: string;
}

export default function AddEditFoodModal({ isOpen, onClose, onSave, food }: AddEditFoodModalProps) {
  const [formData, setFormData] = useState({
    food_name: '',
    food_rating: '',
    food_image: '',
    food_price: '',
    restaurant_name: '',
    restaurant_logo: '',
    restaurant_status: 'Open Now'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && food) {
      setFormData({
        food_name: food.name || '',
        food_rating: food.rating?.toString() || '',
        food_image: food.image || '',
        food_price: food.price?.toString() || '',
        restaurant_name: food.restaurant?.name || '',
        restaurant_logo: food.restaurant?.logo || '',
        restaurant_status: food.restaurant?.status || 'Open Now'
      });
    } else if (isOpen && !food) {
      setFormData({
        food_name: '',
        food_rating: '',
        food_image: '',
        food_price: '',
        restaurant_name: '',
        restaurant_logo: '',
        restaurant_status: 'Open Now'
      });
    }
    setErrors({});
  }, [isOpen, food]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.food_name.trim()) {
      newErrors.food_name = 'Food Name is required';
    }

    if (!formData.food_rating.trim()) {
      newErrors.food_rating = 'Food Rating is required';
    } else {
      const rating = parseFloat(formData.food_rating);
      if (isNaN(rating)) {
        newErrors.food_rating = 'Food Rating must be a number';
      } else if (rating < 1 || rating > 5) {
        newErrors.food_rating = 'Food Rating must be between 1 and 5';
      }
    }

    if (!formData.food_image.trim()) {
      newErrors.food_image = 'Food Image URL is required';
    } else {
      try {
        new URL(formData.food_image);
      } catch {
        newErrors.food_image = 'Food Image URL must be a valid URL';
      }
    }

    if (!formData.food_price.trim()) {
      newErrors.food_price = 'Food Price is required';
    } else if (isNaN(parseFloat(formData.food_price))) {
      newErrors.food_price = 'Food Price must be a number';
    }

    if (!formData.restaurant_name.trim()) {
      newErrors.restaurant_name = 'Restaurant Name is required';
    }

    if (!formData.restaurant_logo.trim()) {
      newErrors.restaurant_logo = 'Restaurant Logo URL is required';
    } else {
      try {
        new URL(formData.restaurant_logo);
      } catch {
        newErrors.restaurant_logo = 'Restaurant Logo URL must be a valid URL';
      }
    }

    if (!['Open Now', 'Closed'].includes(formData.restaurant_status)) {
      newErrors.restaurant_status = "Restaurant Status must be 'Open Now' or 'Closed'";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const foodData = {
        food_name: formData.food_name,
        food_rating: parseFloat(formData.food_rating),
        food_image: formData.food_image,
        food_price: parseFloat(formData.food_price),
        restaurant_name: formData.restaurant_name,
        restaurant_logo: formData.restaurant_logo,
        restaurant_status: formData.restaurant_status as 'Open Now' | 'Closed'
      };

      await onSave(foodData);
      
      // Reset form
      setFormData({
        food_name: '',
        food_rating: '',
        food_image: '',
        food_price: '',
        restaurant_name: '',
        restaurant_logo: '',
        restaurant_status: 'Open Now'
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error saving food:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCancel = () => {
    setFormData({
      food_name: '',
      food_rating: '',
      food_image: '',
      food_price: '',
      restaurant_name: '',
      restaurant_logo: '',
      restaurant_status: 'Open Now'
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} className="w-full md:max-w-2xl">
      <div className="food-modal-content p-6 md:p-8">
        <h2 className="text-[#F17228] text-[24px] md:text-[28px] font-bold mb-6 text-center">
          {food ? 'Edit meal' : 'Add a meal'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="food_name" className="block text-[#424242] text-[16px] font-semibold mb-2">
              Food Name
            </label>
            <Input
              id="food_name"
              name="food_name"
              type="text"
              placeholder="Food name"
              value={formData.food_name}
              onChange={handleChange}
              className="w-full"
              aria-describedby={errors.food_name ? 'food-name-error' : undefined}
            />
            {errors.food_name && (
              <p id="food-name-error" className="text-[#FF3B30] text-[14px] mt-1">
                {errors.food_name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="food_rating" className="block text-[#424242] text-[16px] font-semibold mb-2">
              Food Rating (1-5)
            </label>
            <Input
              id="food_rating"
              name="food_rating"
              type="number"
              placeholder="Food rating (1-5)"
              value={formData.food_rating}
              onChange={handleChange}
              className="w-full"
              min="1"
              max="5"
              step="0.1"
              aria-describedby={errors.food_rating ? 'food-rating-error' : undefined}
            />
            {errors.food_rating && (
              <p id="food-rating-error" className="text-[#FF3B30] text-[14px] mt-1">
                {errors.food_rating}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="food_image" className="block text-[#424242] text-[16px] font-semibold mb-2">
              Food Image URL
            </label>
            <Input
              id="food_image"
              name="food_image"
              type="url"
              placeholder="Food image URL"
              value={formData.food_image}
              onChange={handleChange}
              className="w-full"
              aria-describedby={errors.food_image ? 'food-image-error' : undefined}
            />
            {errors.food_image && (
              <p id="food-image-error" className="text-[#FF3B30] text-[14px] mt-1">
                {errors.food_image}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="food_price" className="block text-[#424242] text-[16px] font-semibold mb-2">
              Food Price ($)
            </label>
            <Input
              id="food_price"
              name="food_price"
              type="number"
              placeholder="Food price"
              value={formData.food_price}
              onChange={handleChange}
              className="w-full"
              step="0.01"
              aria-describedby={errors.food_price ? 'food-price-error' : undefined}
            />
            {errors.food_price && (
              <p id="food-price-error" className="text-[#FF3B30] text-[14px] mt-1">
                {errors.food_price}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="restaurant_name" className="block text-[#424242] text-[16px] font-semibold mb-2">
              Restaurant Name
            </label>
            <Input
              id="restaurant_name"
              name="restaurant_name"
              type="text"
              placeholder="Restaurant name"
              value={formData.restaurant_name}
              onChange={handleChange}
              className="w-full"
              aria-describedby={errors.restaurant_name ? 'restaurant-name-error' : undefined}
            />
            {errors.restaurant_name && (
              <p id="restaurant-name-error" className="text-[#FF3B30] text-[14px] mt-1">
                {errors.restaurant_name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="restaurant_logo" className="block text-[#424242] text-[16px] font-semibold mb-2">
              Restaurant Logo URL
            </label>
            <Input
              id="restaurant_logo"
              name="restaurant_logo"
              type="url"
              placeholder="Restaurant logo URL"
              value={formData.restaurant_logo}
              onChange={handleChange}
              className="w-full"
              aria-describedby={errors.restaurant_logo ? 'restaurant-logo-error' : undefined}
            />
            {errors.restaurant_logo && (
              <p id="restaurant-logo-error" className="text-[#FF3B30] text-[14px] mt-1">
                {errors.restaurant_logo}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="restaurant_status" className="block text-[#424242] text-[16px] font-semibold mb-2">
              Restaurant Status
            </label>
            <select
              id="restaurant_status"
              name="restaurant_status"
              value={formData.restaurant_status}
              onChange={handleChange}
              className="food-select w-full bg-[#F5F5F5] rounded-lg px-4 py-3 text-[16px] text-[#424242] focus:outline-none focus:ring-2 focus:ring-[#F17228] border-none"
              aria-describedby={errors.restaurant_status ? 'restaurant-status-error' : undefined}
            >
              <option value="Open Now">Open Now</option>
              <option value="Closed">Closed</option>
            </select>
            {errors.restaurant_status && (
              <p id="restaurant-status-error" className="text-[#FF3B30] text-[14px] mt-1">
                {errors.restaurant_status}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#FF9A0E] to-[#FF9A0E] text-white px-6 py-3 rounded-lg font-bold text-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? (food ? 'Saving...' : 'Adding...') : (food ? 'Save' : 'Add')}
            </button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
