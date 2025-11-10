'use client';

import { useState, useEffect } from 'react';
import { Header, Hero, Footer } from '@/components/layout';
import { FoodCard, EmptyState } from '@/components/common';
import { Food } from '@/types/food';
import { getFeaturedFoods, searchFoods } from '@/services/foodService';

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

  return (
    <div className="min-h-screen bg-white">
      <Header onAddMealClick={() => setIsAddModalOpen(true)} />
      
      <Hero onSearch={handleSearch} />

      <main className="py-20">
        <div className="max-w-[1920px] mx-auto px-[222px]">
          <h2 className="text-[43px] font-bold text-[#212121] text-center mb-[88px]">
            Featured Meals
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#F17228]"></div>
            </div>
          ) : error ? (
            <EmptyState message={error} />
          ) : filteredFoods.length === 0 ? (
            <EmptyState message="Try adjusting your search" />
          ) : (
            <div className="food-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
            <div className="flex justify-center mt-[88px]">
              <button className="food-load-more-btn bg-[#F17228] text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-[0px_5px_10px_0px_rgba(255,174,0,0.26),0px_20px_40px_0px_rgba(255,174,0,0.29)] hover:bg-[#d65e1f] transition-colors">
                Load more →
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
