import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, ArrowRight } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="py-24 sm:py-36 max-w-xl mx-auto px-4 text-center">
      <div className="w-20 h-20 mx-auto mb-6 bg-[#12100E] border border-[#D6A84F]/30 flex items-center justify-center text-[#D6A84F] shadow-[0_0_30px_rgba(214,168,79,0.15)]">
        <UtensilsCrossed className="w-8 h-8" />
      </div>

      <span className="text-[10px] uppercase tracking-[0.25em] text-[#D6A84F] font-semibold block mb-2">
        Coordinates Uncharted • 404
      </span>
      <h1 className="font-luxury text-4xl sm:text-6xl font-light text-[#F5F0E8] mb-4">
        Table Not <span className="italic text-gradient-gold">Located</span>
      </h1>
      <p className="text-xs sm:text-sm text-[#8A7E72] font-light leading-relaxed mb-8 max-w-sm mx-auto">
        The culinary salon or recipe you seek has departed our current seasonal rotation.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/"
          className="btn-luxury-primary w-full sm:w-auto px-8 py-3.5 text-xs tracking-[0.2em]"
        >
          Return to Salon
        </Link>
        <Link
          to="/menu"
          className="btn-luxury-outline w-full sm:w-auto px-8 py-3.5 text-xs tracking-[0.2em]"
        >
          Browse Catalogue
        </Link>
      </div>
    </div>
  );
};
