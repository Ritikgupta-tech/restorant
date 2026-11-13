import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { contactSchema } from '../utils/validationSchemas';
import { useReservation } from '../context/ReservationContext';
import { useToast } from '../context/ToastContext';

export const ContactPage = () => {
  const { openReservation } = useReservation();
  const { addToast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = (data) => {
    // Simulated contact inquiry
    setSubmitted(true);
    addToast('Message received! Our team will respond shortly (Demo)', 'success');
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D6A84F] block mb-2">
          Connect With Us
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F8F5EF] mb-3">
          Contact & Location
        </h1>
        <p className="text-sm text-[#AAA39A] leading-relaxed">
          Have an inquiry regarding private dining, bespoke catering, or table bookings? We're at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Contact Cards & Operating Hours */}
        <div className="space-y-6">
          <div className="bg-[#14120E] border border-[#2B251B] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#F8F5EF] border-b border-[#252018] pb-4">
              Restaurant Information
            </h2>

            <div className="space-y-5 text-xs sm:text-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#1C1914] border border-[#D6A84F]/30 text-[#D6A84F] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#F8F5EF] text-sm">Physical Address</h3>
                  <p className="text-[#AAA39A] mt-1 leading-relaxed">
                    {RESTAURANT_INFO.address.line1}, {RESTAURANT_INFO.address.landmark}
                    <br />
                    {RESTAURANT_INFO.address.city}, {RESTAURANT_INFO.address.state} – {RESTAURANT_INFO.address.pincode}
                  </p>
                  <a
                    href={RESTAURANT_INFO.address.googleMapsSearchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#D6A84F] hover:underline mt-2 font-semibold text-xs"
                  >
                    Open In Google Maps →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#1C1914] border border-[#D6A84F]/30 text-[#D6A84F] flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#F8F5EF] text-sm">Phone Hotline (Demo)</h3>
                  <p className="text-[#AAA39A] font-mono mt-1">{RESTAURANT_INFO.phone}</p>
                  <p className="text-[11px] text-[#7A7265]">Line open 11:00 AM – 11:30 PM daily</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#1C1914] border border-[#D6A84F]/30 text-[#D6A84F] flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#F8F5EF] text-sm">Electronic Mail</h3>
                  <p className="text-[#AAA39A] mt-1">{RESTAURANT_INFO.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#1C1914] border border-[#D6A84F]/30 text-[#D6A84F] flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#F8F5EF] text-sm">Operating Hours</h3>
                  <div className="text-[#AAA39A] mt-1 space-y-1">
                    <p>Monday – Thursday: 12:00 PM – 11:30 PM</p>
                    <p>Friday – Sunday: 12:00 PM – 12:30 AM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#252018]">
              <button
                onClick={openReservation}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table Online</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="bg-[#14120E] border border-[#2B251B] rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="border-b border-[#252018] pb-4 mb-6">
            <h2 className="font-serif text-2xl font-bold text-[#F8F5EF]">
              Send Us a Message
            </h2>
            <p className="text-xs text-[#AAA39A] mt-1">
              For private events, banquets, or dining feedback.
            </p>
          </div>

          {submitted && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <p>Thank you! Your simulated inquiry has been logged successfully.</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#F8F5EF] mb-1.5">
                Your Name <span className="text-[#D6A84F]">*</span>
              </label>
              <input
                type="text"
                placeholder="Vikram Malhotra"
                {...register('name')}
                className="w-full bg-[#1B1814] border border-[#302A20] focus:border-[#D6A84F] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#F8F5EF] placeholder-[#6A6357]"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#F8F5EF] mb-1.5">
                  Email Address <span className="text-[#D6A84F]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="vikram@example.com"
                  {...register('email')}
                  className="w-full bg-[#1B1814] border border-[#302A20] focus:border-[#D6A84F] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#F8F5EF] placeholder-[#6A6357]"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F8F5EF] mb-1.5">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="10-digit number"
                  {...register('phone')}
                  className="w-full bg-[#1B1814] border border-[#302A20] focus:border-[#D6A84F] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#F8F5EF] placeholder-[#6A6357]"
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F8F5EF] mb-1.5">
                Subject <span className="text-[#D6A84F]">*</span>
              </label>
              <input
                type="text"
                placeholder="Private Dining / Catering / General Inquiry"
                {...register('subject')}
                className="w-full bg-[#1B1814] border border-[#302A20] focus:border-[#D6A84F] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#F8F5EF] placeholder-[#6A6357]"
              />
              {errors.subject && (
                <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F8F5EF] mb-1.5">
                Message <span className="text-[#D6A84F]">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Please describe your dining inquiry, expected party size, or dates..."
                {...register('message')}
                className="w-full bg-[#1B1814] border border-[#302A20] focus:border-[#D6A84F] focus:outline-none rounded-xl p-3 text-xs sm:text-sm text-[#F8F5EF] placeholder-[#6A6357]"
              />
              {errors.message && (
                <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Inquiry (Simulated)</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
