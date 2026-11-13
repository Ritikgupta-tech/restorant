import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UtensilsCrossed, ShoppingBag, Heart, Search, Menu as MenuIcon, X, Calendar, ChevronDown,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useReservation } from '../../context/ReservationContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'About', path: '/about' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar = ({ onOpenSearch }) => {
  const { totalItemsCount, openCart } = useCart();
  const { wishlistCount, openWishlist } = useWishlist();
  const { openReservation } = useReservation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 60);
      const docH = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (y / docH) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]">
        <div
          className="h-full bg-gradient-to-r from-[#D6A84F] via-[#F3DC9B] to-[#D6A84F] transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Navigation Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? 'bg-[#080807]/96 backdrop-blur-2xl border-b border-[#D6A84F]/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0" onClick={() => setMobileOpen(false)}>
              {/* Logo mark */}
              <div className="relative w-9 h-9 sm:w-10 sm:h-10">
                <div className="absolute inset-0 rounded-luxury bg-gradient-to-br from-[#D6A84F] to-[#7A5A1E] p-[1px]">
                  <div className="w-full h-full rounded-luxury bg-[#080807] flex items-center justify-center group-hover:bg-[#111009] transition-colors">
                    <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 text-[#D6A84F] transition-transform duration-500 group-hover:rotate-12" />
                  </div>
                </div>
              </div>
              {/* Brand text */}
              <div className="hidden xs:flex flex-col leading-none">
                <span className="font-luxury text-lg sm:text-xl font-semibold text-[#F5F0E8] tracking-tight">
                  The Sizzle
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-[#D6A84F] font-medium">
                  Restaurant & Lounge
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative text-[11px] uppercase tracking-[0.18em] font-medium transition-all duration-300 py-1 hover-underline-gold ${
                      isActive ? 'text-[#D6A84F]' : 'text-[#A09080] hover:text-[#F5F0E8]'
                    }`
                  }
                />
              ))}
            </nav>

            {/* Right: Icon Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Search */}
              <button
                onClick={onOpenSearch}
                aria-label="Search dishes"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-luxury text-[#A09080] hover:text-[#D6A84F] hover:bg-[#D6A84F]/8 border border-transparent hover:border-[#D6A84F]/25 transition-all duration-300"
              >
                <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </button>

              {/* Wishlist */}
              <button
                onClick={openWishlist}
                aria-label="Open Wishlist"
                className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-luxury text-[#A09080] hover:text-[#D6A84F] hover:bg-[#D6A84F]/8 border border-transparent hover:border-[#D6A84F]/25 transition-all duration-300"
              >
                <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={openCart}
                aria-label="Open Cart"
                className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-luxury text-[#D6A84F] hover:bg-[#D6A84F]/8 border border-transparent hover:border-[#D6A84F]/30 transition-all duration-300"
              >
                <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                <AnimatePresence>
                  {totalItemsCount > 0 && (
                    <motion.span
                      key="cart-count"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#D6A84F] text-[#080807] text-[9px] font-bold flex items-center justify-center"
                    >
                      {totalItemsCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Book a Table — Desktop Only */}
              <button
                onClick={openReservation}
                className="hidden sm:flex btn-luxury-primary ml-2 py-2.5 px-5 text-[10px]"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book a Table</span>
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle mobile menu"
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-luxury text-[#A09080] hover:text-[#F5F0E8] hover:bg-[#D6A84F]/8 border border-transparent hover:border-[#D6A84F]/20 transition-all ml-1"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <MenuIcon className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[#080807]/98 backdrop-blur-2xl"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-[#0C0B09] border-l border-[#D6A84F]/15 flex flex-col"
            >
              {/* Mobile menu header */}
              <div className="flex items-center justify-between p-6 border-b border-[#D6A84F]/10">
                <div className="font-luxury text-xl text-[#F5F0E8]">The Sizzle</div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-luxury border border-[#D6A84F]/25 text-[#A09080] hover:text-[#D6A84F]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex-1 overflow-y-auto py-6 px-6 space-y-1">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between py-4 border-b border-[#D6A84F]/8 group transition-all ${
                          isActive ? 'text-[#D6A84F]' : 'text-[#A09080] hover:text-[#F5F0E8]'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span className="font-luxury text-2xl font-light">{link.name}</span>
                          <ArrowRight className={`w-4 h-4 transition-all ${isActive ? 'text-[#D6A84F]' : 'opacity-0 group-hover:opacity-100'}`} />
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Footer Actions */}
              <div className="p-6 border-t border-[#D6A84F]/10 space-y-3">
                <button
                  onClick={() => { setMobileOpen(false); openReservation(); }}
                  className="btn-luxury-primary w-full"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Table</span>
                </button>
                <div className="flex items-center justify-center gap-2 text-[10px] text-[#706050]">
                  <span className="font-mono">+91 98765 43210</span>
                  <span>|</span>
                  <span>12pm–11:30pm Daily</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Need ArrowRight locally
const ArrowRight = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
