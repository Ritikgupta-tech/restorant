import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { reservationSchema } from '../../utils/validationSchemas';
import { useReservation } from '../../context/ReservationContext';

export const ReservationModal = () => {
  const { isModalOpen, closeReservation, makeReservation } = useReservation();

  const todayStr = new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      date: todayStr,
      time: '19:30',
      guests: 2,
      seatingArea: 'indoor',
      specialRequests: '',
    },
  });

  const onSubmit = (data) => {
    makeReservation(data);
    reset();
  };

  if (!isModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeReservation}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-xl bg-[#0F0E0D] border border-[#D6A84F]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 overflow-hidden z-10 max-h-[92vh] overflow-y-auto scrollbar-none"
        >
          {/* Gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D6A84F] to-transparent" />

          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#221F1A] pb-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D6A84F]/10 border border-[#D6A84F]/30 text-[#D6A84F] text-[10px] font-semibold tracking-[0.2em] uppercase mb-2">
                <Sparkles className="w-3 h-3" />
                Table Reservation Concierge
              </div>
              <h3 className="font-luxury text-3xl font-light text-[#F5F0E8]">
                Reserve Your Evening
              </h3>
              <p className="text-xs text-[#8A7E72] font-light mt-1">
                Experience exceptional hospitality and cast-iron cuisine at The Sizzle.
              </p>
            </div>

            <button
              onClick={closeReservation}
              className="text-[#8A7E72] hover:text-[#F5F0E8] p-2 hover:bg-[#1A1814] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E72] mb-1.5">
                  Full Name <span className="text-[#D6A84F]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vikram Malhotra"
                  {...register('fullName')}
                  className="w-full bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none px-4 py-2.5 text-xs sm:text-sm text-[#F5F0E8] placeholder-[#5A5247]"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E72] mb-1.5">
                  Phone Number <span className="text-[#D6A84F]">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="10-digit number"
                  {...register('phone')}
                  className="w-full bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none px-4 py-2.5 text-xs sm:text-sm text-[#F5F0E8] placeholder-[#5A5247]"
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E72] mb-1.5">
                Email Address <span className="text-[#D6A84F]">*</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                className="w-full bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none px-4 py-2.5 text-xs sm:text-sm text-[#F5F0E8] placeholder-[#5A5247]"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Date, Time, Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E72] mb-1.5">
                  Date <span className="text-[#D6A84F]">*</span>
                </label>
                <input
                  type="date"
                  min={todayStr}
                  {...register('date')}
                  className="w-full bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none px-3 py-2 text-xs sm:text-sm text-[#F5F0E8]"
                />
                {errors.date && (
                  <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E72] mb-1.5">
                  Time Slot <span className="text-[#D6A84F]">*</span>
                </label>
                <select
                  {...register('time')}
                  className="w-full bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none px-3 py-2 text-xs sm:text-sm text-[#F5F0E8] cursor-pointer"
                >
                  <option value="12:30">12:30 PM (Salon Lunch)</option>
                  <option value="13:30">01:30 PM (Salon Lunch)</option>
                  <option value="14:30">02:30 PM (Salon Lunch)</option>
                  <option value="19:00">07:00 PM (Dinner Seating)</option>
                  <option value="19:30">07:30 PM (Dinner Seating)</option>
                  <option value="20:30">08:30 PM (Dinner Seating)</option>
                  <option value="21:30">09:30 PM (Dinner Seating)</option>
                  <option value="22:30">10:30 PM (Late Savor)</option>
                </select>
                {errors.time && (
                  <p className="text-red-400 text-xs mt-1">{errors.time.message}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E72] mb-1.5">
                  Party Size <span className="text-[#D6A84F]">*</span>
                </label>
                <select
                  {...register('guests')}
                  className="w-full bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none px-3 py-2 text-xs sm:text-sm text-[#F5F0E8] cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16, 20].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
                {errors.guests && (
                  <p className="text-red-400 text-xs mt-1">{errors.guests.message}</p>
                )}
              </div>
            </div>

            {/* Seating preference */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E72] mb-1.5">
                Salon Ambience Preference
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'indoor', label: 'Main Hall' },
                  { id: 'terrace', label: 'Rooftop Terrace' },
                  { id: 'private_salon', label: 'Velvet Salon' },
                  { id: 'bar_lounge', label: 'Bar Lounge' },
                ].map((area) => (
                  <label
                    key={area.id}
                    className="flex items-center gap-2 p-2.5 bg-[#0A0908] border border-[#2A241C] hover:border-[#D6A84F]/50 cursor-pointer text-xs"
                  >
                    <input
                      type="radio"
                      value={area.id}
                      {...register('seatingArea')}
                      className="accent-[#D6A84F]"
                    />
                    <span className="text-[#A09585] text-[11px]">{area.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#8A7E72] mb-1.5">
                Special Celebrations / Dietary Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Anniversary celebration, bespoke floral centerpiece, window seating, allergies..."
                {...register('specialRequests')}
                className="w-full bg-[#0A0908] border border-[#2A241C] focus:border-[#D6A84F] focus:outline-none p-3 text-xs sm:text-sm text-[#F5F0E8] placeholder-[#5A5247]"
              />
              {errors.specialRequests && (
                <p className="text-red-400 text-xs mt-1">{errors.specialRequests.message}</p>
              )}
            </div>

            {/* Demo Notice */}
            <div className="p-3 bg-[#0A0908] border border-[#221F1A] text-[11px] text-[#6A6258] font-light">
              <span className="text-[#D6A84F] font-semibold">Demo Notice:</span> Submitting this form tests the frontend reservation flow. No real table booking is submitted to a live restaurant host.
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-luxury-primary w-full py-4 text-xs tracking-[0.2em] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Securing Reservation...</span>
                ) : (
                  <>
                    <span>Confirm Table Reservation</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
