import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
      <div className="py-24 max-w-2xl mx-auto px-4 text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#181511] border border-[#D6A84F]/30 flex items-center justify-center text-[#AAA39A]">
          <ShoppingBag className="w-12 h-12 stroke-[1.5]" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#F8F5EF] mb-3">Your Cart is Empty</h1>
        <p className="text-sm text-[#AAA39A] leading-relaxed max-w-md mx-auto mb-8">
          You haven't added any culinary dishes yet. Explore our handcrafted menu to build your feast.
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold-sm transition-all"
        >
          <span>Explore Food Menu</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#262118]">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8F5EF]">
            Shopping Cart
          </h1>
          <p className="text-xs text-[#AAA39A] mt-1">
            Review your order before proceeding to simulated checkout.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-[#AAA39A] hover:text-red-400 transition-colors flex items-center gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear entire cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 bg-[#151310] border border-[#2B251B] hover:border-[#D6A84F]/40 rounded-2xl transition-all"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <DietaryBadge isVeg={item.isVeg} />
                  <Link
                    to={`/menu/${item.slug}`}
                    className="font-serif text-base sm:text-lg font-bold text-[#F8F5EF] hover:text-[#D6A84F] transition-colors truncate"
                  >
                    {item.name}
                  </Link>
                </div>
                <p className="text-xs text-[#AAA39A] line-clamp-1 mb-2">{item.description}</p>
                <div className="text-xs text-[#D6A84F] font-bold">
                  {formatCurrency(item.price)} each
                </div>
              </div>

              {/* Quantity selector & total */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#221E18]">
                <QuantitySelector
                  quantity={item.quantity}
                  onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                  onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                />

                <div className="text-right min-w-[80px]">
                  <span className="font-serif text-base font-bold text-[#F8F5EF] block">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-[#AAA39A] hover:text-red-400 hover:bg-[#251A1A] rounded-lg transition-colors"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-4 flex items-center justify-between">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D6A84F] hover:text-[#F3DC9B] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="bg-[#14120E] border border-[#2B251B] rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#F8F5EF] border-b border-[#252018] pb-4">
            Order Summary
          </h2>

          {/* Promo Code Input */}
          <div>
            <label className="block text-xs font-semibold text-[#AAA39A] mb-2 uppercase tracking-wider">
              Have a Promo Code?
            </label>
            {couponCode ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#D6A84F]/10 border border-[#D6A84F]/30 text-xs">
                <div className="flex items-center gap-2 text-[#D6A84F] font-semibold">
                  <Tag className="w-4 h-4" />
                  <span>{couponCode} Applied</span>
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
                <input
                  type="text"
                  placeholder="Code: SIZZLE20 or FIRSTBITE"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="flex-1 bg-[#1C1914] border border-[#332C20] focus:border-[#D6A84F] focus:outline-none rounded-xl px-3 py-2 text-xs text-[#F8F5EF] uppercase placeholder:normal-case placeholder-[#6A6357]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#252017] hover:bg-[#D6A84F] hover:text-[#0B0B0B] text-xs font-bold rounded-xl text-[#F8F5EF] border border-[#3A3326] transition-all"
                >
                  Apply
                </button>
              </form>
            )}
          </div>

          {/* Fee Breakdown */}
          <div className="space-y-3 text-xs border-y border-[#252018] py-4">
            <div className="flex justify-between text-[#AAA39A]">
              <span>Item Subtotal</span>
              <span className="text-[#F8F5EF] font-medium">{formatCurrency(totals.subtotal)}</span>
            </div>

            <div className="flex justify-between text-[#AAA39A]">
              <span>Delivery Fee (Demo)</span>
              <span className={totals.isFreeDelivery ? 'text-emerald-400 font-semibold' : 'text-[#F8F5EF]'}>
                {totals.isFreeDelivery ? 'FREE (Orders over ₹500)' : formatCurrency(totals.deliveryFee)}
              </span>
            </div>

            <div className="flex justify-between text-[#AAA39A]">
              <span>Demo Restaurant GST (5%)</span>
              <span className="text-[#F8F5EF]">{formatCurrency(totals.demoTax)}</span>
            </div>

            <div className="flex justify-between text-[#AAA39A]">
              <span>Packaging & Eco Container</span>
              <span className="text-[#F8F5EF]">{formatCurrency(totals.packagingFee)}</span>
            </div>

            {totals.discount > 0 && (
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Coupon Savings</span>
                <span>-{formatCurrency(totals.discount)}</span>
              </div>
            )}
          </div>

          {/* Grand Total */}
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-bold text-[#F8F5EF]">Grand Total</span>
            <div className="text-right">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#D6A84F] block">
                {formatCurrency(totals.grandTotal)}
              </span>
              <span className="text-[10px] text-[#888176]">All demo fees & taxes included</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] font-bold text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 active:scale-[0.99] transition-all shadow-gold-sm flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Prototype Disclosure */}
          <div className="p-3 bg-[#1B1813] border border-[#2B251B] rounded-xl text-[11px] text-[#888176] flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-[#D6A84F] flex-shrink-0 mt-0.5" />
            <span>
              This checkout is a frontend simulation. No actual payment gateway will charge your account.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
