import React from 'react';
import { Sparkles, Flame } from 'lucide-react';

export const DietaryBadge = ({ isVeg, className = "" }) => {
  return (
    <div
      className={`inline-flex items-center justify-center border p-[2px] rounded-sm ${
        isVeg ? 'border-emerald-500' : 'border-rose-600'
      } ${className}`}
      title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          isVeg ? 'bg-emerald-500' : 'bg-rose-600'
        }`}
      />
    </div>
  );
};

export const SpiceBadge = ({ level }) => {
  if (!level || level === 'None') return null;
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-orange-950/40 text-orange-400 border border-orange-500/30">
      <Flame className="w-3 h-3" />
      {level}
    </span>
  );
};

export const SpecialBadge = ({ text = "Chef's Special" }) => {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#D6A84F]/15 text-[#D6A84F] border border-[#D6A84F]/40 backdrop-blur-sm">
      <Sparkles className="w-3 h-3 text-[#D6A84F]" />
      {text}
    </span>
  );
};
