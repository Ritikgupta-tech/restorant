import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Heart, Plus, ShoppingBag, Flame, Sparkles, Clock, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatCurrency } from '../../utils/formatters';
import { DietaryBadge, SpiceBadge, SpecialBadge } from '../common/Badge';
import { QuantitySelector } from '../common/QuantitySelector';

export const DishQuickViewModal = ({ dish, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!dish) return null;

  const isFav = isInWishlist(dish.id);

  const handleAddToCart = () => {
    addToCart(dish, quantity);
    onClose();
    openCart();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#14120F] border border-[#D6A84F]/40 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-[#AAA39A] hover:text-[#F8F5EF] p-2 bg-black/60 hover:bg-black/80 rounded-full backdrop-blur-md transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Food Photography */}
          <div className="md:w-1/2 relative bg-[#1E1B16] min-h-[260px] md:min-h-full">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14120F] md:from-transparent via-transparent to-black/30" />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <DietaryBadge isVeg={dish.isVeg} className="bg-black/60 p-1" />
              {dish.chefSpecial && <SpecialBadge text="Chef's Signature" />}
            </div>
          </div>

          {/* Right Column: Information & Order controls */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-[#D6A84F] font-semibold">
                  {dish.category.replace('-', ' ')}
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-bold text-[#F8F5EF]">{dish.rating}</span>
                  <span className="text-[#888176]">({dish.ratingCount})</span>
                </div>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#F8F5EF] mb-2">
                {dish.name}
              </h3>

              <div className="flex items-center gap-2 mb-4">
                <span className="font-serif text-2xl font-bold text-[#D6A84F]">
                  {formatCurrency(dish.price)}
                </span>
                <SpiceBadge level={dish.spiceLevel} />
                <span className="text-xs text-[#AAA39A]">⏱ {dish.prepTime}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#AAA39A] leading-relaxed mb-6">
                {dish.description}
              </p>

              {/* Ingredients */}
              {dish.ingredients && dish.ingredients.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#AAA39A] mb-2">
                    Key Ingredients
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {dish.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-lg bg-[#1E1B16] border border-[#312B21] text-[#E0D8CB]"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="border-t border-[#262118] pt-4 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-[#AAA39A] block mb-1">Select Quantity</span>
                  <QuantitySelector
                    quantity={quantity}
                    onIncrease={() => setQuantity((q) => q + 1)}
                    onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => toggleWishlist(dish.id)}
                  className={`p-3 rounded-xl border transition-all ${
                    isFav
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                      : 'bg-[#1C1914] text-[#AAA39A] border-[#312B21] hover:text-[#F8F5EF] hover:border-[#D6A84F]/40'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-400' : ''}`} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add ({formatCurrency(dish.price * quantity)})</span>
                </button>

                <Link
                  to={`/menu/${dish.slug}`}
                  onClick={onClose}
                  className="w-full py-3 px-4 rounded-xl bg-[#1E1B16] border border-[#332D23] hover:border-[#D6A84F]/60 text-xs text-[#F8F5EF] font-semibold text-center hover:bg-[#25211A] transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Full Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
