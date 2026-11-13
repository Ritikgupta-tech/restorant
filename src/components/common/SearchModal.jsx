import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DISHES } from '../../data/dishes';
import { formatCurrency } from '../../utils/formatters';
import { DietaryBadge } from './Badge';
import { useCart } from '../../context/CartContext';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { addToCart, openCart } = useCart();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const filteredDishes = normalizedQuery
    ? DISHES.filter(
        (dish) =>
          dish.name.toLowerCase().includes(normalizedQuery) ||
          dish.category.toLowerCase().includes(normalizedQuery) ||
          dish.description.toLowerCase().includes(normalizedQuery) ||
          dish.ingredients?.some((ing) => ing.toLowerCase().includes(normalizedQuery))
      )
    : DISHES.filter((d) => d.isPopular).slice(0, 4);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Search Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -15 }}
          className="relative w-full max-w-2xl bg-[#0F0E0D] border border-[#D6A84F]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden z-10 flex flex-col max-h-[80vh]"
        >
          {/* Gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D6A84F] to-transparent" />

          {/* Search Input Bar */}
          <div className="p-4 sm:p-5 border-b border-[#221F1A] flex items-center gap-3">
            <Search className="w-5 h-5 text-[#D6A84F] flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search delicacies (e.g. Biryani, Pizza, Manchurian, Brownie)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-[#F5F0E8] placeholder-[#665E52] focus:outline-none text-sm sm:text-base tracking-wide"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-[#8A7E72] hover:text-[#F5F0E8] px-2.5 py-1 bg-[#1A1814] border border-[#2B251B] transition-colors uppercase tracking-wider"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="text-[#8A7E72] hover:text-[#F5F0E8] p-1.5 hover:bg-[#1A1814] transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Keywords Bar */}
          <div className="px-5 py-2.5 bg-[#0C0B0A] border-b border-[#1E1B15] flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
            <span className="text-[10px] uppercase tracking-wider text-[#6A6258] flex-shrink-0 font-semibold">
              Curated Picks:
            </span>
            {['Biryani', 'Pizza', 'Paneer', 'Brownie', 'Noodles', 'Dosa', 'Tandoori'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 bg-[#141210] border border-[#24201A] text-[#8A7E72] hover:text-[#D6A84F] hover:border-[#D6A84F]/40 transition-colors whitespace-nowrap text-xs"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#6A6258] px-1 font-semibold">
              {normalizedQuery
                ? `Located ${filteredDishes.length} ${filteredDishes.length === 1 ? 'delicacy' : 'delicacies'} for "${query}"`
                : 'Signature Menu Recommendations'}
            </div>

            {filteredDishes.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm text-[#8A7E72] font-light mb-3">
                  No delicacies located matching "{query}".
                </p>
                <button
                  onClick={() => setQuery('')}
                  className="text-xs text-[#D6A84F] hover:underline uppercase tracking-wider"
                >
                  Clear search and view all dishes
                </button>
              </div>
            ) : (
              filteredDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="flex items-center gap-3.5 p-3.5 bg-[#12100E] border border-[#221F1A] hover:border-[#D6A84F]/40 transition-all group"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-14 h-14 object-cover flex-shrink-0 border border-[#26221A]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <DietaryBadge isVeg={dish.isVeg} />
                      <Link
                        to={`/menu/${dish.slug}`}
                        onClick={onClose}
                        className="font-luxury text-lg font-light text-[#F5F0E8] hover:text-[#D6A84F] transition-colors truncate"
                      >
                        {dish.name}
                      </Link>
                    </div>
                    <p className="text-xs text-[#8A7E72] font-light truncate">{dish.description}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-mono font-medium text-gradient-gold">
                        {formatCurrency(dish.price)}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[#6A6258]">
                        {dish.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        addToCart(dish, 1);
                        onClose();
                        openCart();
                      }}
                      className="btn-luxury-primary px-3 py-1.5 text-xs tracking-wider flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-[#0A0908] border-t border-[#1E1B15] flex items-center justify-between text-[11px] text-[#6A6258]">
            <span>Press ESC or click outside to dismiss</span>
            <Link
              to="/menu"
              onClick={onClose}
              className="text-[#D6A84F] hover:text-[#F3DC9B] uppercase tracking-wider font-semibold"
            >
              Browse Complete Menu →
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
