import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight, Trash2, Tag, Check, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import { QuantitySelector } from '../common/QuantitySelector';
import { DietaryBadge } from '../common/Badge';

export const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    totals,
    couponCode,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  const handleProceedCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCart}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="w-screen max-w-md bg-[#12100E] border-l border-[#D6A84F]/30 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#2A241A] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#D6A84F]/10 border border-[#D6A84F]/20 text-[#D6A84F]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#F8F5EF]">Your Order Cart</h3>
                  <p className="text-xs text-[#AAA39A]">
                    {items.length} {items.length === 1 ? 'dish' : 'dishes'} selected
                  </p>
                </div>
              </div>

              <button
                onClick={closeCart}
                className="p-2 rounded-lg text-[#AAA39A] hover:text-[#F8F5EF] hover:bg-[#1E1B15] transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Delivery Bar */}
            {items.length > 0 && (
              <div className="bg-[#191611] px-5 py-2.5 border-b border-[#2A241A] text-xs">
                {totals.isFreeDelivery ? (
                  <p className="text-emerald-400 font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D6A84F]" />
                    Simulated Free Gourmet Delivery Unlocked!
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    <p className="text-[#AAA39A] text-[11px]">
                      Add <span className="text-[#D6A84F] font-bold">{formatCurrency(totals.amountForFreeDelivery)}</span> more for Free Delivery
                    </p>
                    <div className="w-full bg-[#27231B] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#D6A84F] h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (totals.subtotal / 500) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Items list */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#1A1814] border border-[#D6A84F]/20 flex items-center justify-center text-[#AAA39A]">
                    <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#F8F5EF] mb-2">Your Cart is Empty</h4>
                  <p className="text-xs text-[#AAA39A] max-w-xs mx-auto mb-6">
                    Explore our menu and savor handcrafted culinary masterpieces.
                  </p>
                  <Link
                    to="/menu"
                    onClick={closeCart}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
                  >
                    Explore Food Menu
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 bg-[#171512] border border-[#2B261D] rounded-xl hover:border-[#D6A84F]/40 transition-all group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-18 h-18 w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <div className="flex items-center gap-1.5 truncate">
                            <DietaryBadge isVeg={item.isVeg} />
                            <h4 className="text-sm font-semibold text-[#F8F5EF] truncate">
                              {item.name}
                            </h4>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#888176] hover:text-red-400 p-1 transition-colors"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-[#D6A84F] font-bold">
                          {formatCurrency(item.price)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#262118]">
                        <QuantitySelector
                          size="sm"
                          quantity={item.quantity}
                          onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                          onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                        />
                        <span className="text-xs font-semibold text-[#F8F5EF]">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-5 border-t border-[#2A241A] bg-[#14120F] space-y-4">
                {/* Coupon Code Input */}
                {couponCode ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#D6A84F]/10 border border-[#D6A84F]/30 text-xs">
                    <div className="flex items-center gap-2 text-[#D6A84F] font-semibold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code applied: {couponCode}</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-[#AAA39A] hover:text-red-400 underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#AAA39A]" />
                      <input
                        type="text"
                        placeholder="Coupon code (try SIZZLE20)"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-[#1B1916] border border-[#332D23] focus:border-[#D6A84F] focus:outline-none rounded-xl text-xs text-[#F8F5EF] uppercase placeholder:normal-case placeholder-[#666056]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#26221A] hover:bg-[#D6A84F] hover:text-[#0B0B0B] text-xs font-semibold rounded-xl text-[#F8F5EF] border border-[#3A3326] transition-all"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#AAA39A]">
                    <span>Subtotal</span>
                    <span>{formatCurrency(totals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#AAA39A]">
                    <span>Delivery (Demo)</span>
                    <span>{totals.deliveryFee === 0 ? 'Free' : formatCurrency(totals.deliveryFee)}</span>
                  </div>
                  {totals.discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount</span>
                      <span>-{formatCurrency(totals.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#AAA39A]">
                    <span>Taxes & Packaging (5% Demo)</span>
                    <span>{formatCurrency(totals.demoTax + totals.packagingFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#F8F5EF] pt-2 border-t border-[#2A241A]">
                    <span>Total Amount</span>
                    <span className="text-[#D6A84F] font-serif text-base">{formatCurrency(totals.grandTotal)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button
                    onClick={handleProceedCheckout}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.99] transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Proceed To Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link
                    to="/cart"
                    onClick={closeCart}
                    className="block text-center py-2 text-xs text-[#AAA39A] hover:text-[#D6A84F] transition-colors"
                  >
                    View detailed shopping cart page
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
