import { getFeaturedFoods, createFood, updateFood, deleteFood } from '@/services/foodService';
import { FoodFormData } from '@/types/food';

// Mock the global fetch function
global.fetch = jest.fn();

describe('Food Service API - Mock Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getFeaturedFoods', () => {
    it('should fetch and transform food data successfully', async () => {
      const mockAPIResponse = [
        {
          id: '1',
          name: 'Beef Burger',
          rating: '4.5',
          image: 'https://example.com/burger.jpg',
          Price: '8.99',
          restaurantName: 'Burger Palace',
          logo: 'https://example.com/logo.jpg',
          status: 'Open Now',
          createdAt: '2025-11-10T00:00:00.000Z',
        },
        {
          id: '2',
          name: 'Caesar Salad',
          rating: 4.2,
          image: 'https://example.com/salad.jpg',
          Price: '7.50',
          restaurantName: 'Fresh & Green',
          logo: 'https://example.com/logo2.jpg',
          status: 'Closed',
          createdAt: '2025-11-10T00:00:00.000Z',
        },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockAPIResponse,
      });

      const result = await getFeaturedFoods();

      expect(global.fetch).toHaveBeenCalledWith(
        'https://6852821e0594059b23cdd834.mockapi.io/Food',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: '1',
        name: 'Beef Burger',
        rating: 4.5,
        image: 'https://example.com/burger.jpg',
        price: 8.99,
        restaurant: {
          name: 'Burger Palace',
          logo: 'https://example.com/logo.jpg',
          status: 'Open Now',
        },
        createdAt: '2025-11-10T00:00:00.000Z',
      });
    });

    it('should handle fetch errors gracefully', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(getFeaturedFoods()).rejects.toThrow('Network error');
    });

    it('should handle HTTP error responses', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(getFeaturedFoods()).rejects.toThrow('HTTP error! status: 404');
    });
  });

  describe('createFood', () => {
    it('should create a new food item successfully', async () => {
      const newFoodData: FoodFormData = {
        food_name: 'Pepperoni Pizza',
        food_rating: 4.7,
        food_image: 'https://example.com/pizza.jpg',
        food_price: 12.99,
        restaurant_name: 'Pizza House',
        restaurant_logo: 'https://example.com/pizza-logo.jpg',
        restaurant_status: 'Open Now',
      };

      const mockAPIResponse = {
        id: '3',
        name: 'Pepperoni Pizza',
        rating: 4.7,
        image: 'https://example.com/pizza.jpg',
        Price: '12.99',
        restaurantName: 'Pizza House',
        logo: 'https://example.com/pizza-logo.jpg',
        status: 'Open Now',
        createdAt: '2025-11-10T00:00:00.000Z',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockAPIResponse,
      });

      const result = await createFood(newFoodData);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://6852821e0594059b23cdd834.mockapi.io/Food',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'Pepperoni Pizza',
            rating: 4.7,
            image: 'https://example.com/pizza.jpg',
            Price: '12.99',
            restaurantName: 'Pizza House',
            logo: 'https://example.com/pizza-logo.jpg',
            status: 'Open Now',
          }),
        })
      );

      expect(result).toEqual({
        id: '3',
        name: 'Pepperoni Pizza',
        rating: 4.7,
        image: 'https://example.com/pizza.jpg',
        price: 12.99,
        restaurant: {
          name: 'Pizza House',
          logo: 'https://example.com/pizza-logo.jpg',
          status: 'Open Now',
        },
        createdAt: '2025-11-10T00:00:00.000Z',
      });
    });
  });

  describe('updateFood', () => {
    it('should update an existing food item successfully', async () => {
      const foodId = '1';
      const updatedFoodData: FoodFormData = {
        food_name: 'Updated Burger',
        food_rating: 4.9,
        food_image: 'https://example.com/updated-burger.jpg',
        food_price: 9.99,
        restaurant_name: 'Updated Palace',
        restaurant_logo: 'https://example.com/updated-logo.jpg',
        restaurant_status: 'Closed',
      };

      const mockAPIResponse = {
        id: '1',
        name: 'Updated Burger',
        rating: 4.9,
        image: 'https://example.com/updated-burger.jpg',
        Price: '9.99',
        restaurantName: 'Updated Palace',
        logo: 'https://example.com/updated-logo.jpg',
        status: 'Closed',
        createdAt: '2025-11-10T00:00:00.000Z',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockAPIResponse,
      });

      const result = await updateFood(foodId, updatedFoodData);

      expect(global.fetch).toHaveBeenCalledWith(
        `https://6852821e0594059b23cdd834.mockapi.io/Food/${foodId}`,
        expect.objectContaining({
          method: 'PUT',
        })
      );

      expect(result.name).toBe('Updated Burger');
      expect(result.restaurant.status).toBe('Closed');
    });
  });

  describe('deleteFood', () => {
    it('should delete a food item successfully', async () => {
      const foodId = '1';

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: foodId }),
      });

      await deleteFood(foodId);

      expect(global.fetch).toHaveBeenCalledWith(
        `https://6852821e0594059b23cdd834.mockapi.io/Food/${foodId}`,
        expect.objectContaining({
          method: 'DELETE',
        })
      );
    });

    it('should handle delete errors', async () => {
      const foodId = '1';

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(deleteFood(foodId)).rejects.toThrow('HTTP error! status: 404');
    });
  });
});
