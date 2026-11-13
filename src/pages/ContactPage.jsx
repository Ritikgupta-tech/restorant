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
  ArrowRight,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { contactSchema } from '../utils/validationSchemas';
import { useReservation } from '../context/ReservationContext';
import { useToast } from '../context/ToastContext';
import { Reveal } from '../components/common/ScrollReveal';

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
    setSubmitted(true);
    addToast('Inquiry received! Our concierge will connect with you shortly (Demo)', 'success');
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
      {/* Title */}
      <Reveal className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6A84F]/10 border border-[#D6A84F]/30 text-[#D6A84F] text-[11px] font-semibold uppercase tracking-[0.25em] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Concierge & Inquiries</span>
        </div>
        <h1 className="font-luxury text-4xl sm:text-6xl md:text-7xl font-light text-[#F5F0E8] tracking-wide mb-4">
          Connect With <span className="italic font-normal text-gradient-gold">The Sizzle</span>
        </h1>
        <p className="text-sm sm:text-base text-[#A09080] font-light leading-relaxed max-w-2xl mx-auto">
          Private dining salons, bespoke banquets, or culinary inquiries — our hospitality team is dedicated to curating your memorable evening.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Column: Contact Cards & Operating Hours */}
        <Reveal className="space-y-6">
          <div className="bg-[#12100E] border border-[#26221B] p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.6)] space-y-6">
            <h2 className="font-luxury text-2xl sm:text-3xl font-light text-[#F5F0E8] border-b border-[#1E1B15] pb-4">
              Salon & Concierge Desk
            </h2>

            <div className="space-y-6 text-xs sm:text-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#181512] border border-[#D6A84F]/30 text-[#D6A84F] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-luxury text-base font-medium text-[#F5F0E8] tracking-wide">Dining Salon Address</h3>
                  <p className="text-[#8A7E72] mt-1 font-light leading-relaxed">
                    {RESTAURANT_INFO.address.line1}, {RESTAURANT_INFO.address.landmark}
                    <br />
                    {RESTAURANT_INFO.address.city}, {RESTAURANT_INFO.address.state} – {RESTAURANT_INFO.address.pincode}
                  </p>
                  <a
                    href={RESTAURANT_INFO.address.googleMapsSearchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#D6A84F] hover:text-[#F3DC9B] mt-2 font-semibold text-xs tracking-wider uppercase"
                  >
                    <span>View In Google Maps</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#181512] border border-[#D6A84F]/30 text-[#D6A84F] flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-luxury text-base font-medium text-[#F5F0E8] tracking-wide">Concierge Hotline (Demo)</h3>
                  <p className="text-[#C4B9AA] font-mono mt-1 text-sm">{RESTAURANT_INFO.phone}</p>
                  <p className="text-[11px] text-[#6A6258] mt-0.5">Lines active 11:00 AM – 11:30 PM Daily</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#181512] border border-[#D6A84F]/30 text-[#D6A84F] flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-luxury text-base font-medium text-[#F5F0E8] tracking-wide">Bespoke Inquiries</h3>
                  <p className="text-[#8A7E72] mt-1 font-mono">{RESTAURANT_INFO.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#181512] border border-[#D6A84F]/30 text-[#D6A84F] flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-luxury text-base font-medium text-[#F5F0E8] tracking-wide">Operating Hours</h3>
                  <p className="text-[#8A7E72] mt-1 font-light">
                    Monday to Sunday: 12:00 PM – 11:30 PM
                  </p>
                  <p className="text-[11px] text-[#6A6258] mt-0.5">Last seating: 10:45 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Table Reservation Banner */}
          <div className="border border-[#D6A84F]/40 bg-[#12100E] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-luxury text-xl font-light text-[#F5F0E8]">
                Planning an Evening Tonight?
              </h3>
              <p className="text-xs text-[#8A7E72] font-light mt-1">
                Tables in the Velvet Room & Main Salon fill quickly on weekends.
              </p>
            </div>
            <button
              onClick={openReservation}
              className="btn-luxury-primary px-6 py-3 text-xs tracking-[0.15em] whitespace-nowrap"
            >
              Book Table
            </button>
          </div>
        </Reveal>

        {/* Right Column: Contact Form */}
        <Reveal delay={0.15} className="bg-[#12100E] border border-[#26221B] p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          <div className="border-b border-[#1E1B15] pb-4 mb-6">
            <h2 className="font-luxury text-2xl sm:text-3xl font-light text-[#F5F0E8]">
              Send an Inquiry
            </h2>
            <p className="text-xs text-[#8A7E72] font-light mt-1">
              For private dining, culinary masterclasses, or corporate events.
            </p>
          </div>

          {submitted && (
            <div className="mb-6 p-4 bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <p>Thank you. Your simulated message has been received by our concierge.</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E72] mb-1.5">
                Full Name <span className="text-[#D6A84F]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Vikram Malhotra"
                {...register('name')}
                className="w-full bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none px-4 py-2.5 text-xs sm:text-sm text-[#F5F0E8] placeholder-[#5A5247]"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E72] mb-1.5">
                  Email Address <span className="text-[#D6A84F]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="vikram@example.com"
                  {...register('email')}
                  className="w-full bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none px-4 py-2.5 text-xs sm:text-sm text-[#F5F0E8] placeholder-[#5A5247]"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E72] mb-1.5">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="10-digit mobile"
                  {...register('phone')}
                  className="w-full bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none px-4 py-2.5 text-xs sm:text-sm text-[#F5F0E8] placeholder-[#5A5247]"
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E72] mb-1.5">
                Subject <span className="text-[#D6A84F]">*</span>
              </label>
              <input
                type="text"
                placeholder="Private Salon / Masterclass / Bespoke Catering"
                {...register('subject')}
                className="w-full bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none px-4 py-2.5 text-xs sm:text-sm text-[#F5F0E8] placeholder-[#5A5247]"
              />
              {errors.subject && (
                <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E72] mb-1.5">
                Message <span className="text-[#D6A84F]">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Please outline the nature of your event, guest count, or dietary preferences..."
                {...register('message')}
                className="w-full bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none p-3 text-xs sm:text-sm text-[#F5F0E8] placeholder-[#5A5247]"
              />
              {errors.message && (
                <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-luxury-primary w-full py-3.5 text-xs tracking-[0.2em] flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit Inquiry (Simulated)</span>
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </div>
  );
};
