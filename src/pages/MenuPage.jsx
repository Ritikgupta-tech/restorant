import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  Flame,
  Leaf,
  Star,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { DISHES, CATEGORIES } from '../data/dishes';
import { DishCard } from '../components/menu/DishCard';
import { DishQuickViewModal } from '../components/menu/DishQuickViewModal';

export const MenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'rating'
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
    setSortBy('featured');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  // Filtered & sorted dishes
  const filteredDishes = useMemo(() => {
    return DISHES.filter((dish) => {
      // Category filter
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
        return false;
      }
      // Veg only filter
      if (vegOnly && !dish.isVeg) {
        return false;
      }
      // Popular only filter
      if (popularOnly && !dish.isPopular) {
        return false;
      }
      // Search query
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
      // Default: featured first
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [selectedCategory, searchQuery, vegOnly, popularOnly, sortBy]);

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D6A84F] block mb-2">
          Handcrafted Gastronomy
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F8F5EF] mb-3">
          Our Food Catalogue
        </h1>
        <p className="text-sm text-[#AAA39A] leading-relaxed">
          From slow-simmered royal curries and flamed tandoor grills to wood-fired artisan sourdough pizzas and molten desserts. Prices in INR (Demo).
        </p>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                isActive
                  ? 'bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] shadow-gold-sm font-bold scale-[1.02]'
                  : 'bg-[#161410] text-[#AAA39A] border border-[#2B251B] hover:text-[#F8F5EF] hover:border-[#D6A84F]/40'
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-[#0B0B0B]/30 text-[#0B0B0B]' : 'bg-[#221E18] text-[#888176]'
                }`}
              >
                {cat.id === 'all'
                  ? DISHES.length
                  : DISHES.filter((d) => d.category === cat.id).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="bg-[#14120F] border border-[#2B251B] rounded-2xl p-4 mb-10 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#AAA39A] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by dish name, category, or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1B1814] border border-[#302A20] focus:border-[#D6A84F] focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#F8F5EF] placeholder-[#776E60]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-[#AAA39A] hover:text-[#F8F5EF]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#AAA39A] whitespace-nowrap flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#D6A84F]" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#1B1814] border border-[#302A20] focus:border-[#D6A84F] focus:outline-none rounded-xl px-3 py-2 text-xs text-[#F8F5EF]"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Quick Toggles: Veg Only, Popular Only, Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#221D16]">
          <div className="flex items-center gap-3">
            {/* Veg Only Toggle */}
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                vegOnly
                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/50'
                  : 'bg-[#1C1914] text-[#AAA39A] border border-[#2D281F] hover:text-[#F8F5EF]'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Veg Only</span>
            </button>

            {/* Popular Only Toggle */}
            <button
              onClick={() => setPopularOnly(!popularOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                popularOnly
                  ? 'bg-[#D6A84F]/15 text-[#D6A84F] border border-[#D6A84F]/50'
                  : 'bg-[#1C1914] text-[#AAA39A] border border-[#2D281F] hover:text-[#F8F5EF]'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span>Popular Picks</span>
            </button>
          </div>

          {/* Reset Filters */}
          {(selectedCategory !== 'all' || vegOnly || popularOnly || searchQuery) && (
            <button
              onClick={resetFilters}
              className="text-xs text-[#AAA39A] hover:text-[#D6A84F] flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6 text-xs text-[#AAA39A]">
        <span>
          Showing <strong className="text-[#F8F5EF]">{filteredDishes.length}</strong> items in catalogue
        </span>
        {selectedCategory !== 'all' && (
          <span className="capitalize text-[#D6A84F]">
            Category: {selectedCategory.replace('-', ' ')}
          </span>
        )}
      </div>

      {/* Product Grid */}
      {filteredDishes.length === 0 ? (
        <div className="py-20 text-center bg-[#14120F] border border-[#2A241A] rounded-2xl p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1F1C16] border border-[#D6A84F]/20 flex items-center justify-center text-[#AAA39A]">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#F8F5EF] mb-2">No Matching Dishes</h3>
          <p className="text-xs text-[#AAA39A] max-w-sm mx-auto mb-6">
            We couldn't find any dishes matching your current search or filter combination.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onQuickView={(d) => setSelectedQuickDish(d)}
            />
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
