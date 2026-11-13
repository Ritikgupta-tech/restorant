import React, { useState } from 'react';
import { Heart, Plus, Eye, Star, Flame, Sparkles, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatCurrency } from '../../utils/formatters';
import { DietaryBadge, SpiceBadge, SpecialBadge } from '../common/Badge';

export const DishCard = ({ dish, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isFavorite = isInWishlist(dish.id);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(dish, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(dish.id);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(dish);
  };

  return (
    <div className="group relative bg-[#171512] border border-[#2B251B] hover:border-[#D6A84F]/50 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col hover:-translate-y-1 hover:shadow-gold-sm">
      {/* Dish Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1D1A16]">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171512] via-transparent to-black/40 opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <DietaryBadge isVeg={dish.isVeg} className="bg-black/60 p-1" />
            {dish.chefSpecial && <SpecialBadge text="Chef Special" />}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? `Remove ${dish.name} from favorites` : `Add ${dish.name} to favorites`}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all active:scale-90 ${
              isFavorite
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                : 'bg-black/50 text-[#AAA39A] hover:text-[#F8F5EF] border border-white/10 hover:border-[#D6A84F]/40'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-400' : ''}`} />
          </button>
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
          <button
            onClick={handleQuickViewClick}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#171512]/90 border border-[#D6A84F]/60 text-xs font-semibold text-[#F8F5EF] hover:bg-[#D6A84F] hover:text-[#0B0B0B] transition-all shadow-xl"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick Preview
          </button>
        </div>

        {/* Category & Rating Bar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-[#AAA39A]">
          <span className="capitalize font-medium tracking-wide px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10">
            {dish.category.replace('-', ' ')}
          </span>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-amber-400">
            <Star className="w-3 h-3 fill-amber-400" />
            <span className="font-bold text-[#F8F5EF]">{dish.rating}</span>
            <span className="text-[10px] text-[#AAA39A] hidden sm:inline">(demo)</span>
          </div>
        </div>
      </div>

      {/* Dish Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <Link
              to={`/menu/${dish.slug}`}
              className="font-serif text-lg font-bold text-[#F8F5EF] hover:text-[#D6A84F] transition-colors truncate"
              title={dish.name}
            >
              {dish.name}
            </Link>
          </div>

          <p className="text-xs text-[#AAA39A] line-clamp-2 leading-relaxed mb-3">
            {dish.description}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <SpiceBadge level={dish.spiceLevel} />
            <span className="text-[11px] text-[#888176]">⏱ {dish.prepTime}</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-[#252018] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#888176] uppercase tracking-wider block">Price</span>
            <span className="font-serif text-lg sm:text-xl font-bold text-[#D6A84F]">
              {formatCurrency(dish.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/menu/${dish.slug}`}
              className="text-xs text-[#AAA39A] hover:text-[#F8F5EF] px-2.5 py-1.5 rounded-lg hover:bg-[#221E17] transition-colors hidden sm:inline-block"
            >
              Details
            </Link>

            <button
              onClick={handleAddToCart}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] hover:brightness-110'
              }`}
              aria-label={`Add ${dish.name} to order`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
