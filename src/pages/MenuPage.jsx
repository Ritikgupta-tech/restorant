import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  Flame,
  Leaf,
  Star,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
  Utensils,
  Award,
} from 'lucide-react';
import { DISHES, CATEGORIES } from '../data/dishes';
import { DishCard } from '../components/menu/DishCard';
import { DishQuickViewModal } from '../components/menu/DishQuickViewModal';
import { Reveal } from '../components/common/ScrollReveal';

export const MenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);
  const [chefOnly, setChefOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedQuickDish, setSelectedQuickDish] = useState(null);

  // Sync category param if updated from URL
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setVegOnly(false);
    setPopularOnly(false);
    setChefOnly(false);
    setSortBy('featured');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  // Filtered & sorted dishes
  const filteredDishes = useMemo(() => {
    return DISHES.filter((dish) => {
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
        return false;
      }
      if (vegOnly && !dish.isVeg) {
        return false;
      }
      if (popularOnly && !dish.isPopular) {
        return false;
      }
      if (chefOnly && !dish.chefSpecial) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = dish.name.toLowerCase().includes(query);
        const matchesDesc = dish.description.toLowerCase().includes(query);
        const matchesCat = dish.category.toLowerCase().includes(query);
        const matchesIng = dish.ingredients?.some((i) => i.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesIng) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [selectedCategory, searchQuery, vegOnly, popularOnly, chefOnly, sortBy]);

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner with Luxury Nobu/Gaggan Styling */}
      <Reveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6A84F]/10 border border-[#D6A84F]/30 text-[#D6A84F] text-[11px] font-semibold uppercase tracking-[0.25em] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Haute Gastronomie</span>
        </div>
        <h1 className="font-luxury text-4xl sm:text-6xl md:text-7xl font-light text-[#F5F0E8] tracking-wide mb-4">
          The Sizzle <span className="italic font-normal text-gradient-gold">Catalogue</span>
        </h1>
        <p className="text-sm sm:text-base text-[#A09080] font-light leading-relaxed max-w-2xl mx-auto">
          An orchestra of flamed cast iron sizzles, slow-simmered Awadhi gravies, artisan wood-fired dough, and delicate patisserie. All prices in INR (Demo).
        </p>
      </Reveal>

      {/* Category Pills Navigation with Horizontal Scroll & Active Glow */}
      <div className="relative mb-10">
        <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-4 scrollbar-none no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count =
              cat.id === 'all'
                ? DISHES.length
                : DISHES.filter((d) => d.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`group relative px-5 py-3 rounded-none text-xs font-medium tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-300 flex items-center gap-2.5 border ${
                  isActive
                    ? 'border-[#D6A84F] bg-[#D6A84F]/10 text-[#F5F0E8] shadow-[0_0_20px_rgba(214,168,79,0.15)]'
                    : 'border-[#221F1A] bg-[#12110F] text-[#8A7E72] hover:text-[#E0D7CB] hover:border-[#3E382E]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="categoryActiveIndicator"
                    className="absolute -top-[1px] left-0 right-0 h-[2px] bg-[#D6A84F]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded transition-colors ${
                    isActive
                      ? 'bg-[#D6A84F] text-[#080807] font-bold'
                      : 'bg-[#1C1A17] text-[#6A6258] group-hover:text-[#A09585]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Advanced Filters Bar */}
      <div className="bg-[#12100E] border border-[#26221B] rounded-none p-5 sm:p-6 mb-12 shadow-[0_10px_30px_rgba(0,0,0,0.5)] space-y-5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#D6A84F] absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search dishes, ingredients (e.g. saffron, truffle, paneer, dim sum)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none rounded-none pl-11 pr-12 py-3 text-xs sm:text-sm text-[#F5F0E8] placeholder-[#5A5247] tracking-wide transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-xs text-[#8A7E72] hover:text-[#D6A84F] transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#8A7E72] uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5 font-light">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span>Sort By:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none rounded-none px-4 py-3 text-xs text-[#E0D7CB] tracking-wide cursor-pointer transition-colors"
            >
              <option value="featured">Curated & Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Guest Rating</option>
            </select>
          </div>
        </div>

        {/* Filter Toggle Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#1E1B15]">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Veg Only Toggle */}
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs uppercase tracking-wider font-medium border transition-all ${
                vegOnly
                  ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                  : 'bg-[#151310] text-[#7A7064] border-[#26221A] hover:text-[#C0B4A4]'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Vegetarian</span>
            </button>

            {/* Chef's Signature Toggle */}
            <button
              onClick={() => setChefOnly(!chefOnly)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs uppercase tracking-wider font-medium border transition-all ${
                chefOnly
                  ? 'bg-[#D6A84F]/15 text-[#D6A84F] border-[#D6A84F]/60 shadow-[0_0_15px_rgba(214,168,79,0.15)]'
                  : 'bg-[#151310] text-[#7A7064] border-[#26221A] hover:text-[#C0B4A4]'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span>Chef's Signature</span>
            </button>

            {/* Guest Favorites Toggle */}
            <button
              onClick={() => setPopularOnly(!popularOnly)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs uppercase tracking-wider font-medium border transition-all ${
                popularOnly
                  ? 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/60 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                  : 'bg-[#151310] text-[#7A7064] border-[#26221A] hover:text-[#C0B4A4]'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Guest Favorites</span>
            </button>
          </div>

          {/* Reset Filters */}
          {(selectedCategory !== 'all' || vegOnly || popularOnly || chefOnly || searchQuery) && (
            <button
              onClick={resetFilters}
              className="text-xs text-[#8A7E72] hover:text-[#D6A84F] flex items-center gap-1.5 transition-colors uppercase tracking-wider"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Catalog Status Bar */}
      <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#1E1B15] text-xs text-[#8A7E72]">
        <div className="flex items-center gap-2">
          <Utensils className="w-3.5 h-3.5 text-[#D6A84F]" />
          <span>
            Presenting <strong className="text-[#F5F0E8] font-mono">{filteredDishes.length}</strong> culinary creations
          </span>
        </div>
        {selectedCategory !== 'all' && (
          <span className="text-[#D6A84F] tracking-wider uppercase font-semibold">
            {selectedCategory.replace('-', ' ')}
          </span>
        )}
      </div>

      {/* Product Grid with luxury styling */}
      {filteredDishes.length === 0 ? (
        <Reveal className="py-24 text-center bg-[#12100E] border border-[#26221B] p-10 max-w-xl mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#181512] border border-[#D6A84F]/30 flex items-center justify-center text-[#D6A84F]">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="font-luxury text-2xl font-light text-[#F5F0E8] mb-2">No Matching Delicacies</h3>
          <p className="text-xs text-[#8A7E72] font-light max-w-sm mx-auto mb-6 leading-relaxed">
            We couldn't locate any dishes matching your current selection. Clear your criteria to browse the full reserve.
          </p>
          <button
            onClick={resetFilters}
            className="btn-luxury-primary px-8 py-3 text-xs tracking-[0.2em]"
          >
            Reset All Filters
          </button>
        </Reveal>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDishes.map((dish, idx) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.4) }}
            >
              <DishCard
                dish={dish}
                onQuickView={(d) => setSelectedQuickDish(d)}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Quick View Modal */}
      {selectedQuickDish && (
        <DishQuickViewModal
          dish={selectedQuickDish}
          onClose={() => setSelectedQuickDish(null)}
        />
      )}
    </div>
  );
};
