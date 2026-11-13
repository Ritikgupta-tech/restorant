import React from 'react';
import { Minus, Plus } from 'lucide-react';

export const QuantitySelector = ({
  quantity = 1,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  size = 'md',
}) => {
  const isSmall = size === 'sm';

  return (
    <div className="inline-flex items-center bg-[#151515] border border-[#D6A84F]/30 rounded-lg p-0.5">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className={`${
          isSmall ? 'w-7 h-7' : 'w-8 h-8'
        } flex items-center justify-center rounded text-[#AAA39A] hover:text-[#F8F5EF] hover:bg-[#25221D] active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all`}
      >
        <Minus className={`${isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
      </button>

      <span
        className={`${
          isSmall ? 'w-8 text-xs' : 'w-10 text-sm'
        } font-semibold text-center text-[#F8F5EF] select-none`}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className={`${
          isSmall ? 'w-7 h-7' : 'w-8 h-8'
        } flex items-center justify-center rounded text-[#AAA39A] hover:text-[#F8F5EF] hover:bg-[#25221D] active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all`}
      >
        <Plus className={`${isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
      </button>
    </div>
  );
};
