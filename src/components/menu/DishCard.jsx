import React, { useState } from 'react';
import { Heart, Plus, Eye, Star, Flame, Sparkles, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatCurrency } from '../../utils/formatters';
import { DietaryBadge, SpiceBadge, SpecialBadge } from '../common/Badge';

export const DishCard = ({ dish, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isFavorite = isInWishlist(dish.id);
  const [justAdded, setJustAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(dish, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(dish.id);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(dish);
  };

  return (
    <motion.div
      className="relative bg-card-luxury border border-[#D6A84F]/12 rounded-luxury overflow-hidden flex flex-col"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -6, boxShadow: '0 20px 50px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(214,168,79,0.2), 0 0 30px rgba(214,168,79,0.08)' }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Top gold line on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D6A84F] to-transparent z-10"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1612]">
        <motion.img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.07 : 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          loading="lazy"
        />

        {/* Image gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161411]/80 via-transparent to-black/30" />

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-[#D6A84F]/8"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <DietaryBadge isVeg={dish.isVeg} className="bg-black/60 backdrop-blur-sm p-1" />
            {dish.chefSpecial && <SpecialBadge text="Chef Special" />}
          </div>
          {/* Wishlist */}
          <motion.button
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            whileTap={{ scale: 0.85 }}
            className={`w-8 h-8 rounded-luxury flex items-center justify-center backdrop-blur-md transition-all ${
              isFavorite
                ? 'bg-rose-500/25 text-rose-400 border border-rose-500/50'
                : 'bg-black/50 text-[#A09080] hover:text-white border border-white/10 hover:border-[#D6A84F]/40'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-400' : ''}`} />
          </motion.button>
        </div>

        {/* Quick view overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <motion.button
                initial={{ scale: 0.8, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 10 }}
                onClick={handleQuickView}
                className="flex items-center gap-2 px-4 py-2.5 rounded-luxury bg-[#161411]/90 border border-[#D6A84F]/50 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#F5F0E8] hover:bg-[#D6A84F] hover:text-[#080807] hover:border-[#D6A84F] transition-all shadow-luxury"
              >
                <Eye className="w-3.5 h-3.5" />
                Quick Preview
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom info strip */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="text-[9px] uppercase tracking-[0.15em] font-medium text-[#C8BEB0] px-2.5 py-1 rounded-luxury bg-black/60 backdrop-blur-sm border border-white/8">
            {dish.category.replace('-', ' ')}
          </span>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-luxury bg-black/60 backdrop-blur-sm border border-white/8">
            <Star className="w-3 h-3 text-[#D6A84F] fill-[#D6A84F]" />
            <span className="text-[11px] font-bold text-[#F5F0E8]">{dish.rating}</span>
            <span className="text-[9px] text-[#706050]">(demo)</span>
          </div>
        </div>
      </div>

      {/* Dish Details */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-3">
          <Link
            to={`/menu/${dish.slug}`}
            className="font-display text-lg font-bold text-[#F5F0E8] hover:text-[#D6A84F] transition-colors duration-300 leading-tight block mb-1 hover-underline-gold"
          >
            {dish.name}
          </Link>
          <p className="text-xs text-[#706050] line-clamp-2 leading-relaxed">
            {dish.description}
          </p>
        </div>

        {/* Meta tags */}
        <div className="flex items-center gap-2 mb-4">
          <SpiceBadge level={dish.spiceLevel} />
          <span className="text-[10px] text-[#706050] flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {dish.prepTime}
          </span>
        </div>

        {/* Price + Actions */}
        <div className="mt-auto pt-4 border-t border-[#D6A84F]/10 flex items-center justify-between gap-3">
          <div>
            <span className="text-[9px] uppercase tracking-[0.15em] text-[#706050] block">From</span>
            <span className="font-luxury text-xl font-semibold text-[#D6A84F]">
              {formatCurrency(dish.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/menu/${dish.slug}`}
              className="hidden sm:flex px-3 py-2 rounded-luxury text-[10px] text-[#A09080] hover:text-[#F5F0E8] border border-[#D6A84F]/15 hover:border-[#D6A84F]/40 transition-all uppercase tracking-[0.1em] font-medium"
            >
              Details
            </Link>
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.92 }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-luxury text-[10px] font-bold uppercase tracking-[0.12em] transition-all shadow-sm ${
                justAdded
                  ? 'bg-emerald-700 text-white border border-emerald-600'
                  : 'bg-gold-gradient text-[#080807] hover:shadow-gold-sm hover:brightness-110'
              }`}
            >
              <AnimatePresence mode="wait">
                {justAdded ? (
                  <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Added</span>
                  </motion.div>
                ) : (
                  <motion.div key="add" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
