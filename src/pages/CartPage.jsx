import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Tag,
  ShieldCheck,
  Sparkles,
  Info,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';
import { QuantitySelector } from '../components/common/QuantitySelector';
import { DietaryBadge } from '../components/common/Badge';
import { Reveal } from '../components/common/ScrollReveal';

export const CartPage = () => {
  const {
    items,
    totals,
    updateQuantity,
    removeFromCart,
    clearCart,
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

  if (items.length === 0) {
    return (
      <div className="py-24 sm:py-32 max-w-xl mx-auto px-4 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-[#12100E] border border-[#D6A84F]/30 flex items-center justify-center text-[#D6A84F]">
          <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h1 className="font-luxury text-3xl sm:text-4xl font-light text-[#F5F0E8] mb-3">
          Your Dining Cart Is Empty
        </h1>
        <p className="text-xs sm:text-sm text-[#8A7E72] font-light leading-relaxed max-w-sm mx-auto mb-8">
          No culinary delicacies have been selected yet. Browse our handcrafted reserve catalogue to assemble your feast.
        </p>
        <Link
          to="/menu"
          className="btn-luxury-primary px-8 py-3.5 text-xs tracking-[0.2em] inline-flex items-center gap-2"
        >
          <span>Explore Food Menu</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <Reveal className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#1E1B15]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D6A84F] font-semibold block mb-1">
            Order Review
          </span>
          <h1 className="font-luxury text-3xl sm:text-5xl font-light text-[#F5F0E8]">
            Your Dining <span className="italic text-gradient-gold">Selection</span>
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-[#8A7E72] hover:text-red-400 transition-colors flex items-center gap-1.5 uppercase tracking-wider"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All Dishes</span>
        </button>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-[#12100E] border border-[#221F1A] hover:border-[#D6A84F]/40 transition-all shadow-[0_5px_20px_rgba(0,0,0,0.5)]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover flex-shrink-0 border border-[#2B251B]"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <DietaryBadge isVeg={item.isVeg} />
                  <Link
                    to={`/menu/${item.slug}`}
                    className="font-luxury text-xl font-light text-[#F5F0E8] hover:text-[#D6A84F] transition-colors truncate"
                  >
                    {item.name}
                  </Link>
                </div>
                <p className="text-xs text-[#8A7E72] font-light line-clamp-1 mb-2">{item.description}</p>
                <div className="text-xs text-gradient-gold font-mono font-medium">
                  {formatCurrency(item.price)} each
                </div>
              </div>

              {/* Quantity selector & total */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-[#1E1B15]">
                <QuantitySelector
                  quantity={item.quantity}
                  onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                  onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                />

                <div className="text-right min-w-[90px]">
                  <span className="font-luxury text-xl font-normal text-gradient-gold block">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-[#6A6258] hover:text-red-400 p-2 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Continue Shopping Link */}
          <div className="pt-4">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8A7E72] hover:text-[#D6A84F] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Add More Delicacies</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary Receipt Card */}
        <div className="bg-[#12100E] border border-[#26221B] p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.6)] space-y-6">
          <h2 className="font-luxury text-2xl font-light text-[#F5F0E8] border-b border-[#1E1B15] pb-4">
            Order Summary
          </h2>

          {/* Promo Code Input */}
          <div>
            <label className="block text-[10px] font-semibold text-[#8A7E72] mb-2 uppercase tracking-[0.2em]">
              Privilege Voucher
            </label>
            {couponCode ? (
              <div className="flex items-center justify-between p-3 bg-[#D6A84F]/10 border border-[#D6A84F]/40 text-xs">
                <div className="flex items-center gap-2 text-[#D6A84F] font-semibold">
                  <Tag className="w-4 h-4" />
                  <span>{couponCode} Applied</span>
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
                <input
                  type="text"
                  placeholder="Code: SIZZLE20 or FIRSTBITE"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="flex-1 bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none px-3 py-2 text-xs text-[#F5F0E8] uppercase placeholder:normal-case placeholder-[#5A5247]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1A1815] hover:bg-[#D6A84F] hover:text-[#080807] text-xs font-semibold text-[#F5F0E8] border border-[#3A3326] transition-all uppercase tracking-wider"
                >
                  Apply
                </button>
              </form>
            )}
          </div>

          {/* Fee Breakdown */}
          <div className="space-y-3 text-xs border-y border-[#1E1B15] py-4">
            <div className="flex justify-between text-[#8A7E72]">
              <span>Dishes Subtotal</span>
              <span className="text-[#F5F0E8] font-mono">{formatCurrency(totals.subtotal)}</span>
            </div>

            <div className="flex justify-between text-[#8A7E72]">
              <span>Delivery Courtesy (Demo)</span>
              <span className={totals.isFreeDelivery ? 'text-emerald-400 font-semibold' : 'text-[#F5F0E8] font-mono'}>
                {totals.isFreeDelivery ? 'COMPLIMENTARY' : formatCurrency(totals.deliveryFee)}
              </span>
            </div>

            <div className="flex justify-between text-[#8A7E72]">
              <span>Demo Restaurant GST (5%)</span>
              <span className="text-[#F5F0E8] font-mono">{formatCurrency(totals.demoTax)}</span>
            </div>

            <div className="flex justify-between text-[#8A7E72]">
              <span>Eco Thermal Packaging</span>
              <span className="text-[#F5F0E8] font-mono">{formatCurrency(totals.packagingFee)}</span>
            </div>

            {totals.discount > 0 && (
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Voucher Privileges</span>
                <span className="font-mono">-{formatCurrency(totals.discount)}</span>
              </div>
            )}
          </div>

          {/* Grand Total */}
          <div className="flex items-baseline justify-between">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8A7E72]">Grand Total</span>
            <div className="text-right">
              <span className="font-luxury text-3xl sm:text-4xl font-normal text-gradient-gold block">
                {formatCurrency(totals.grandTotal)}
              </span>
              <span className="text-[10px] text-[#6A6258] font-mono">Demo taxes & fees included</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            onClick={() => navigate('/checkout')}
            className="btn-luxury-primary w-full py-4 text-xs tracking-[0.2em] flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Prototype Disclosure */}
          <div className="p-3 bg-[#0A0908] border border-[#221E17] text-[11px] text-[#6A6258] flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-[#D6A84F] flex-shrink-0 mt-0.5" />
            <span className="font-light">
              This checkout is a frontend simulation. No actual payment gateway will charge your account.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
