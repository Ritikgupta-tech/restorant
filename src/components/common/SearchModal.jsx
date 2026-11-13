import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShoppingBag, ArrowRight, Star } from 'lucide-react';
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
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Search Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-[#14120F] border border-[#D6A84F]/40 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]"
        >
          {/* Search Input Bar */}
          <div className="p-4 sm:p-5 border-b border-[#2B251B] flex items-center gap-3">
            <Search className="w-5 h-5 text-[#D6A84F] flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search dishes (e.g. Biryani, Pizza, Manchurian, Brownie)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-[#F8F5EF] placeholder-[#776F62] focus:outline-none text-sm sm:text-base"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-[#AAA39A] hover:text-[#F8F5EF] px-2 py-1 bg-[#201D17] rounded-md transition-colors"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="text-[#AAA39A] hover:text-[#F8F5EF] p-1.5 hover:bg-[#201D17] rounded-lg transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Categories Bar */}
          <div className="px-5 py-2.5 bg-[#171511] border-b border-[#241F16] flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[#888176] flex-shrink-0">Quick keywords:</span>
            {['Biryani', 'Pizza', 'Paneer', 'Brownie', 'Noodles', 'Dosa'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 rounded-md bg-[#221E18] text-[#AAA39A] hover:text-[#D6A84F] hover:bg-[#2C271E] transition-colors whitespace-nowrap"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="text-xs text-[#AAA39A] px-1 font-medium">
              {normalizedQuery
                ? `Found ${filteredDishes.length} ${filteredDishes.length === 1 ? 'dish' : 'dishes'} matching "${query}"`
                : 'Popular Menu Recommendations'}
            </div>

            {filteredDishes.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm text-[#AAA39A] mb-3">
                  No matching dishes found for "{query}".
                </p>
                <button
                  onClick={() => setQuery('')}
                  className="text-xs text-[#D6A84F] hover:underline"
                >
                  Clear search and view all popular dishes
                </button>
              </div>
            ) : (
              filteredDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="flex items-center gap-3 p-3 bg-[#191713] border border-[#2A241A] rounded-xl hover:border-[#D6A84F]/40 transition-all group"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <DietaryBadge isVeg={dish.isVeg} />
                      <Link
                        to={`/menu/${dish.slug}`}
                        onClick={onClose}
                        className="text-sm font-semibold text-[#F8F5EF] hover:text-[#D6A84F] transition-colors truncate"
                      >
                        {dish.name}
                      </Link>
                    </div>
                    <p className="text-xs text-[#AAA39A] truncate">{dish.description}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-bold text-[#D6A84F]">
                        {formatCurrency(dish.price)}
                      </span>
                      <span className="text-[11px] text-[#7A7367] capitalize">
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
                      className="px-3 py-1.5 rounded-lg bg-[#D6A84F] text-[#0B0B0B] text-xs font-bold hover:bg-[#F3DC9B] transition-colors flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-[#110F0C] border-t border-[#241F16] flex items-center justify-between text-xs text-[#AAA39A]">
            <span>Press ESC or click outside to dismiss</span>
            <Link
              to="/menu"
              onClick={onClose}
              className="text-[#D6A84F] hover:underline flex items-center gap-1 font-medium"
            >
              View Full Menu <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
