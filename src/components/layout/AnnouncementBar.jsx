import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ANNOUNCEMENTS } from '../../data/restaurantInfo';

export const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#1B160C] via-[#2D2312] to-[#1B160C] border-b border-[#D6A84F]/20 text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center justify-center gap-2 text-[#D6A84F] font-medium transition-all duration-500">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#F59E0B]" />
          <span>{ANNOUNCEMENTS[currentIndex]}</span>
        </div>

        <div className="flex items-center gap-4 text-[#AAA39A] text-[11px]">
          <span className="hidden md:inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#D6A84F]" />
            Dine-In: 12:00 PM – 11:30 PM
          </span>
          <Link
            to="/menu"
            className="inline-flex items-center gap-1 text-[#F8F5EF] hover:text-[#D6A84F] font-medium transition-colors"
          >
            Order Online
            <ChevronRight className="w-3 h-3 text-[#D6A84F]" />
          </Link>
        </div>
      </div>
    </div>
  );
};
