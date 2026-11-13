import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { calculateOrderTotals } from '../utils/formatters';
import { useToast } from './ToastContext';

const CART_STORAGE_KEY = 'the_sizzle_cart_v1';
const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { addToast } = useToast();
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState(() => {
    try {
      return localStorage.getItem('the_sizzle_coupon_v1') || '';
    } catch {
      return '';
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (couponCode) {
        localStorage.setItem('the_sizzle_coupon_v1', couponCode);
      } else {
        localStorage.removeItem('the_sizzle_coupon_v1');
      }
    } catch (e) {
      console.error('Failed to save coupon to localStorage:', e);
    }
  }, [couponCode]);

  // Derived totals
  const totals = useMemo(() => {
    return calculateOrderTotals(items, couponCode);
  }, [items, couponCode]);

  const totalItemsCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const addToCart = (dish, quantity = 1, showToast = true) => {
    if (!dish || quantity <= 0) return;

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === dish.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { ...dish, quantity }];
    });

    if (showToast) {
      addToast(`Added "${dish.name}" (×${quantity}) to your order`, 'success');
    }
  };

  const updateQuantity = (dishId, newQty) => {
    if (newQty < 1) return; // Prevent quantity <= 0 per section 8 requirement
    setItems((prev) =>
      prev.map((item) => (item.id === dishId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (dishId) => {
    const itemToRemove = items.find((i) => i.id === dishId);
    setItems((prev) => prev.filter((item) => item.id !== dishId));
    if (itemToRemove) {
      addToast(`Removed "${itemToRemove.name}" from cart`, 'info');
    }
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem('the_sizzle_coupon_v1');
    } catch (e) {
      console.error(e);
    }
  };

  const applyCoupon = (code) => {
    const upper = code.trim().toUpperCase();
    if (upper === 'SIZZLE20') {
      setCouponCode(upper);
      addToast('Promo "SIZZLE20" applied! 20% discount granted.', 'success');
      return { success: true, message: '20% discount applied!' };
    } else if (upper === 'FIRSTBITE') {
      setCouponCode(upper);
      addToast('Promo "FIRSTBITE" applied! 15% discount granted.', 'success');
      return { success: true, message: '15% discount applied!' };
    } else {
      addToast('Invalid or expired coupon code. Try "SIZZLE20"', 'error');
      return { success: false, message: 'Invalid coupon code' };
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    addToast('Coupon code removed', 'info');
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItemsCount,
        totals,
        couponCode,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
