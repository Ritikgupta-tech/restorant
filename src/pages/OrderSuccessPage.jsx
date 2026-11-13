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
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { DietaryBadge } from '../components/common/Badge';

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

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
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
      <div className="py-24 max-w-md mx-auto px-4 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#F8F5EF] mb-2">
          No Recent Order Found
        </h2>
        <p className="text-xs text-[#AAA39A] mb-6">
          You don't have an active simulated order in this session.
        </p>
        <Link
          to="/menu"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D6A84F]/15 border border-[#D6A84F]/40 flex items-center justify-center text-[#D6A84F]">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="text-xs uppercase tracking-[0.2em] text-[#D6A84F] font-bold">
          Order Placed Successfully (Demo Simulation)
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F8F5EF] mt-2 mb-3">
          Thank You, {order.customer?.fullName}!
        </h1>
        <p className="text-xs sm:text-sm text-[#AAA39A] max-w-md mx-auto">
          Your simulated culinary order has been received. Our chef has commenced preparation.
        </p>
      </div>

      {/* Order Status Timeline Bar */}
      <div className="bg-[#14120E] border border-[#2B251B] rounded-2xl p-6 mb-8 shadow-xl">
        <div className="flex items-center justify-between text-xs text-[#AAA39A] mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#D6A84F]" />
            <span>Estimated Demo Arrival: <strong>~35 mins</strong></span>
          </div>
          <span className="font-mono text-[#D6A84F] font-bold text-sm">
            ID: {order.orderId}
          </span>
        </div>

        {/* 3 Step Simulated Progress Bar */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#D6A84F] text-[#0B0B0B] flex items-center justify-center font-bold mb-1.5 shadow-gold-sm">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="font-semibold text-[#F8F5EF]">Order Placed</span>
            <span className="text-[10px] text-[#888176]">Confirmed</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#241F17] border border-[#D6A84F] text-[#D6A84F] flex items-center justify-center font-bold mb-1.5 animate-pulse">
              <ChefHat className="w-4 h-4" />
            </div>
            <span className="font-semibold text-[#D6A84F]">In the Kitchen</span>
            <span className="text-[10px] text-[#888176]">Simulated Sizzle</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#1B1813] border border-[#302A20] text-[#6A6357] flex items-center justify-center font-bold mb-1.5">
              <Truck className="w-4 h-4" />
            </div>
            <span className="font-semibold text-[#888176]">Dispatched</span>
            <span className="text-[10px] text-[#888176]">Estimated soon</span>
          </div>
        </div>
      </div>

      {/* Itemized Printable Receipt */}
      <div className="bg-[#151310] border border-[#2B251B] rounded-2xl p-6 sm:p-8 shadow-2xl mb-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#252018] pb-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#F8F5EF]">Order Receipt</h2>
            <p className="text-xs text-[#AAA39A]">
              Placed on {new Date(order.orderDate).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#201D17] hover:bg-[#D6A84F] hover:text-[#0B0B0B] text-xs text-[#AAA39A] font-semibold rounded-lg border border-[#332D23] transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Customer & Address Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#191713] p-4 rounded-xl border border-[#262118]">
          <div>
            <span className="text-[#888176] block mb-1">Customer Info:</span>
            <p className="font-semibold text-[#F8F5EF]">{order.customer?.fullName}</p>
            <p className="text-[#AAA39A]">{order.customer?.mobileNumber}</p>
            <p className="text-[#AAA39A]">{order.customer?.email}</p>
          </div>
          <div>
            <span className="text-[#888176] block mb-1">Simulated Destination:</span>
            <p className="text-[#F8F5EF] leading-relaxed">
              {order.customer?.deliveryAddress}
              {order.customer?.landmark ? `, Near ${order.customer.landmark}` : ''}
              <br />
              {order.customer?.city} – {order.customer?.pincode}
            </p>
            <p className="text-[#D6A84F] mt-1 capitalize font-medium">
              Payment: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod === 'upi' ? 'UPI Simulation' : 'Card Simulation'}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#AAA39A] block">
            Items Ordered
          </span>
          <div className="divide-y divide-[#221D16]">
            {order.items?.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <DietaryBadge isVeg={item.isVeg} />
                  <span className="text-[#F8F5EF] font-medium">
                    {item.name} <strong className="text-[#D6A84F]">× {item.quantity}</strong>
                  </span>
                </div>
                <span className="text-[#F8F5EF] font-semibold">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t border-[#252018] pt-4 space-y-2 text-xs">
          <div className="flex justify-between text-[#AAA39A]">
            <span>Subtotal</span>
            <span>{formatCurrency(order.pricing?.subtotal)}</span>
          </div>
          <div className="flex justify-between text-[#AAA39A]">
            <span>Delivery Charge</span>
            <span>{order.pricing?.deliveryFee === 0 ? 'Free' : formatCurrency(order.pricing?.deliveryFee)}</span>
          </div>
          <div className="flex justify-between text-[#AAA39A]">
            <span>Taxes & Eco Packaging (5% Demo)</span>
            <span>{formatCurrency((order.pricing?.demoTax || 0) + (order.pricing?.packagingFee || 0))}</span>
          </div>
          {order.pricing?.discount > 0 && (
            <div className="flex justify-between text-emerald-400">
              <span>Promo Discount</span>
              <span>-{formatCurrency(order.pricing?.discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm font-bold text-[#F8F5EF] pt-2 border-t border-[#252018]">
            <span>Total Simulated Paid</span>
            <span className="text-[#D6A84F] font-serif text-lg">
              {formatCurrency(order.pricing?.grandTotal)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/menu"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md text-center"
        >
          Order Another Dish
        </Link>
        <Link
          to="/"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#171512] border border-[#2D261C] hover:border-[#D6A84F] text-xs font-semibold text-[#F8F5EF] transition-all text-center"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};
