'use client';

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="empty-state-message flex flex-col items-center justify-center py-16 sm:py-20 md:py-24 lg:py-32 px-4">
      <div className="max-w-md text-center">
        {/* Icon/Illustration */}
        <div className="mb-6 sm:mb-8">
          <svg
            className="mx-auto w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 text-[#FFB30E] opacity-40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Heading - Descriptive header */}
        <h3 className="empty-state-heading text-[#424242] text-[24px] sm:text-[28px] md:text-[32px] font-bold mb-3 sm:mb-4">
          No Items Available
        </h3>

        {/* Description - Actionable guidance (25-50 characters) */}
        <p className="empty-state-description text-[#757575] text-[16px] sm:text-[18px] leading-relaxed">
          {message || 'Add your first meal to get started'}
        </p>
      </div>
    </div>
  );
}
