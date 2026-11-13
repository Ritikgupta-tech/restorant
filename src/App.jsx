import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ReservationProvider } from './context/ReservationContext';
import { Layout } from './components/layout/Layout';

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const MenuPage = lazy(() => import('./pages/MenuPage').then(m => ({ default: m.MenuPage })));
const DishDetailPage = lazy(() => import('./pages/DishDetailPage').then(m => ({ default: m.DishDetailPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const CartPage = lazy(() => import('./pages/CartPage').then(m => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage').then(m => ({ default: m.OrderSuccessPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Loading Fallback Spinner
const PageLoadingFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
    <div className="w-12 h-12 rounded-full border-2 border-[#2D271D] border-t-[#D6A84F] animate-spin mb-4" />
    <span className="text-xs uppercase tracking-[0.2em] text-[#D6A84F] font-semibold">
      The Sizzle Restaurant
    </span>
  </div>
);

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <ReservationProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route
                    path="/"
                    element={
                      <Suspense fallback={<PageLoadingFallback />}>
                        <HomePage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/menu"
                    element={
                      <Suspense fallback={<PageLoadingFallback />}>
                        <MenuPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/menu/:slug"
                    element={
                      <Suspense fallback={<PageLoadingFallback />}>
                        <DishDetailPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/about"
                    element={
                      <Suspense fallback={<PageLoadingFallback />}>
                        <AboutPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/gallery"
                    element={
                      <Suspense fallback={<PageLoadingFallback />}>
                        <GalleryPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/contact"
                    element={
                      <Suspense fallback={<PageLoadingFallback />}>
                        <ContactPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <Suspense fallback={<PageLoadingFallback />}>
                        <CartPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <Suspense fallback={<PageLoadingFallback />}>
                        <CheckoutPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/order-success"
                    element={
                      <Suspense fallback={<PageLoadingFallback />}>
                        <OrderSuccessPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/privacy"
                    element={
                      <Suspense fallback={<PageLoadingFallback />}>
                        <PrivacyPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/terms"
                    element={
                      <Suspense fallback={<PageLoadingFallback />}>
                        <TermsPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <Suspense fallback={<PageLoadingFallback />}>
                        <NotFoundPage />
                      </Suspense>
                    }
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </ReservationProvider>
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
}
