import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Camera,
  Maximize2,
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/gallery';

export const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filters = [
    { id: 'all', label: 'All Photos' },
    { id: 'food', label: 'Food & Sizzles' },
    { id: 'ambience', label: 'Dining Ambience' },
    { id: 'interior', label: 'Interiors & Bar' },
    { id: 'experience', label: 'Chef Experience' },
  ];

  const filteredItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D6A84F] block mb-2">
          Visual Journey
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F8F5EF] mb-3">
          Restaurant & Food Gallery
        </h1>
        <p className="text-sm text-[#AAA39A] leading-relaxed">
          Glimpses of our champagne-lit dining halls, tableside sizzles, and masterfully plated culinary creations. Click any photograph to expand in high-definition lightbox.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              activeFilter === f.id
                ? 'bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] font-bold shadow-md'
                : 'bg-[#151310] text-[#AAA39A] border border-[#2B251B] hover:text-[#F8F5EF] hover:border-[#D6A84F]/40'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setLightboxIndex(idx)}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#2B251B] hover:border-[#D6A84F]/60 bg-[#161411] cursor-pointer shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
              <span className="text-[11px] uppercase tracking-wider text-[#D6A84F] font-semibold">
                {item.category}
              </span>
              <h3 className="font-serif text-lg font-bold text-[#F8F5EF] mt-0.5">
                {item.title}
              </h3>
              <p className="text-xs text-[#AAA39A] line-clamp-2 mt-1">
                {item.description}
              </p>
            </div>

            <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-[#AAA39A] group-hover:text-[#F8F5EF] backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <AnimatePresence>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 bg-black/95 backdrop-blur-md"
            />

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center z-10"
            >
              {/* Controls bar */}
              <div className="w-full flex items-center justify-between text-xs text-[#AAA39A] mb-3 px-2">
                <span className="font-medium text-[#D6A84F] uppercase tracking-wider">
                  {filteredItems[lightboxIndex].category} • {lightboxIndex + 1} of {filteredItems.length}
                </span>

                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 text-[#AAA39A] hover:text-[#F8F5EF] hover:bg-[#201D17] rounded-full transition-colors"
                  aria-label="Close lightbox"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Main Image with Prev/Next Buttons */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#D6A84F]/30 bg-black max-h-[75vh] flex items-center justify-center">
                <img
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />

                {/* Prev Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#D6A84F] text-[#F8F5EF] hover:text-[#0B0B0B] backdrop-blur-md transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Next Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#D6A84F] text-[#F8F5EF] hover:text-[#0B0B0B] backdrop-blur-md transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Caption */}
              <div className="w-full text-center mt-4">
                <h3 className="font-serif text-xl font-bold text-[#F8F5EF]">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <p className="text-xs text-[#AAA39A] max-w-lg mx-auto mt-1">
                  {filteredItems[lightboxIndex].description}
                </p>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};
