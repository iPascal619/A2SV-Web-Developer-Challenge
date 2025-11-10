'use client';

import { useState } from 'react';
import { Food } from '@/types/food';
import Modal from '../common/Modal';
import Button from '../common/Button';

interface DeleteFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
  food: Food | null;
}

export default function DeleteFoodModal({ isOpen, onClose, onDelete, food }: DeleteFoodModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onDelete();
      onClose();
    } catch (error) {
      console.error('Error deleting food:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!food) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full md:max-w-md">
      <div className="food-modal-content p-6 md:p-8">
        <h2 className="text-[#FF9A0E] text-[24px] md:text-[28px] font-bold mb-4 text-center">
          Delete meal
        </h2>
        
        <p className="text-[#757575] text-[16px] mb-6">
          Are you sure you want to delete <span className="font-semibold text-[#424242]">{food.name}</span>? This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex-1 bg-gradient-to-r from-[#FF9A0E] to-[#FF9A0E] text-white px-6 py-3 rounded-lg font-bold text-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
            disabled={isLoading}
            data-testid="food-delete-btn"
          >
            {isLoading ? 'Deleting...' : 'Yes'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
