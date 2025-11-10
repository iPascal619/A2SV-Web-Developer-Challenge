'use client';

import { useState, useEffect } from 'react';
import { Header, Hero, Footer } from '@/components/layout';
import { FoodCard, EmptyState } from '@/components/common';
import { AddEditFoodModal, DeleteFoodModal } from '@/components/modals';
import { Food, FoodFormData } from '@/types/food';
import { getFeaturedFoods, searchFoods, createFood, updateFood, deleteFood } from '@/services/foodService';

export default function Home() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getFeaturedFoods();
      setFoods(data);
      setFilteredFoods(data);
    } catch (err) {
      setError('Failed to load foods. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setFilteredFoods(foods);
      return;
    }

    try {
      setIsLoading(true);
      const results = await searchFoods(query);
      setFilteredFoods(results);
    } catch (err) {
      console.error('Search failed:', err);
      setFilteredFoods([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (food: Food) => {
    setSelectedFood(food);
    setIsEditModalOpen(true);
  };

  const handleDelete = (food: Food) => {
    setSelectedFood(food);
    setIsDeleteModalOpen(true);
  };

  const handleSaveFood = async (foodData: FoodFormData) => {
    try {
      if (selectedFood) {
        // Update existing food
        await updateFood(selectedFood.id, foodData);
      } else {
        // Create new food
        await createFood(foodData);
      }
      await loadFoods();
    } catch (err) {
      console.error('Error saving food:', err);
      throw err;
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedFood) return;
    
    try {
      await deleteFood(selectedFood.id);
      await loadFoods();
    } catch (err) {
      console.error('Error deleting food:', err);
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onAddMealClick={() => setIsAddModalOpen(true)} />
      
      <Hero onSearch={handleSearch} />

      <main className="py-12 sm:py-16 md:py-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
          <h2 className="text-[28px] sm:text-[32px] md:text-[38px] lg:text-[43px] font-bold text-[#212121] text-center mb-8 sm:mb-12 md:mb-16 lg:mb-[88px]">
            Featured Meals
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center py-12 sm:py-16 md:py-20">
              <div className="animate-spin rounded-full h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 border-t-4 border-[#F17228]"></div>
            </div>
          ) : error ? (
            <EmptyState message={error} />
          ) : foods.length === 0 ? (
            <EmptyState message="Add your first meal to get started" />
          ) : filteredFoods.length === 0 ? (
            <EmptyState message="No meals found. Try a different search" />
          ) : (
            <div className="food-grid grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10">
              {filteredFoods.map((food, index) => (
                <FoodCard
                  key={`${food.id}-${index}`}
                  food={food}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {!isLoading && filteredFoods.length > 0 && (
            <div className="flex justify-center mt-8 sm:mt-12 md:mt-16 lg:mt-[88px]">
              <button className="food-load-more-btn bg-[#F17228] text-white px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-[0px_5px_10px_0px_rgba(255,174,0,0.26),0px_20px_40px_0px_rgba(255,174,0,0.29)] hover:bg-[#d65e1f] transition-colors">
                Load more →
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Modals */}
      <AddEditFoodModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedFood(null);
        }}
        onSave={handleSaveFood}
        food={null}
      />

      <AddEditFoodModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedFood(null);
        }}
        onSave={handleSaveFood}
        food={selectedFood}
      />

      <DeleteFoodModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedFood(null);
        }}
        onDelete={handleConfirmDelete}
        food={selectedFood}
      />
    </div>
  );
}
