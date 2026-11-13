import React, { createContext, useContext, useState, useEffect } from 'react';
import { DISHES } from '../data/dishes';
import { useToast } from './ToastContext';

const WISHLIST_STORAGE_KEY = 'the_sizzle_wishlist_v1';
const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { addToast } = useToast();
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse wishlist:', e);
      return [];
    }
  });

  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch (e) {
      console.error('Failed to save wishlist:', e);
    }
  }, [wishlistIds]);

  const toggleWishlist = (dishId) => {
    const dish = DISHES.find((d) => d.id === dishId);
    setWishlistIds((prev) => {
      if (prev.includes(dishId)) {
        addToast(`Removed "${dish?.name || 'Item'}" from your favorites`, 'info');
        return prev.filter((id) => id !== dishId);
      } else {
        addToast(`Added "${dish?.name || 'Item'}" to your favorites!`, 'success');
        return [...prev, dishId];
      }
    });
  };

  const isInWishlist = (dishId) => wishlistIds.includes(dishId);

  const clearWishlist = () => {
    setWishlistIds([]);
    try {
      localStorage.removeItem(WISHLIST_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    addToast('Wishlist cleared', 'info');
  };

  const wishlistDishes = DISHES.filter((d) => wishlistIds.includes(d.id));

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistCount: wishlistIds.length,
        wishlistDishes,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        isWishlistModalOpen,
        openWishlist: () => setIsWishlistModalOpen(true),
        closeWishlist: () => setIsWishlistModalOpen(false),
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
