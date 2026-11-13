import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, ArrowRight } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="py-24 sm:py-32 max-w-xl mx-auto px-4 text-center">
      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#171511] border border-[#D6A84F]/30 flex items-center justify-center text-[#D6A84F] shadow-gold-sm">
        <UtensilsCrossed className="w-10 h-10" />
      </div>

      <span className="text-xs uppercase tracking-[0.25em] text-[#D6A84F] font-semibold block mb-2">
        Error 404
      </span>
      <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F8F5EF] mb-4">
        Table Not Found
      </h1>
      <p className="text-xs sm:text-sm text-[#AAA39A] leading-relaxed mb-8">
        The culinary page you are searching for might have been moved or removed from our seasonal course list.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
        >
          Return to Homepage
        </Link>
        <Link
          to="/menu"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1A1813] border border-[#2B251B] hover:border-[#D6A84F] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider transition-all"
        >
          Browse Full Menu
        </Link>
      </div>
    </div>
  );
};
