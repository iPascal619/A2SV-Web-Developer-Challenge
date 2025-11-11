import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFeaturedFoods, createFood, updateFood, deleteFood } from '@/services/foodService';
import { Food } from '@/types/food';
import { foodSchema, FoodFormData } from '@/schemas/foodSchema';

// Query keys for cache management
export const foodKeys = {
  all: ['foods'] as const,
  detail: (id: string) => ['foods', id] as const,
};

// Hook to fetch all foods
export function useFoods() {
  return useQuery({
    queryKey: foodKeys.all,
    queryFn: getFeaturedFoods,
    staleTime: 60 * 1000, // Data considered fresh for 1 minute
  });
}

// Hook to create a new food
export function useCreateFood() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FoodFormData) => {
      // Validate with Zod before sending
      const validatedData = foodSchema.parse(data);
      return createFood(validatedData);
    },
    onSuccess: () => {
      // Invalidate and refetch foods list
      queryClient.invalidateQueries({ queryKey: foodKeys.all });
    },
  });
}

// Hook to update an existing food
export function useUpdateFood() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FoodFormData }) => {
      // Validate with Zod before sending
      const validatedData = foodSchema.parse(data);
      return updateFood(id, validatedData);
    },
    onSuccess: () => {
      // Invalidate and refetch foods list
      queryClient.invalidateQueries({ queryKey: foodKeys.all });
    },
  });
}

// Hook to delete a food
export function useDeleteFood() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFood,
    onSuccess: () => {
      // Invalidate and refetch foods list
      queryClient.invalidateQueries({ queryKey: foodKeys.all });
    },
  });
}

// Optimistic update example (optional but shows advanced usage)
export function useOptimisticUpdateFood() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FoodFormData }) => {
      const validatedData = foodSchema.parse(data);
      return updateFood(id, validatedData);
    },
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: foodKeys.all });

      // Snapshot previous value
      const previousFoods = queryClient.getQueryData<Food[]>(foodKeys.all);

      // Optimistically update to the new value
      if (previousFoods) {
        queryClient.setQueryData<Food[]>(
          foodKeys.all,
          previousFoods.map((food) =>
            food.id === id ? { ...food, ...data } : food
          )
        );
      }

      return { previousFoods };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousFoods) {
        queryClient.setQueryData(foodKeys.all, context.previousFoods);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: foodKeys.all });
    },
  });
}
