import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Camera,
  Maximize2,
  Eye,
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/gallery';
import { Reveal } from '../components/common/ScrollReveal';

export const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filters = [
    { id: 'all', label: 'All Photographs' },
    { id: 'food', label: 'Cast Iron & Sizzles' },
    { id: 'ambience', label: 'Dining Ambience' },
    { id: 'interior', label: 'Velvet Salons' },
    { id: 'experience', label: 'Culinary Craft' },
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
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <Reveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6A84F]/10 border border-[#D6A84F]/30 text-[#D6A84F] text-[11px] font-semibold uppercase tracking-[0.25em] mb-4">
          <Camera className="w-3.5 h-3.5" />
          <span>Visual Odyssey</span>
        </div>
        <h1 className="font-luxury text-4xl sm:text-6xl md:text-7xl font-light text-[#F5F0E8] tracking-wide mb-4">
          The Sizzle <span className="italic font-normal text-gradient-gold">Gallery</span>
        </h1>
        <p className="text-sm sm:text-base text-[#A09080] font-light leading-relaxed max-w-2xl mx-auto">
          Atmospheric glimpses of our champagne-lit salons, tableside cast iron theatricals, and masterfully plated culinary creations. Click to expand in high definition.
        </p>
      </Reveal>

      {/* Filter Tabs */}
      <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-4 mb-12 scrollbar-none no-scrollbar">
        {filters.map((f) => {
          const isActive = activeFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] whitespace-nowrap transition-all border ${
                isActive
                  ? 'border-[#D6A84F] bg-[#D6A84F]/10 text-[#F5F0E8] shadow-[0_0_20px_rgba(214,168,79,0.15)] font-semibold'
                  : 'border-[#221F1A] bg-[#12110F] text-[#8A7E72] hover:text-[#E0D7CB] hover:border-[#3E382E]'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.4) }}
            onClick={() => setLightboxIndex(idx)}
            className="group relative aspect-[4/3] overflow-hidden border border-[#221F1A] hover:border-[#D6A84F]/60 bg-[#12100E] cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D6A84F] font-semibold block mb-1">
                {item.category}
              </span>
              <h3 className="font-luxury text-2xl font-light text-[#F5F0E8]">
                {item.title}
              </h3>
              <p className="text-xs text-[#A09080] font-light line-clamp-2 mt-1">
                {item.description}
              </p>
            </div>

            <div className="absolute top-4 right-4 p-2.5 bg-black/70 text-[#8A7E72] group-hover:text-[#D6A84F] border border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-4 h-4" />
            </div>
          </motion.div>
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
              className="fixed inset-0 bg-black/95 backdrop-blur-xl"
            />

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center z-10"
            >
              {/* Controls bar */}
              <div className="w-full flex items-center justify-between text-xs text-[#8A7E72] mb-3 px-2">
                <span className="font-mono text-[#D6A84F] uppercase tracking-[0.2em]">
                  {filteredItems[lightboxIndex].category} • {lightboxIndex + 1} of {filteredItems.length}
                </span>

                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 text-[#8A7E72] hover:text-[#F5F0E8] hover:bg-[#1A1814] border border-transparent hover:border-[#2B251B] transition-colors"
                  aria-label="Close lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Image with Prev/Next Buttons */}
              <div className="relative w-full overflow-hidden border border-[#D6A84F]/30 bg-black max-h-[75vh] flex items-center justify-center">
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3.5 bg-black/70 hover:bg-[#D6A84F] text-[#F5F0E8] hover:text-[#080807] border border-white/10 backdrop-blur-md transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Next Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3.5 bg-black/70 hover:bg-[#D6A84F] text-[#F5F0E8] hover:text-[#080807] border border-white/10 backdrop-blur-md transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Caption */}
              <div className="w-full text-center mt-4">
                <h3 className="font-luxury text-2xl font-light text-[#F5F0E8]">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <p className="text-xs text-[#8A7E72] max-w-lg mx-auto mt-1 font-light">
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
