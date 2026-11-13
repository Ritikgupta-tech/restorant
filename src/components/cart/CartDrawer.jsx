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
          className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-screen max-w-md bg-[#0F0E0D] border-l border-[#D6A84F]/30 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#221F1A] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#181512] border border-[#D6A84F]/30 text-[#D6A84F]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-luxury text-2xl font-light text-[#F5F0E8]">Dining Selection</h3>
                  <p className="text-[11px] text-[#8A7E72] font-mono">
                    {items.length} {items.length === 1 ? 'delicacy' : 'delicacies'} curated
                  </p>
                </div>
              </div>

              <button
                onClick={closeCart}
                className="p-2 text-[#8A7E72] hover:text-[#F5F0E8] hover:bg-[#1A1815] transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Delivery Bar */}
            {items.length > 0 && (
              <div className="bg-[#141210] px-5 py-3 border-b border-[#1E1B15] text-xs">
                {totals.isFreeDelivery ? (
                  <p className="text-emerald-400 font-medium flex items-center gap-2 text-[11px] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span>Complimentary Gourmet Delivery Unlocked</span>
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    <p className="text-[#8A7E72] text-[11px] font-light">
                      Add <span className="text-gradient-gold font-mono font-medium">{formatCurrency(totals.amountForFreeDelivery)}</span> more for complimentary delivery
                    </p>
                    <div className="w-full bg-[#1F1C18] h-[3px] overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#D6A84F] to-[#F59E0B] h-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (totals.subtotal / 500) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Items list */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-none">
              {items.length === 0 ? (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-[#141210] border border-[#2B251B] flex items-center justify-center text-[#8A7E72]">
                    <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
                  </div>
                  <h4 className="font-luxury text-2xl font-light text-[#F5F0E8] mb-2">Cart is Empty</h4>
                  <p className="text-xs text-[#8A7E72] font-light max-w-xs mx-auto mb-6">
                    Savor handcrafted dishes from our authentic clay ovens and cast iron sizzle grills.
                  </p>
                  <Link
                    to="/menu"
                    onClick={closeCart}
                    className="btn-luxury-primary px-6 py-3 text-xs tracking-[0.2em] inline-flex items-center gap-2"
                  >
                    <span>Browse Food Menu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3.5 p-3.5 bg-[#12100E] border border-[#221F1A] hover:border-[#D6A84F]/40 transition-all group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover flex-shrink-0 border border-[#26221A]"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <div className="flex items-center gap-1.5 truncate">
                            <DietaryBadge isVeg={item.isVeg} />
                            <h4 className="font-luxury text-base font-light text-[#F5F0E8] truncate">
                              {item.name}
                            </h4>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#6A6258] hover:text-red-400 p-1 transition-colors"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-gradient-gold font-mono font-medium">
                          {formatCurrency(item.price)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1C1A16]">
                        <QuantitySelector
                          size="sm"
                          quantity={item.quantity}
                          onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                          onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                        />
                        <span className="text-xs font-mono font-semibold text-[#F5F0E8]">
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
              <div className="p-5 border-t border-[#221F1A] bg-[#0C0B0A] space-y-4">
                {/* Coupon Code Input */}
                {couponCode ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#D6A84F]/10 border border-[#D6A84F]/30 text-xs">
                    <div className="flex items-center gap-2 text-[#D6A84F] font-semibold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code: {couponCode}</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-[#8A7E72] hover:text-red-400 underline uppercase tracking-wider"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#6A6258]" />
                      <input
                        type="text"
                        placeholder="Voucher: SIZZLE20"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-[#060505] border border-[#24201A] focus:border-[#D6A84F] focus:outline-none text-xs text-[#F5F0E8] uppercase placeholder:normal-case placeholder-[#554E44]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#181613] hover:bg-[#D6A84F] hover:text-[#080807] text-xs font-semibold text-[#F5F0E8] border border-[#2E281F] transition-all uppercase tracking-wider"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#8A7E72]">
                    <span>Dishes Subtotal</span>
                    <span className="font-mono text-[#F5F0E8]">{formatCurrency(totals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#8A7E72]">
                    <span>Delivery (Demo)</span>
                    <span className={totals.isFreeDelivery ? 'text-emerald-400 font-semibold' : 'font-mono text-[#F5F0E8]'}>
                      {totals.isFreeDelivery ? 'COMPLIMENTARY' : formatCurrency(totals.deliveryFee)}
                    </span>
                  </div>
                  {totals.discount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Voucher Savings</span>
                      <span className="font-mono">-{formatCurrency(totals.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#8A7E72]">
                    <span>Taxes & Eco Packaging (5% Demo)</span>
                    <span className="font-mono text-[#F5F0E8]">{formatCurrency(totals.demoTax + totals.packagingFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#F5F0E8] pt-2 border-t border-[#1E1B15]">
                    <span className="uppercase tracking-wider text-xs font-semibold text-[#8A7E72]">Total Amount</span>
                    <span className="font-luxury text-2xl font-normal text-gradient-gold">{formatCurrency(totals.grandTotal)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button
                    onClick={handleProceedCheckout}
                    className="btn-luxury-primary w-full py-3.5 text-xs tracking-[0.2em] flex items-center justify-center gap-2"
                  >
                    <span>Proceed To Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link
                    to="/cart"
                    onClick={closeCart}
                    className="block text-center py-1.5 text-xs uppercase tracking-wider text-[#8A7E72] hover:text-[#D6A84F] transition-colors"
                  >
                    View Complete Cart Page →
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
