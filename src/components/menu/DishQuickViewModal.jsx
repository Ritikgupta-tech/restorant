import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Heart, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
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
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-[#0F0E0D] border border-[#D6A84F]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D6A84F] to-transparent z-20" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 text-[#A09585] hover:text-[#F5F0E8] p-2 bg-[#080807]/80 hover:bg-[#1A1815] border border-[#2B251B] backdrop-blur-md transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Column: Food Photography */}
          <div className="md:w-1/2 relative bg-[#161411] min-h-[260px] md:min-h-full">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0D] md:from-transparent via-transparent to-black/40" />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <DietaryBadge isVeg={dish.isVeg} className="bg-black/70 p-1" />
              {dish.chefSpecial && <SpecialBadge text="Chef Signature" />}
            </div>
          </div>

          {/* Right Column: Information & Order controls */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#D6A84F] font-semibold">
                  {dish.category.replace('-', ' ')}
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-mono font-bold text-[#F5F0E8]">{dish.rating}</span>
                  <span className="text-[#6A6258]">({dish.ratingCount})</span>
                </div>
              </div>

              <h3 className="font-luxury text-3xl font-light text-[#F5F0E8] mb-2 leading-tight">
                {dish.name}
              </h3>

              <div className="flex items-center gap-3 mb-4">
                <span className="font-luxury text-3xl font-normal text-gradient-gold">
                  {formatCurrency(dish.price)}
                </span>
                <SpiceBadge level={dish.spiceLevel} />
                <span className="text-xs text-[#8A7E72] font-mono">≈ {dish.prepTime}</span>
              </div>

              <p className="text-xs text-[#9E9284] leading-relaxed mb-6 font-light">
                {dish.description}
              </p>

              {/* Ingredients */}
              {dish.ingredients && dish.ingredients.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#7A7064] mb-2 font-medium">
                    Aromatics & Ingredients
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {dish.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-1 bg-[#161412] border border-[#2B251D] text-[#C4BAAC]"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="border-t border-[#221E18] pt-4 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#7A7064] block mb-1 font-medium">
                    Portion Count
                  </span>
                  <QuantitySelector
                    quantity={quantity}
                    onIncrease={() => setQuantity((q) => q + 1)}
                    onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => toggleWishlist(dish.id)}
                  className={`p-3 border transition-all ${
                    isFav
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/50'
                      : 'bg-[#141210] text-[#8A7E72] border-[#2A241C] hover:text-[#F5F0E8] hover:border-[#D6A84F]/40'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-400' : ''}`} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={handleAddToCart}
                  className="btn-luxury-primary py-3 px-4 text-xs tracking-wider flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add ({formatCurrency(dish.price * quantity)})</span>
                </button>

                <Link
                  to={`/menu/${dish.slug}`}
                  onClick={onClose}
                  className="btn-luxury-outline py-3 px-4 text-xs tracking-wider flex items-center justify-center gap-1.5"
                >
                  <span>Explore Dish</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
