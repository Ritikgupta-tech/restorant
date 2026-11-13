import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ShieldAlert,
  CreditCard,
  Banknote,
  Smartphone,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { checkoutSchema } from '../utils/validationSchemas';
import { formatCurrency, generateDemoOrderId } from '../utils/formatters';
import { DietaryBadge } from '../components/common/Badge';

export const CheckoutPage = () => {
  const { items, totals, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      mobileNumber: '',
      email: '',
      deliveryAddress: '',
      landmark: '',
      city: 'Mumbai',
      pincode: '400050',
      paymentMethod: 'online',
      deliveryNotes: '',
    },
  });

  const selectedPaymentMethod = watch('paymentMethod');

  if (items.length === 0) {
    return (
      <div className="py-24 max-w-md mx-auto px-4 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#F8F5EF] mb-3">
          Your Cart is Empty
        </h2>
        <p className="text-xs text-[#AAA39A] mb-6">
          Add some dishes before proceeding to the checkout simulation.
        </p>
        <Link
          to="/menu"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  const onSubmit = (formData) => {
    setIsSubmitting(true);

    // Simulate network delay for realistic experience
    setTimeout(() => {
      const orderId = generateDemoOrderId();
      const demoOrder = {
        orderId,
        customer: formData,
        items: [...items],
        pricing: totals,
        paymentMethod: formData.paymentMethod,
        orderDate: new Date().toISOString(),
        status: 'Confirmed (Simulated Prototype)',
        estimatedMinutes: 35,
      };

      try {
        const existing = JSON.parse(localStorage.getItem('the_sizzle_orders_v1') || '[]');
        localStorage.setItem('the_sizzle_orders_v1', JSON.stringify([demoOrder, ...existing]));
        localStorage.setItem('the_sizzle_latest_order_v1', JSON.stringify(demoOrder));
      } catch (e) {
        console.error('Failed to store demo order:', e);
      }

      clearCart();
      setIsSubmitting(false);
      navigate('/order-success');
    }, 1200);
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="mb-8">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs text-[#AAA39A] hover:text-[#D6A84F] transition-colors mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </Link>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8F5EF]">
          Checkout Simulation
        </h1>
        <p className="text-xs text-[#AAA39A] mt-1">
          Complete customer information and select simulated payment.
        </p>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left Column: Customer & Delivery Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Customer Details */}
            <div className="bg-[#14120F] border border-[#2B251B] rounded-2xl p-6 sm:p-7 shadow-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-[#252018] pb-4">
                <div className="w-7 h-7 rounded-full bg-[#D6A84F] text-[#0B0B0B] font-bold text-xs flex items-center justify-center">
                  1
                </div>
                <h2 className="font-serif text-xl font-bold text-[#F8F5EF]">
                  Customer & Delivery Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#F8F5EF] mb-1.5">
                    Full Name <span className="text-[#D6A84F]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Radhika Sharma"
                    {...register('fullName')}
                    className="w-full bg-[#1B1814] border border-[#302A20] focus:border-[#D6A84F] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#F8F5EF] placeholder-[#6A6357]"
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F8F5EF] mb-1.5">
                    10-Digit Mobile Number <span className="text-[#D6A84F]">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    {...register('mobileNumber')}
                    className="w-full bg-[#1B1814] border border-[#302A20] focus:border-[#D6A84F] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#F8F5EF] placeholder-[#6A6357]"
                  />
                  {errors.mobileNumber && (
                    <p className="text-red-400 text-xs mt-1">{errors.mobileNumber.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F8F5EF] mb-1.5">
                  Email Address <span className="text-[#D6A84F]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="radhika@example.com"
                  {...register('email')}
                  className="w-full bg-[#1B1814] border border-[#302A20] focus:border-[#D6A84F] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#F8F5EF] placeholder-[#6A6357]"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F8F5EF] mb-1.5">
                  Complete Street Address <span className="text-[#D6A84F]">*</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Apartment / Villa, Building name, Street address..."
                  {...register('deliveryAddress')}
                  className="w-full bg-[#1B1814] border border-[#302A20] focus:border-[#D6A84F] focus:outline-none rounded-xl p-3 text-xs sm:text-sm text-[#F8F5EF] placeholder-[#6A6357]"
                />
                {errors.deliveryAddress && (
                  <p className="text-red-400 text-xs mt-1">{errors.deliveryAddress.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#F8F5EF] mb-1.5">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Near City Mall"
                    {...register('landmark')}
                    className="w-full bg-[#1B1814] border border-[#302A20] focus:border-[#D6A84F] focus:outline-none rounded-xl px-3.5 py-2 text-xs text-[#F8F5EF] placeholder-[#6A6357]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F8F5EF] mb-1.5">
                    City <span className="text-[#D6A84F]">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('city')}
                    className="w-full bg-[#1B1814] border border-[#302A20] focus:border-[#D6A84F] focus:outline-none rounded-xl px-3.5 py-2 text-xs text-[#F8F5EF]"
                  />
                  {errors.city && (
                    <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F8F5EF] mb-1.5">
                    Pincode <span className="text-[#D6A84F]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="6 digits"
                    {...register('pincode')}
                    className="w-full bg-[#1B1814] border border-[#302A20] focus:border-[#D6A84F] focus:outline-none rounded-xl px-3.5 py-2 text-xs text-[#F8F5EF]"
                  />
                  {errors.pincode && (
                    <p className="text-red-400 text-xs mt-1">{errors.pincode.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F8F5EF] mb-1.5">
                  Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Leave at doorstep, do not ring bell, extra tissues..."
                  {...register('deliveryNotes')}
                  className="w-full bg-[#1B1814] border border-[#302A20] focus:border-[#D6A84F] focus:outline-none rounded-xl px-3.5 py-2 text-xs text-[#F8F5EF] placeholder-[#6A6357]"
                />
              </div>
            </div>

            {/* Step 2: Payment Simulation */}
            <div className="bg-[#14120F] border border-[#2B251B] rounded-2xl p-6 sm:p-7 shadow-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-[#252018] pb-4">
                <div className="w-7 h-7 rounded-full bg-[#D6A84F] text-[#0B0B0B] font-bold text-xs flex items-center justify-center">
                  2
                </div>
                <h2 className="font-serif text-xl font-bold text-[#F8F5EF]">
                  Payment Method (Simulation Only)
                </h2>
              </div>

              <div className="space-y-3">
                {/* Online Card Payment Simulation */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedPaymentMethod === 'online'
                      ? 'bg-[#1D1913] border-[#D6A84F]'
                      : 'bg-[#171512] border-[#2A241A] hover:border-[#3E3628]'
                  }`}
                >
                  <input
                    type="radio"
                    value="online"
                    {...register('paymentMethod')}
                    className="mt-1 accent-[#D6A84F]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#F8F5EF] flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#D6A84F]" />
                        Credit / Debit Card (Demo Sandbox)
                      </span>
                      <span className="text-[10px] uppercase font-bold text-[#D6A84F] px-2 py-0.5 rounded bg-[#D6A84F]/10">
                        Simulated
                      </span>
                    </div>
                    <p className="text-xs text-[#AAA39A] mt-1">
                      No card numbers or sensitive credentials required in prototype mode.
                    </p>
                  </div>
                </label>

                {/* UPI Simulation */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedPaymentMethod === 'upi'
                      ? 'bg-[#1D1913] border-[#D6A84F]'
                      : 'bg-[#171512] border-[#2A241A] hover:border-[#3E3628]'
                  }`}
                >
                  <input
                    type="radio"
                    value="upi"
                    {...register('paymentMethod')}
                    className="mt-1 accent-[#D6A84F]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#F8F5EF] flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-[#D6A84F]" />
                        UPI Instant (GPay / PhonePe / Paytm Simulation)
                      </span>
                      <span className="text-[10px] uppercase font-bold text-[#D6A84F] px-2 py-0.5 rounded bg-[#D6A84F]/10">
                        Simulated
                      </span>
                    </div>
                    <p className="text-xs text-[#AAA39A] mt-1">
                      Instant simulated virtual payment response.
                    </p>
                  </div>
                </label>

                {/* Cash on Delivery Simulation */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedPaymentMethod === 'cod'
                      ? 'bg-[#1D1913] border-[#D6A84F]'
                      : 'bg-[#171512] border-[#2A241A] hover:border-[#3E3628]'
                  }`}
                >
                  <input
                    type="radio"
                    value="cod"
                    {...register('paymentMethod')}
                    className="mt-1 accent-[#D6A84F]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#F8F5EF] flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-[#D6A84F]" />
                        Cash on Delivery (Simulated)
                      </span>
                      <span className="text-[10px] uppercase font-bold text-[#D6A84F] px-2 py-0.5 rounded bg-[#D6A84F]/10">
                        Simulated
                      </span>
                    </div>
                    <p className="text-xs text-[#AAA39A] mt-1">
                      Pay cash to simulated courier at doorstep.
                    </p>
                  </div>
                </label>
              </div>

              {errors.paymentMethod && (
                <p className="text-red-400 text-xs mt-1">{errors.paymentMethod.message}</p>
              )}
            </div>
          </div>

          {/* Right Column: Order Review & Submit */}
          <div className="bg-[#14120E] border border-[#2B251B] rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#F8F5EF] border-b border-[#252018] pb-4">
              Order Review ({items.length} items)
            </h2>

            {/* Items scroll */}
            <div className="max-h-56 overflow-y-auto space-y-3 pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <DietaryBadge isVeg={item.isVeg} />
                    <span className="text-[#F8F5EF] font-medium truncate">
                      {item.name} <span className="text-[#888176]">×{item.quantity}</span>
                    </span>
                  </div>
                  <span className="text-[#D6A84F] font-semibold whitespace-nowrap">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2.5 text-xs border-y border-[#252018] py-4">
              <div className="flex justify-between text-[#AAA39A]">
                <span>Item Subtotal</span>
                <span>{formatCurrency(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#AAA39A]">
                <span>Delivery Charge</span>
                <span>{totals.isFreeDelivery ? 'Free' : formatCurrency(totals.deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-[#AAA39A]">
                <span>GST (5% Demo)</span>
                <span>{formatCurrency(totals.demoTax)}</span>
              </div>
              <div className="flex justify-between text-[#AAA39A]">
                <span>Eco Packaging</span>
                <span>{formatCurrency(totals.packagingFee)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Discount</span>
                  <span>-{formatCurrency(totals.discount)}</span>
                </div>
              )}
            </div>

            {/* Grand Total */}
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-bold text-[#F8F5EF]">Payable Total</span>
              <span className="font-serif text-2xl font-bold text-[#D6A84F]">
                {formatCurrency(totals.grandTotal)}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.99] transition-all shadow-gold-sm flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Generating Demo Order...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Simulated Order</span>
                </>
              )}
            </button>

            {/* Disclosure Notice */}
            <div className="p-3 bg-[#171410] border border-[#2D261C] rounded-xl text-[11px] text-[#888176] space-y-1">
              <p className="flex items-center gap-1.5 text-[#D6A84F] font-semibold">
                <ShieldAlert className="w-3.5 h-3.5" />
                Frontend Prototype Guarantee:
              </p>
              <p>
                No real payments are collected. Your simulated order receipt will be generated immediately for demonstration.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
