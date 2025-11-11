'use client';

import { useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { Header, Hero, Footer } from '@/components/layout';
import { FoodCard, FoodCardSkeleton, EmptyState } from '@/components/common';
import { Food, FoodFormData } from '@/types/food';
import { useFoods, useCreateFood, useUpdateFood, useDeleteFood } from '@/hooks/useFoodQueries';
import { searchFoods } from '@/services/foodService';

// Lazy load modals for better performance
const AddEditFoodModal = dynamic(
  () => import('@/components/modals').then((mod) => ({ default: mod.AddEditFoodModal })),
  { ssr: false }
);

const DeleteFoodModal = dynamic(
  () => import('@/components/modals').then((mod) => ({ default: mod.DeleteFoodModal })),
  { ssr: false }
);

export default function Home() {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Food[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // React Query hooks for data fetching
  const { data: foods = [], isLoading, error } = useFoods();
  const createMutation = useCreateFood();
  const updateMutation = useUpdateFood();
  const deleteMutation = useDeleteFood();

  // Memoize filtered foods to prevent unnecessary recalculations
  const displayFoods = useMemo(() => {
    return searchResults ?? foods;
  }, [searchResults, foods]);

  // Memoized search handler with useCallback
  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    try {
      setIsSearching(true);
      const results = await searchFoods(query);
      setSearchResults(results);
    } catch (err) {
      console.error('Search failed:', err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Memoized handlers to prevent recreation on every render
  const handleEdit = useCallback((food: Food) => {
    setSelectedFood(food);
    setIsEditModalOpen(true);
  }, []);

  const handleDelete = useCallback((food: Food) => {
    setSelectedFood(food);
    setIsDeleteModalOpen(true);
  }, []);

  const handleSaveFood = useCallback(async (foodData: FoodFormData) => {
    try {
      if (selectedFood) {
        await updateMutation.mutateAsync({ id: selectedFood.id, data: foodData });
        toast.success('Meal updated successfully!');
      } else {
        await createMutation.mutateAsync(foodData);
        toast.success('Meal added successfully!');
      }
      // Clear search results to show updated data
      setSearchResults(null);
    } catch (err) {
      console.error('Error saving food:', err);
      toast.error('Failed to save meal. Please try again.');
      throw err;
    }
  }, [selectedFood, createMutation, updateMutation]);

  const handleConfirmDelete = useCallback(async () => {
    if (!selectedFood) return;
    
    try {
      await deleteMutation.mutateAsync(selectedFood.id);
      toast.success('Meal deleted successfully!');
      // Clear search results to show updated data
      setSearchResults(null);
    } catch (err) {
      console.error('Error deleting food:', err);
      toast.error('Failed to delete meal. Please try again.');
      throw err;
    }
  }, [selectedFood, deleteMutation]);

  const handleAddModalClose = useCallback(() => {
    setIsAddModalOpen(false);
    setSelectedFood(null);
  }, []);

  const handleEditModalClose = useCallback(() => {
    setIsEditModalOpen(false);
    setSelectedFood(null);
  }, []);

  const handleDeleteModalClose = useCallback(() => {
    setIsDeleteModalOpen(false);
    setSelectedFood(null);
  }, []);

  const handleAddMealClick = useCallback(() => {
    setIsAddModalOpen(true);
  }, []);

  const isDisplayLoading = isLoading || isSearching;
  const hasNoFoods = foods.length === 0;
  const hasNoResults = displayFoods.length === 0;

  return (
    <div className="min-h-screen bg-white">
      <Header onAddMealClick={handleAddMealClick} />
      
      <Hero onSearch={handleSearch} />

      <main className="py-12 sm:py-16 md:py-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
          <h2 className="text-[28px] sm:text-[32px] md:text-[38px] lg:text-[43px] font-bold text-[#212121] text-center mb-8 sm:mb-12 md:mb-16 lg:mb-[88px]">
            Featured Meals
          </h2>

          {isDisplayLoading ? (
            <div className="food-grid grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-3 xl:gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <FoodCardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <EmptyState message="Failed to load meals. Please try again." />
          ) : hasNoFoods ? (
            <EmptyState message="Add your first meal to get started" />
          ) : hasNoResults ? (
            <EmptyState message="No meals found. Try a different search" />
          ) : (
            <div className="food-grid grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-3 xl:gap-4">
              {displayFoods.map((food, index) => (
                <FoodCard
                  key={`${food.id}-${index}`}
                  food={food}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {!isDisplayLoading && displayFoods.length > 0 && (
            <div className="flex justify-center mt-8 sm:mt-12 md:mt-16 lg:mt-[88px]">
              <button className="food-load-more-btn bg-[#F17228] text-white px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-[0px_5px_10px_0px_rgba(255,174,0,0.26),0px_20px_40px_0px_rgba(255,174,0,0.29)] hover:bg-[#d65e1f] transition-colors">
                Load more →
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Lazy-loaded Modals */}
      {isAddModalOpen && (
        <AddEditFoodModal
          isOpen={isAddModalOpen}
          onClose={handleAddModalClose}
          onSave={handleSaveFood}
          food={null}
        />
      )}

      {isEditModalOpen && (
        <AddEditFoodModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          onSave={handleSaveFood}
          food={selectedFood}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteFoodModal
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteModalClose}
          onDelete={handleConfirmDelete}
          food={selectedFood}
        />
      )}
    </div>
  );
}
