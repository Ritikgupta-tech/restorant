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
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl bg-[#141311] border border-[#D6A84F]/30 rounded-2xl shadow-2xl p-6 overflow-hidden z-10 max-h-[85vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#2A261F] pb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#D6A84F]/10 border border-[#D6A84F]/20 text-[#D6A84F]">
                <Heart className="w-5 h-5 fill-[#D6A84F]" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#F8F5EF]">Your Favorite Dishes</h3>
                <p className="text-xs text-[#AAA39A]">
                  {wishlistDishes.length} {wishlistDishes.length === 1 ? 'item' : 'items'} saved in wishlist
                </p>
              </div>
            </div>

            <button
              onClick={closeWishlist}
              className="text-[#AAA39A] hover:text-[#F8F5EF] p-2 hover:bg-[#201D17] rounded-lg transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {wishlistDishes.length === 0 ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1F1C16] border border-[#D6A84F]/20 flex items-center justify-center text-[#AAA39A]">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-serif font-semibold text-[#F8F5EF] mb-1">Your wishlist is empty</h4>
                <p className="text-sm text-[#AAA39A] max-w-xs mx-auto mb-6">
                  Save your favorite dishes while browsing the menu for easy ordering later.
                </p>
                <Link
                  to="/menu"
                  onClick={closeWishlist}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] font-semibold text-sm hover:brightness-110 transition-all shadow-md"
                >
                  Browse Menu
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              wishlistDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="flex items-center gap-4 p-3 bg-[#1B1916] border border-[#2D281F] rounded-xl hover:border-[#D6A84F]/40 transition-all group"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <DietaryBadge isVeg={dish.isVeg} />
                      <h4 className="text-sm font-semibold text-[#F8F5EF] truncate">{dish.name}</h4>
                    </div>
                    <p className="text-xs text-[#D6A84F] font-bold">{formatCurrency(dish.price)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        addToCart(dish, 1);
                        closeWishlist();
                        openCart();
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D6A84F] text-[#0B0B0B] text-xs font-semibold hover:bg-[#F3DC9B] transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(dish.id)}
                      className="p-1.5 text-[#AAA39A] hover:text-red-400 hover:bg-[#251D1D] rounded-lg transition-colors"
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
            <div className="border-t border-[#2A261F] pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={clearWishlist}
                className="text-xs text-[#AAA39A] hover:text-red-400 transition-colors"
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
                  className="px-4 py-2 bg-[#D6A84F]/15 border border-[#D6A84F]/40 text-[#D6A84F] hover:bg-[#D6A84F] hover:text-[#0B0B0B] text-xs font-semibold rounded-xl transition-all"
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
