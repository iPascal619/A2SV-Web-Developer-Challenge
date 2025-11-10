import { ReactNode } from 'react';

interface BadgeProps {
  variant: 'price' | 'open' | 'closed';
  children: ReactNode;
  className?: string;
}

export default function Badge({ variant, children, className = '' }: BadgeProps) {
  const variantStyles = {
    price: 'food-badge-price bg-[#F17228] text-white',
    open: 'food-badge-status bg-[rgba(121,185,60,0.2)] text-[#79B93C]',
    closed: 'food-badge-status bg-[rgba(241,114,40,0.2)] text-[#F17228]'
  };

  return (
    <div className={`food-badge inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-[22px] leading-[1.2] ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
}
