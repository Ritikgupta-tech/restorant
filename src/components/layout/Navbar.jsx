import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  UtensilsCrossed,
  ShoppingBag,
  Heart,
  Search,
  Menu as MenuIcon,
  X,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useReservation } from '../../context/ReservationContext';

export const Navbar = ({ onOpenSearch }) => {
  const { totalItemsCount, openCart } = useCart();
  const { wishlistCount, openWishlist } = useWishlist();
  const { openReservation } = useReservation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B0B0B]/95 backdrop-blur-md border-b border-[#D6A84F]/25 shadow-2xl py-3'
            : 'bg-gradient-to-b from-[#0B0B0B]/90 via-[#0B0B0B]/70 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D6A84F] to-[#8C6219] p-[1px] shadow-gold-sm">
                <div className="w-full h-full bg-[#110F0B] rounded-[11px] flex items-center justify-center group-hover:bg-[#18150E] transition-colors">
                  <UtensilsCrossed className="w-5 h-5 text-[#D6A84F] group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#F8F5EF] leading-tight">
                  The Sizzle
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D6A84F] font-medium">
                  Restaurant & Lounge
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs uppercase tracking-wider font-medium transition-all relative py-1 ${
                      isActive
                        ? 'text-[#D6A84F] font-semibold'
                        : 'text-[#AAA39A] hover:text-[#F8F5EF]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D6A84F] to-transparent" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Actions: Search, Wishlist, Cart, Book Table */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search dishes"
                className="p-2 sm:p-2.5 rounded-xl text-[#AAA39A] hover:text-[#F8F5EF] hover:bg-[#1A1814] border border-transparent hover:border-[#332D22] transition-colors"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={openWishlist}
                aria-label="Wishlist"
                className="relative p-2 sm:p-2.5 rounded-xl text-[#AAA39A] hover:text-[#F8F5EF] hover:bg-[#1A1814] border border-transparent hover:border-[#332D22] transition-colors"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={openCart}
                aria-label="Open Cart"
                className="relative p-2 sm:p-2.5 rounded-xl text-[#AAA39A] hover:text-[#F8F5EF] hover:bg-[#1A1814] border border-transparent hover:border-[#332D22] transition-colors"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#D6A84F]" />
                {totalItemsCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D6A84F] text-[#0B0B0B] text-[10px] font-bold flex items-center justify-center">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* Book a Table Desktop CTA */}
              <button
                type="button"
                onClick={openReservation}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all shadow-md ml-1"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book a Table</span>
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="lg:hidden p-2 text-[#AAA39A] hover:text-[#F8F5EF] rounded-xl hover:bg-[#1A1814]"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-[#D6A84F]/30 bg-[#110F0C] px-5 py-6 space-y-4">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-sm uppercase tracking-wider font-semibold py-2 px-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#D6A84F]/15 text-[#D6A84F] border border-[#D6A84F]/30'
                        : 'text-[#AAA39A] hover:text-[#F8F5EF] hover:bg-[#1A1713]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <div className="pt-3 border-t border-[#29241B] flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openReservation();
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Table</span>
              </button>

              <div className="flex items-center justify-between text-xs text-[#AAA39A] px-2 pt-2">
                <span>Direct Hotline:</span>
                <span className="text-[#D6A84F] font-mono">+91 98765 43210</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
