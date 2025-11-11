'use client';

import { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function Dropdown({ onEdit, onDelete }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="food-dropdown relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="food-dropdown-trigger p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="More options"
        aria-expanded={isOpen}
      >
        <svg width="4" height="20" viewBox="0 0 4 20" fill="none">
          <circle cx="2" cy="2" r="2" fill="#514BC8"/>
          <circle cx="2" cy="10" r="2" fill="#514BC8"/>
          <circle cx="2" cy="18" r="2" fill="#514BC8"/>
        </svg>
      </button>

      {isOpen && (
        <div className="food-dropdown-menu absolute right-0 top-full mt-1 bg-white border border-[#EDEEF1] rounded-md shadow-lg py-1 min-w-[84px] z-50 animate-fadeIn">
          <button
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
            className="food-dropdown-item w-full text-left px-3 py-2 text-[#425466] text-xs font-medium hover:bg-gray-50 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
            className="food-dropdown-item w-full text-left px-3 py-2 text-[#FF3B30] text-xs font-medium hover:bg-gray-50 transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
