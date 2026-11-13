import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import { DietaryBadge } from './Badge';

export const WishlistModal = () => {
  const { wishlistDishes, isWishlistModalOpen, closeWishlist, toggleWishlist, clearWishlist } = useWishlist();
  const { addToCart, openCart } = useCart();

  if (!isWishlistModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeWishlist}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-xl bg-[#0F0E0D] border border-[#D6A84F]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 overflow-hidden z-10 max-h-[85vh] flex flex-col"
        >
          {/* Gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D6A84F] to-transparent" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#221F1A] pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#181512] border border-[#D6A84F]/30 text-[#D6A84F]">
                <Heart className="w-5 h-5 fill-[#D6A84F]" />
              </div>
              <div>
                <h3 className="font-luxury text-2xl font-light text-[#F5F0E8]">Saved Delicacies</h3>
                <p className="text-[11px] text-[#8A7E72] font-mono">
                  {wishlistDishes.length} {wishlistDishes.length === 1 ? 'dish' : 'dishes'} in your favorites
                </p>
              </div>
            </div>

            <button
              onClick={closeWishlist}
              className="text-[#8A7E72] hover:text-[#F5F0E8] p-2 hover:bg-[#1A1814] transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3 scrollbar-none">
            {wishlistDishes.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#141210] border border-[#221F1A] flex items-center justify-center text-[#8A7E72]">
                  <Heart className="w-7 h-7" />
                </div>
                <h4 className="font-luxury text-2xl font-light text-[#F5F0E8] mb-1">Your Wishlist is Empty</h4>
                <p className="text-xs text-[#8A7E72] font-light max-w-xs mx-auto mb-6">
                  Save your favorite dishes while browsing the menu for easy ordering later.
                </p>
                <Link
                  to="/menu"
                  onClick={closeWishlist}
                  className="btn-luxury-primary px-6 py-3 text-xs tracking-[0.2em] inline-flex items-center gap-2"
                >
                  <span>Browse Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              wishlistDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="flex items-center gap-4 p-3.5 bg-[#12100E] border border-[#221F1A] hover:border-[#D6A84F]/40 transition-all group"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-16 h-16 object-cover flex-shrink-0 border border-[#26221A]"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <DietaryBadge isVeg={dish.isVeg} />
                      <h4 className="font-luxury text-base font-light text-[#F5F0E8] truncate">{dish.name}</h4>
                    </div>
                    <p className="text-xs font-mono font-medium text-gradient-gold">{formatCurrency(dish.price)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        addToCart(dish, 1);
                        closeWishlist();
                        openCart();
                      }}
                      className="btn-luxury-primary px-3 py-1.5 text-xs tracking-wider flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(dish.id)}
                      className="p-1.5 text-[#6A6258] hover:text-red-400 transition-colors"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistDishes.length > 0 && (
            <div className="border-t border-[#221F1A] pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={clearWishlist}
                className="text-xs text-[#8A7E72] hover:text-red-400 transition-colors uppercase tracking-wider"
              >
                Clear all favorites
              </button>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    wishlistDishes.forEach((d) => addToCart(d, 1, false));
                    closeWishlist();
                    openCart();
                  }}
                  className="btn-luxury-outline px-4 py-2 text-xs tracking-[0.15em]"
                >
                  Add All to Cart
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
