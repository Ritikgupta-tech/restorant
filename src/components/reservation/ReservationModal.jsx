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
          className="fixed inset-0 bg-black/85 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl bg-[#131210] border border-[#D6A84F]/40 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden z-10 max-h-[92vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#29251E] pb-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D6A84F]/10 border border-[#D6A84F]/30 text-[#D6A84F] text-[11px] font-semibold tracking-wider uppercase mb-2">
                <Sparkles className="w-3 h-3" />
                Table Reservation Simulation
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F5EF]">
                Reserve Your Table
              </h3>
              <p className="text-xs text-[#AAA39A] mt-1">
                Experience exceptional hospitality at The Sizzle Restaurant.
              </p>
            </div>

            <button
              onClick={closeReservation}
              className="text-[#AAA39A] hover:text-[#F8F5EF] p-2 hover:bg-[#201D17] rounded-lg transition-colors"
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
                <label className="block text-xs font-semibold text-[#F8F5EF] mb-1.5">
                  Full Name <span className="text-[#D6A84F]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vikram Malhotra"
                  {...register('fullName')}
                  className="w-full bg-[#1B1916] border border-[#332D23] focus:border-[#D6A84F] focus:outline-none rounded-xl px-3.5 py-2.5 text-sm text-[#F8F5EF] placeholder-[#666056] transition-colors"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F8F5EF] mb-1.5">
                  Phone Number <span className="text-[#D6A84F]">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  {...register('phone')}
                  className="w-full bg-[#1B1916] border border-[#332D23] focus:border-[#D6A84F] focus:outline-none rounded-xl px-3.5 py-2.5 text-sm text-[#F8F5EF] placeholder-[#666056] transition-colors"
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#F8F5EF] mb-1.5">
                Email Address <span className="text-[#D6A84F]">*</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                className="w-full bg-[#1B1916] border border-[#332D23] focus:border-[#D6A84F] focus:outline-none rounded-xl px-3.5 py-2.5 text-sm text-[#F8F5EF] placeholder-[#666056] transition-colors"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Date, Time, Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#F8F5EF] mb-1.5">
                  Date <span className="text-[#D6A84F]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    min={todayStr}
                    {...register('date')}
                    className="w-full bg-[#1B1916] border border-[#332D23] focus:border-[#D6A84F] focus:outline-none rounded-xl px-3 py-2 text-sm text-[#F8F5EF] transition-colors"
                  />
                </div>
                {errors.date && (
                  <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F8F5EF] mb-1.5">
                  Time Slot <span className="text-[#D6A84F]">*</span>
                </label>
                <select
                  {...register('time')}
                  className="w-full bg-[#1B1916] border border-[#332D23] focus:border-[#D6A84F] focus:outline-none rounded-xl px-3 py-2 text-sm text-[#F8F5EF] transition-colors"
                >
                  <option value="12:30">12:30 PM (Lunch)</option>
                  <option value="13:30">01:30 PM (Lunch)</option>
                  <option value="14:30">02:30 PM (Lunch)</option>
                  <option value="19:00">07:00 PM (Dinner)</option>
                  <option value="19:30">07:30 PM (Dinner)</option>
                  <option value="20:30">08:30 PM (Dinner)</option>
                  <option value="21:30">09:30 PM (Dinner)</option>
                  <option value="22:30">10:30 PM (Late Dinner)</option>
                </select>
                {errors.time && (
                  <p className="text-red-400 text-xs mt-1">{errors.time.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F8F5EF] mb-1.5">
                  Guests <span className="text-[#D6A84F]">*</span>
                </label>
                <select
                  {...register('guests')}
                  className="w-full bg-[#1B1916] border border-[#332D23] focus:border-[#D6A84F] focus:outline-none rounded-xl px-3 py-2 text-sm text-[#F8F5EF] transition-colors"
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
              <label className="block text-xs font-semibold text-[#F8F5EF] mb-1.5">
                Seating Area
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'indoor', label: 'Main Hall' },
                  { id: 'terrace', label: 'Rooftop Terrace' },
                  { id: 'private_salon', label: 'Private Salon' },
                  { id: 'bar_lounge', label: 'Bar Lounge' },
                ].map((area) => (
                  <label
                    key={area.id}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-[#1B1916] border border-[#332D23] hover:border-[#D6A84F]/50 cursor-pointer text-xs"
                  >
                    <input
                      type="radio"
                      value={area.id}
                      {...register('seatingArea')}
                      className="accent-[#D6A84F]"
                    />
                    <span className="text-[#AAA39A]">{area.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs font-semibold text-[#F8F5EF] mb-1.5">
                Special Requests & Dietary Requirements (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Anniversary, birthday cake arrangement, window table, wheelchair access..."
                {...register('specialRequests')}
                className="w-full bg-[#1B1916] border border-[#332D23] focus:border-[#D6A84F] focus:outline-none rounded-xl p-3 text-sm text-[#F8F5EF] placeholder-[#666056] transition-colors"
              />
              {errors.specialRequests && (
                <p className="text-red-400 text-xs mt-1">{errors.specialRequests.message}</p>
              )}
            </div>

            {/* Demo Notice */}
            <div className="p-3 rounded-xl bg-[#181613] border border-[#D6A84F]/20 text-[11px] text-[#AAA39A]">
              <span className="text-[#D6A84F] font-semibold">Demo Notice:</span> Submitting this form tests the frontend reservation flow. No real table booking is submitted to a live restaurant host.
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] font-bold text-sm tracking-wide uppercase hover:brightness-110 active:scale-[0.99] transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Processing Reservation...</span>
                ) : (
                  <>
                    <span>Confirm Table Reservation</span>
                    <Sparkles className="w-4 h-4" />
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
