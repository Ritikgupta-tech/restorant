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
import { Reveal } from '../components/common/ScrollReveal';

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
      <div className="py-24 sm:py-32 max-w-md mx-auto px-4 text-center">
        <h2 className="font-luxury text-3xl font-light text-[#F5F0E8] mb-3">
          Your Cart Is Empty
        </h2>
        <p className="text-xs text-[#8A7E72] mb-6 font-light">
          Please add dishes to your dining cart before initiating the checkout process.
        </p>
        <Link
          to="/menu"
          className="btn-luxury-primary px-6 py-3 text-xs tracking-[0.2em]"
        >
          Browse Catalogue
        </Link>
      </div>
    );
  }

  const onSubmit = (formData) => {
    setIsSubmitting(true);

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
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <Reveal className="mb-10 pb-6 border-b border-[#1E1B15]">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#8A7E72] hover:text-[#D6A84F] transition-colors mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Cart</span>
        </Link>
        <h1 className="font-luxury text-3xl sm:text-5xl font-light text-[#F5F0E8]">
          Checkout <span className="italic text-gradient-gold">Simulation</span>
        </h1>
        <p className="text-xs text-[#8A7E72] font-light mt-1">
          Complete delivery coordinates and select simulated tender. No live payment processed.
        </p>
      </Reveal>

      {/* Main Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-start">
          {/* Left Column: Customer & Delivery Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Customer Details */}
            <div className="bg-[#12100E] border border-[#26221B] p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.6)] space-y-5">
              <div className="flex items-center gap-3 border-b border-[#1E1B15] pb-4">
                <div className="w-7 h-7 bg-[#D6A84F] text-[#080807] font-bold text-xs flex items-center justify-center font-mono">
                  1
                </div>
                <h2 className="font-luxury text-2xl font-light text-[#F5F0E8]">
                  Delivery Address & Recipient
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E72] mb-1.5">
                    Full Name <span className="text-[#D6A84F]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Radhika Sharma"
                    {...register('fullName')}
                    className="w-full bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none px-4 py-2.5 text-xs sm:text-sm text-[#F5F0E8] placeholder-[#5A5247]"
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E72] mb-1.5">
                    Mobile Number <span className="text-[#D6A84F]">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit number (e.g. 9876543210)"
                    {...register('mobileNumber')}
                    className="w-full bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none px-4 py-2.5 text-xs sm:text-sm text-[#F5F0E8] placeholder-[#5A5247]"
                  />
                  {errors.mobileNumber && (
                    <p className="text-red-400 text-xs mt-1">{errors.mobileNumber.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E72] mb-1.5">
                  Email Address <span className="text-[#D6A84F]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="radhika@example.com"
                  {...register('email')}
                  className="w-full bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none px-4 py-2.5 text-xs sm:text-sm text-[#F5F0E8] placeholder-[#5A5247]"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E72] mb-1.5">
                  Complete Street Address <span className="text-[#D6A84F]">*</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Residence, Floor, Building name, Avenue or Cross Street..."
                  {...register('deliveryAddress')}
                  className="w-full bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none p-3 text-xs sm:text-sm text-[#F5F0E8] placeholder-[#5A5247]"
                />
                {errors.deliveryAddress && (
                  <p className="text-red-400 text-xs mt-1">{errors.deliveryAddress.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E72] mb-1.5">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Near St. Regis / Taj Lands End"
                    {...register('landmark')}
                    className="w-full bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none px-4 py-2 text-xs text-[#F5F0E8] placeholder-[#5A5247]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E72] mb-1.5">
                    City <span className="text-[#D6A84F]">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('city')}
                    className="w-full bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none px-4 py-2 text-xs text-[#F5F0E8]"
                  />
                  {errors.city && (
                    <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E72] mb-1.5">
                    Postal Code <span className="text-[#D6A84F]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="6 digits (400050)"
                    {...register('pincode')}
                    className="w-full bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none px-4 py-2 text-xs text-[#F5F0E8]"
                  />
                  {errors.pincode && (
                    <p className="text-red-400 text-xs mt-1">{errors.pincode.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E72] mb-1.5">
                  Culinary Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Please ring bell twice, thermal box handover, extra serviettes..."
                  {...register('deliveryNotes')}
                  className="w-full bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none px-4 py-2 text-xs text-[#F5F0E8] placeholder-[#5A5247]"
                />
              </div>
            </div>

            {/* Step 2: Payment Simulation */}
            <div className="bg-[#12100E] border border-[#26221B] p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.6)] space-y-5">
              <div className="flex items-center gap-3 border-b border-[#1E1B15] pb-4">
                <div className="w-7 h-7 bg-[#D6A84F] text-[#080807] font-bold text-xs flex items-center justify-center font-mono">
                  2
                </div>
                <h2 className="font-luxury text-2xl font-light text-[#F5F0E8]">
                  Payment Selection (Demo Sandbox)
                </h2>
              </div>

              <div className="space-y-3">
                {/* Online Card Payment Simulation */}
                <label
                  className={`flex items-start gap-4 p-4 border cursor-pointer transition-all ${
                    selectedPaymentMethod === 'online'
                      ? 'bg-[#181512] border-[#D6A84F] shadow-[0_0_20px_rgba(214,168,79,0.1)]'
                      : 'bg-[#0E0D0B] border-[#221F1A] hover:border-[#383226]'
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
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#F5F0E8] flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#D6A84F]" />
                        <span>Credit / Debit Card (Simulated Sandbox)</span>
                      </span>
                      <span className="text-[10px] uppercase font-mono text-[#D6A84F] px-2 py-0.5 bg-[#D6A84F]/10 border border-[#D6A84F]/30">
                        Demo
                      </span>
                    </div>
                    <p className="text-xs text-[#8A7E72] mt-1 font-light">
                      No credentials or CVVs required. Instant simulated authorization.
                    </p>
                  </div>
                </label>

                {/* UPI Simulation */}
                <label
                  className={`flex items-start gap-4 p-4 border cursor-pointer transition-all ${
                    selectedPaymentMethod === 'upi'
                      ? 'bg-[#181512] border-[#D6A84F] shadow-[0_0_20px_rgba(214,168,79,0.1)]'
                      : 'bg-[#0E0D0B] border-[#221F1A] hover:border-[#383226]'
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
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#F5F0E8] flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-[#D6A84F]" />
                        <span>UPI Instant (GPay / PhonePe / Paytm Simulation)</span>
                      </span>
                      <span className="text-[10px] uppercase font-mono text-[#D6A84F] px-2 py-0.5 bg-[#D6A84F]/10 border border-[#D6A84F]/30">
                        Demo
                      </span>
                    </div>
                    <p className="text-xs text-[#8A7E72] mt-1 font-light">
                      Direct sandbox intent mock with zero charge.
                    </p>
                  </div>
                </label>

                {/* Cash on Delivery Simulation */}
                <label
                  className={`flex items-start gap-4 p-4 border cursor-pointer transition-all ${
                    selectedPaymentMethod === 'cod'
                      ? 'bg-[#181512] border-[#D6A84F] shadow-[0_0_20px_rgba(214,168,79,0.1)]'
                      : 'bg-[#0E0D0B] border-[#221F1A] hover:border-[#383226]'
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
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#F5F0E8] flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-[#D6A84F]" />
                        <span>Pay on Delivery (Simulated)</span>
                      </span>
                      <span className="text-[10px] uppercase font-mono text-[#D6A84F] px-2 py-0.5 bg-[#D6A84F]/10 border border-[#D6A84F]/30">
                        Demo
                      </span>
                    </div>
                    <p className="text-xs text-[#8A7E72] mt-1 font-light">
                      Simulated physical tender upon doorstep handover.
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
          <div className="bg-[#12100E] border border-[#26221B] p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.6)] space-y-6">
            <h2 className="font-luxury text-2xl font-light text-[#F5F0E8] border-b border-[#1E1B15] pb-4">
              Order Review ({items.length} items)
            </h2>

            {/* Items scroll */}
            <div className="max-h-56 overflow-y-auto space-y-3 pr-1 scrollbar-none">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <DietaryBadge isVeg={item.isVeg} />
                    <span className="text-[#F5F0E8] font-light truncate">
                      {item.name} <span className="text-[#6A6258] font-mono">×{item.quantity}</span>
                    </span>
                  </div>
                  <span className="text-gradient-gold font-mono font-medium whitespace-nowrap">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2.5 text-xs border-y border-[#1E1B15] py-4">
              <div className="flex justify-between text-[#8A7E72]">
                <span>Dishes Subtotal</span>
                <span className="font-mono text-[#F5F0E8]">{formatCurrency(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#8A7E72]">
                <span>Delivery Courtesy</span>
                <span className={totals.isFreeDelivery ? 'text-emerald-400 font-semibold' : 'font-mono text-[#F5F0E8]'}>
                  {totals.isFreeDelivery ? 'COMPLIMENTARY' : formatCurrency(totals.deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-[#8A7E72]">
                <span>GST (5% Demo)</span>
                <span className="font-mono text-[#F5F0E8]">{formatCurrency(totals.demoTax)}</span>
              </div>
              <div className="flex justify-between text-[#8A7E72]">
                <span>Eco Thermal Packaging</span>
                <span className="font-mono text-[#F5F0E8]">{formatCurrency(totals.packagingFee)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Voucher Savings</span>
                  <span className="font-mono">-{formatCurrency(totals.discount)}</span>
                </div>
              )}
            </div>

            {/* Grand Total */}
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8A7E72]">Payable Total</span>
              <span className="font-luxury text-3xl font-normal text-gradient-gold">
                {formatCurrency(totals.grandTotal)}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-luxury-primary w-full py-4 text-xs tracking-[0.2em] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-[#080807] border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing Demo Order...</span>
                </span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Confirm Simulated Order</span>
                </>
              )}
            </button>

            {/* Disclosure Notice */}
            <div className="p-3 bg-[#0A0908] border border-[#221E17] text-[11px] text-[#6A6258] space-y-1">
              <p className="flex items-center gap-1.5 text-[#D6A84F] font-semibold uppercase tracking-wider text-[10px]">
                <ShieldAlert className="w-3.5 h-3.5" />
                Frontend Prototype Guarantee:
              </p>
              <p className="font-light">
                No real payments are collected. Your simulated order receipt will be rendered immediately for demonstration.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
