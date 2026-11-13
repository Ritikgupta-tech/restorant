import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { DemoNoticeBanner } from '../common/DemoNoticeBanner';
import { AnnouncementBar } from './AnnouncementBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from '../cart/CartDrawer';
import { WishlistModal } from '../common/WishlistModal';
import { ReservationModal } from '../reservation/ReservationModal';
import { ReservationSuccessModal } from '../reservation/ReservationSuccessModal';
import { SearchModal } from '../common/SearchModal';

export const Layout = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F8F5EF] flex flex-col antialiased selection:bg-[#D6A84F] selection:text-[#0B0B0B]">
      <DemoNoticeBanner />
      <AnnouncementBar />
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <WishlistModal />
      <ReservationModal />
      <ReservationSuccessModal />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};
