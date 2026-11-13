import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Clock,
  Printer,
  ShoppingBag,
  ArrowRight,
  MapPin,
  Calendar,
  ChefHat,
  Truck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { DietaryBadge } from '../components/common/Badge';
import { Reveal } from '../components/common/ScrollReveal';

export const OrderSuccessPage = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('the_sizzle_latest_order_v1');
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D6A84F', '#F59E0B', '#FFF0D0', '#B08332'],
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="py-24 sm:py-32 max-w-md mx-auto px-4 text-center">
        <h2 className="font-luxury text-3xl font-light text-[#F5F0E8] mb-2">
          No Order Record Located
        </h2>
        <p className="text-xs text-[#8A7E72] mb-6 font-light">
          There is no recorded simulated order in your current browser session.
        </p>
        <Link
          to="/menu"
          className="btn-luxury-primary px-6 py-3 text-xs tracking-[0.2em]"
        >
          Explore Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <Reveal className="text-center mb-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-[#D6A84F]/10 border border-[#D6A84F]/40 flex items-center justify-center text-[#D6A84F] shadow-[0_0_25px_rgba(214,168,79,0.2)]">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6A84F]/10 border border-[#D6A84F]/30 text-[#D6A84F] text-[10px] font-semibold uppercase tracking-[0.25em] mb-3">
          <Sparkles className="w-3 h-3" />
          <span>Simulated Order Confirmed</span>
        </div>
        <h1 className="font-luxury text-3xl sm:text-5xl font-light text-[#F5F0E8] mb-3">
          Thank You, <span className="italic text-gradient-gold">{order.customer?.fullName}</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#8A7E72] font-light max-w-md mx-auto">
          Your culinary order has been acknowledged by our chef. Preparation on the cast iron flames has commenced.
        </p>
      </Reveal>

      {/* Order Status Timeline Bar */}
      <Reveal delay={0.1} className="bg-[#12100E] border border-[#26221B] p-6 mb-8 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#8A7E72] mb-6 border-b border-[#1E1B15] pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#D6A84F]" />
            <span>Estimated Demo Handover: <strong className="text-[#F5F0E8] font-mono">~35 Minutes</strong></span>
          </div>
          <span className="font-mono text-[#D6A84F] uppercase tracking-wider text-xs">
            Ref ID: <strong className="text-[#F5F0E8]">{order.orderId}</strong>
          </span>
        </div>

        {/* 3 Step Simulated Progress Bar */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 bg-[#D6A84F] text-[#080807] flex items-center justify-center font-bold mb-2 shadow-[0_0_15px_rgba(214,168,79,0.3)]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="font-luxury text-sm font-light text-[#F5F0E8]">Order Placed</span>
            <span className="text-[10px] text-[#8A7E72] font-mono">Confirmed</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-9 h-9 bg-[#1A1814] border border-[#D6A84F] text-[#D6A84F] flex items-center justify-center font-bold mb-2 animate-pulse">
              <ChefHat className="w-4 h-4" />
            </div>
            <span className="font-luxury text-sm font-light text-[#D6A84F]">At the Stoves</span>
            <span className="text-[10px] text-[#8A7E72] font-mono">In Preparation</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-9 h-9 bg-[#141210] border border-[#26221B] text-[#5A5247] flex items-center justify-center font-bold mb-2">
              <Truck className="w-4 h-4" />
            </div>
            <span className="font-luxury text-sm font-light text-[#6A6258]">Out for Dispatch</span>
            <span className="text-[10px] text-[#5A5247] font-mono">Pending</span>
          </div>
        </div>
      </Reveal>

      {/* Itemized Printable Receipt */}
      <Reveal delay={0.15} className="bg-[#12100E] border border-[#26221B] p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.6)] mb-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#1E1B15] pb-4">
          <div>
            <h2 className="font-luxury text-2xl font-light text-[#F5F0E8]">Culinary Receipt</h2>
            <p className="text-xs text-[#8A7E72] font-mono mt-0.5">
              Authorized on {new Date(order.orderDate).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#1A1814] hover:bg-[#D6A84F] hover:text-[#080807] text-xs text-[#A09585] font-semibold border border-[#2E281F] transition-all uppercase tracking-wider"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Customer & Address Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#0A0908] p-5 border border-[#1E1B15]">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#6A6258] block mb-1 font-semibold">
              Guest Coordinates:
            </span>
            <p className="font-medium text-[#F5F0E8]">{order.customer?.fullName}</p>
            <p className="text-[#8A7E72] font-mono">{order.customer?.mobileNumber}</p>
            <p className="text-[#8A7E72]">{order.customer?.email}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#6A6258] block mb-1 font-semibold">
              Simulated Destination:
            </span>
            <p className="text-[#C4B9AA] leading-relaxed font-light">
              {order.customer?.deliveryAddress}
              {order.customer?.landmark ? `, Near ${order.customer.landmark}` : ''}
              <br />
              {order.customer?.city} – {order.customer?.pincode}
            </p>
            <p className="text-[#D6A84F] mt-1.5 capitalize font-medium text-[11px]">
              Tender: {order.paymentMethod === 'cod' ? 'Pay on Delivery (Simulated)' : order.paymentMethod === 'upi' ? 'UPI Sandbox Simulation' : 'Card Sandbox Simulation'}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <div className="space-y-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A7064] block">
            Items Handcrafted
          </span>
          <div className="divide-y divide-[#1A1814]">
            {order.items?.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <DietaryBadge isVeg={item.isVeg} />
                  <span className="text-[#F5F0E8] font-light">
                    {item.name} <strong className="text-[#D6A84F] font-mono font-medium">× {item.quantity}</strong>
                  </span>
                </div>
                <span className="text-gradient-gold font-mono font-medium">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t border-[#1E1B15] pt-4 space-y-2 text-xs">
          <div className="flex justify-between text-[#8A7E72]">
            <span>Dishes Subtotal</span>
            <span className="font-mono text-[#F5F0E8]">{formatCurrency(order.pricing?.subtotal)}</span>
          </div>
          <div className="flex justify-between text-[#8A7E72]">
            <span>Delivery Courtesy</span>
            <span className="font-mono text-[#F5F0E8]">
              {order.pricing?.deliveryFee === 0 ? 'COMPLIMENTARY' : formatCurrency(order.pricing?.deliveryFee)}
            </span>
          </div>
          <div className="flex justify-between text-[#8A7E72]">
            <span>GST & Eco Packaging (5% Demo)</span>
            <span className="font-mono text-[#F5F0E8]">
              {formatCurrency((order.pricing?.demoTax || 0) + (order.pricing?.packagingFee || 0))}
            </span>
          </div>
          {order.pricing?.discount > 0 && (
            <div className="flex justify-between text-emerald-400 font-semibold">
              <span>Voucher Privilege Savings</span>
              <span className="font-mono">-{formatCurrency(order.pricing?.discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm font-bold text-[#F5F0E8] pt-3 border-t border-[#1E1B15]">
            <span className="uppercase tracking-wider text-xs">Total Simulated Authorized</span>
            <span className="font-luxury text-2xl font-normal text-gradient-gold">
              {formatCurrency(order.pricing?.grandTotal)}
            </span>
          </div>
        </div>
      </Reveal>

      {/* Action Buttons */}
      <Reveal delay={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/menu"
          className="btn-luxury-primary w-full sm:w-auto px-8 py-3.5 text-xs tracking-[0.2em] text-center"
        >
          Order Another Dish
        </Link>
        <Link
          to="/"
          className="btn-luxury-outline w-full sm:w-auto px-8 py-3.5 text-xs tracking-[0.2em] text-center"
        >
          Return to Salon
        </Link>
      </Reveal>
    </div>
  );
};
