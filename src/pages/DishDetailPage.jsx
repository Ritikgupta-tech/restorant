import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  UtensilsCrossed,
  Award,
} from 'lucide-react';
import { DISHES } from '../data/dishes';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/formatters';
import { QuantitySelector } from '../components/common/QuantitySelector';
import { DietaryBadge, SpiceBadge, SpecialBadge } from '../components/common/Badge';
import { DishCard } from '../components/menu/DishCard';
import { Reveal } from '../components/common/ScrollReveal';

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
        <h2 className="font-luxury text-3xl font-light text-[#F5F0E8] mb-3">Dish Not Located</h2>
        <p className="text-xs text-[#8A7E72] mb-6 font-light">
          The culinary item you requested is currently off-rotation or has been archived in our seasonal reserve.
        </p>
        <Link
          to="/menu"
          className="btn-luxury-primary px-6 py-3 text-xs tracking-[0.2em]"
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
    <div className="py-10 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Breadcrumbs & Back */}
      <Reveal className="flex items-center justify-between mb-8 pb-4 border-b border-[#1E1B15]">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8A7E72] hover:text-[#D6A84F] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Selection</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#6A6258] font-mono tracking-wider">
          <Link to="/" className="hover:text-[#D6A84F]">Salon</Link>
          <span>/</span>
          <Link to="/menu" className="hover:text-[#D6A84F]">Catalogue</Link>
          <span>/</span>
          <span className="text-[#D6A84F] truncate max-w-[150px] sm:max-w-none">{dish.name}</span>
        </div>
      </Reveal>

      {/* Main Grid: Gallery + Story & Ordering */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Column: Food Photography */}
        <Reveal className="space-y-6">
          <div className="relative aspect-[4/3] overflow-hidden border border-[#D6A84F]/30 bg-[#12100E] shadow-[0_20px_60px_rgba(0,0,0,0.8)] group">
            {/* Corner Gold Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#D6A84F] z-10" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#D6A84F] z-10" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#D6A84F] z-10" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#D6A84F] z-10" />

            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Badges Overlay */}
            <div className="absolute top-5 left-5 flex flex-col gap-2 z-10">
              <DietaryBadge isVeg={dish.isVeg} className="bg-black/80 backdrop-blur-md px-2.5 py-1 text-[11px]" />
              {dish.chefSpecial && <SpecialBadge text="Chef Signature Special" />}
            </div>

            {/* Wishlist toggle */}
            <button
              onClick={() => toggleWishlist(dish.id)}
              className={`absolute top-5 right-5 p-3.5 backdrop-blur-md border transition-all z-10 ${
                isFav
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/50'
                  : 'bg-black/60 text-[#8A7E72] hover:text-[#F5F0E8] border-white/10 hover:border-[#D6A84F]/50'
              }`}
              aria-label="Save to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-400' : ''}`} />
            </button>
          </div>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#12100E] border border-[#221E17] p-4 text-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A7064] block mb-1">Classification</span>
              <span className={`text-xs font-semibold ${dish.isVeg ? 'text-emerald-400' : 'text-rose-400'}`}>
                {dish.isVeg ? '100% Vegetarian' : 'Non-Vegetarian'}
              </span>
            </div>
            <div className="bg-[#12100E] border border-[#221E17] p-4 text-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A7064] block mb-1">Culinary Realm</span>
              <span className="text-xs font-semibold text-[#E0D7CB] capitalize">
                {dish.category.replace('-', ' ')}
              </span>
            </div>
            <div className="bg-[#12100E] border border-[#221E17] p-4 text-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A7064] block mb-1">Aromatics</span>
              <span className="text-xs font-mono font-semibold text-[#D6A84F]">
                ≈ {dish.prepTime}
              </span>
            </div>
          </div>
        </Reveal>

        {/* Right Column: Culinary Notes & Order Box */}
        <Reveal delay={0.15} className="space-y-8">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D6A84F]">
                {dish.category.replace('-', ' ')} Cuisine
              </span>
              <button
                onClick={handleShare}
                className="text-xs text-[#8A7E72] hover:text-[#F5F0E8] flex items-center gap-1.5 transition-colors uppercase tracking-wider"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>

            <h1 className="font-luxury text-4xl sm:text-5xl md:text-6xl font-light text-[#F5F0E8] leading-tight mb-4 tracking-wide">
              {dish.name}
            </h1>

            {/* Rating & Spice Level */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#151310] border border-[#2B251B] text-amber-400 text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-mono font-bold text-[#F5F0E8]">{dish.rating}</span>
                <span className="text-[#6A6258]">({dish.ratingCount} reviews)</span>
              </div>
              <SpiceBadge level={dish.spiceLevel} />
              {dish.isPopular && (
                <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] font-semibold">
                  Most Ordered
                </span>
              )}
            </div>

            <div className="font-luxury text-4xl sm:text-5xl font-normal text-gradient-gold mb-6">
              {formatCurrency(dish.price)}
            </div>

            <p className="text-sm sm:text-base text-[#9E9284] leading-relaxed mb-6 font-light">
              {dish.description}
            </p>
          </div>

          {/* Key Ingredients */}
          {dish.ingredients && dish.ingredients.length > 0 && (
            <div className="border-t border-[#1E1B15] pt-6">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A7064] mb-3">
                Key Ingredients & Heritage Spices
              </h3>
              <div className="flex flex-wrap gap-2">
                {dish.ingredients.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3.5 py-1.5 bg-[#141210] border border-[#262118] text-[#D6D0C5] tracking-wide"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Luxury Order Control Box */}
          <div className="border border-[#D6A84F]/40 bg-[#12100E] p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.6)] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A7064] block mb-2 font-semibold">
                  Select Portions
                </span>
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity((q) => q + 1)}
                  onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                />
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A7064] block mb-1">
                  Payable Subtotal
                </span>
                <span className="font-luxury text-3xl sm:text-4xl font-normal text-gradient-gold">
                  {formatCurrency(dish.price * quantity)}
                </span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="btn-luxury-primary w-full py-4 text-xs sm:text-sm tracking-[0.2em] flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add To Dining Cart</span>
            </button>
          </div>
        </Reveal>
      </div>

      {/* Related Dishes Section */}
      {relatedDishes.length > 0 && (
        <Reveal delay={0.2} className="mt-24 pt-16 border-t border-[#1E1B15]">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D6A84F] block mb-2">
                Curator's Recommendation
              </span>
              <h2 className="font-luxury text-3xl sm:text-4xl font-light text-[#F5F0E8]">
                Complementary <span className="italic text-gradient-gold">Delicacies</span>
              </h2>
            </div>
            <Link
              to="/menu"
              className="text-xs font-semibold text-[#D6A84F] hover:text-[#F3DC9B] uppercase tracking-[0.2em] flex items-center gap-1"
            >
              <span>View All</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {relatedDishes.map((rDish) => (
              <DishCard key={rDish.id} dish={rDish} />
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
};
