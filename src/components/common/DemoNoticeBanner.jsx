import React, { useState } from 'react';
import { Info, X, ShieldAlert } from 'lucide-react';

export const DemoNoticeBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#12100C] border-b border-[#D6A84F]/30 text-xs text-[#AAA39A] py-1.5 px-4 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <ShieldAlert className="w-3.5 h-3.5 text-[#D6A84F] flex-shrink-0" />
          <p className="truncate">
            <span className="text-[#D6A84F] font-semibold tracking-wide uppercase">Prototype Demo:</span>{' '}
            Prices in INR, reviews, table bookings, and checkout are interactive simulations for testing digital customer journeys.
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-[#AAA39A] hover:text-[#F8F5EF] p-0.5 rounded transition-colors flex-shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
