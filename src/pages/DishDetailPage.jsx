import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Star,
  Flame,
  Sparkles,
  Clock,
  Check,
  ShieldCheck,
  Share2,
} from 'lucide-react';
import { DISHES } from '../data/dishes';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/formatters';
import { QuantitySelector } from '../components/common/QuantitySelector';
import { DietaryBadge, SpiceBadge, SpecialBadge } from '../components/common/Badge';
import { DishCard } from '../components/menu/DishCard';

export const DishDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  const { addToCart, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const dish = DISHES.find((d) => d.slug === slug);

  if (!dish) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <h2 className="font-serif text-3xl font-bold text-[#F8F5EF] mb-3">Dish Not Found</h2>
        <p className="text-xs text-[#AAA39A] mb-6">
          The dish you are looking for is unavailable or may have been renamed in our seasonal catalogue.
        </p>
        <Link
          to="/menu"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider"
        >
          Return to Menu
        </Link>
      </div>
    );
  }

  const isFav = isInWishlist(dish.id);
  const relatedDishes = DISHES.filter((d) => d.category === dish.category && d.id !== dish.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(dish, quantity);
    openCart();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#AAA39A] hover:text-[#D6A84F] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Left: Food Photography with Zoom Container */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#D6A84F]/30 bg-[#161411] shadow-2xl group">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <DietaryBadge isVeg={dish.isVeg} className="bg-black/60 p-1.5" />
              {dish.chefSpecial && <SpecialBadge text="Chef Signature Dish" />}
            </div>

            {/* Wishlist toggle */}
            <button
              onClick={() => toggleWishlist(dish.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all ${
                isFav
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  : 'bg-black/50 text-[#AAA39A] hover:text-[#F8F5EF] border border-white/10'
              }`}
              aria-label="Save to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-400' : ''}`} />
            </button>
          </div>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#14120F] border border-[#262017] p-3 rounded-xl text-center">
              <span className="text-[10px] uppercase tracking-wider text-[#888176] block mb-1">Dietary</span>
              <span className={`text-xs font-bold ${dish.isVeg ? 'text-emerald-400' : 'text-rose-400'}`}>
                {dish.isVeg ? '100% Vegetarian' : 'Non-Vegetarian'}
              </span>
            </div>
            <div className="bg-[#14120F] border border-[#262017] p-3 rounded-xl text-center">
              <span className="text-[10px] uppercase tracking-wider text-[#888176] block mb-1">Calories</span>
              <span className="text-xs font-bold text-[#F8F5EF]">{dish.calories || '450 kcal'}</span>
            </div>
            <div className="bg-[#14120F] border border-[#262017] p-3 rounded-xl text-center">
              <span className="text-[10px] uppercase tracking-wider text-[#888176] block mb-1">Prep Time</span>
              <span className="text-xs font-bold text-[#D6A84F]">{dish.prepTime}</span>
            </div>
          </div>
        </div>

        {/* Right: Details & Order Controls */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6A84F]">
                {dish.category.replace('-', ' ')}
              </span>
              <button
                onClick={handleShare}
                className="text-xs text-[#AAA39A] hover:text-[#F8F5EF] flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Link Copied!' : 'Share Dish'}</span>
              </button>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F8F5EF] leading-tight mb-3">
              {dish.name}
            </h1>

            {/* Rating & Spice Level */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1E1B15] border border-[#3A3326] text-amber-400 text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold text-[#F8F5EF]">{dish.rating}</span>
                <span className="text-[#888176]">({dish.ratingCount})</span>
              </div>
              <SpiceBadge level={dish.spiceLevel} />
            </div>

            <div className="font-serif text-3xl font-bold text-[#D6A84F] mb-6">
              {formatCurrency(dish.price)}
            </div>

            <p className="text-sm sm:text-base text-[#AAA39A] leading-relaxed mb-6">
              {dish.description}
            </p>
          </div>

          {/* Key Ingredients */}
          {dish.ingredients && dish.ingredients.length > 0 && (
            <div className="border-t border-[#262118] pt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#AAA39A] mb-3">
                Key Ingredients & Aromatics
              </h3>
              <div className="flex flex-wrap gap-2">
                {dish.ingredients.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[#181512] border border-[#2D271D] text-[#D6D0C5]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Order Control Box */}
          <div className="border border-[#D6A84F]/30 bg-[#14120E] p-6 rounded-2xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-[#AAA39A] block mb-1">Select Quantity</span>
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity((q) => q + 1)}
                  onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                />
              </div>

              <div className="text-right">
                <span className="text-xs text-[#AAA39A] block">Total Amount</span>
                <span className="font-serif text-2xl font-bold text-[#D6A84F]">
                  {formatCurrency(dish.price * quantity)}
                </span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] font-bold text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 active:scale-[0.99] transition-all shadow-gold-sm flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add To Order Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Related Dishes Section */}
      {relatedDishes.length > 0 && (
        <div className="mt-20 pt-12 border-t border-[#262118]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6A84F] block mb-1">
                More From This Category
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F5EF]">
                You May Also Relish
              </h2>
            </div>
            <Link
              to="/menu"
              className="text-xs font-bold text-[#D6A84F] hover:underline uppercase tracking-wider"
            >
              View Full Menu
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedDishes.map((rDish) => (
              <DishCard key={rDish.id} dish={rDish} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
