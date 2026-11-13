import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock, ChevronRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ANNOUNCEMENTS, RESTAURANT_INFO } from '../../data/restaurantInfo';

export const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative z-50 bg-[#0C0B0A] border-b border-[#D6A84F]/20 text-xs py-2 px-4 overflow-hidden">
      {/* Subtle gold shimmer line on top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D6A84F]/40 to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Live Announcement with smooth AnimatePresence */}
        <div className="flex items-center gap-2.5 overflow-hidden h-5">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#D6A84F]/10 border border-[#D6A84F]/30 text-[#D6A84F] text-[10px] font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
            Special
          </span>

          <AnimatePresence mode="wait">
            <motion.span
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-[#E7DFD5] text-[11px] sm:text-xs font-light tracking-wide truncate max-w-[280px] sm:max-w-md"
            >
              {ANNOUNCEMENTS[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Right: Hours & Quick Order Action */}
        <div className="flex items-center gap-4 text-[11px] text-[#A09585]">
          <span className="hidden md:inline-flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-[#D6A84F]" />
            <span>Salon & Dining: 12:00 PM – 11:30 PM</span>
          </span>

          <span className="hidden lg:inline text-[#3A3326]">•</span>

          <span className="hidden lg:inline-flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-[#D6A84F]" />
            <span className="font-mono text-[#C4B9AA]">{RESTAURANT_INFO.phone}</span>
          </span>

          <Link
            to="/menu"
            className="group inline-flex items-center gap-1 text-[#D6A84F] hover:text-[#F3DC9B] font-medium transition-colors"
          >
            <span>Reserve Feast</span>
            <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
