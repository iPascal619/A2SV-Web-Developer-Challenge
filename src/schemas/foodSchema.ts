import { z } from 'zod';

export const foodSchema = z.object({
  food_name: z
    .string()
    .min(2, 'Food name must be at least 2 characters')
    .max(100, 'Food name must be less than 100 characters')
    .trim(),
  
  food_image: z
    .string()
    .url('Please enter a valid image URL')
    .trim(),
  
  food_price: z
    .union([z.string(), z.number()])
    .transform((val) => typeof val === 'string' ? Number(val) : val)
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'Price must be a positive number',
    }),
  
  food_description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters')
    .trim()
    .optional(),
  
  restaurant_name: z
    .string()
    .min(2, 'Restaurant name must be at least 2 characters')
    .max(100, 'Restaurant name must be less than 100 characters')
    .trim(),
  
  restaurant_logo: z
    .string()
    .url('Please enter a valid logo URL')
    .trim(),
  
  food_rating: z
    .union([z.string(), z.number()])
    .transform((val) => typeof val === 'string' ? Number(val) : val)
    .refine((val) => !isNaN(val) && val >= 0 && val <= 5, {
      message: 'Rating must be between 0 and 5',
    }),
  
  restaurant_status: z
    .enum(['Open Now', 'Closed'])
    .default('Open Now'),
});

export type FoodFormData = z.infer<typeof foodSchema>;

// For partial updates
export const partialFoodSchema = foodSchema.partial();
