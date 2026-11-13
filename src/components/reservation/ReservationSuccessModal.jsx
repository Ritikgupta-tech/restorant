import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Calendar, Clock, Users, MapPin, X } from 'lucide-react';
import { useReservation } from '../../context/ReservationContext';
import { RESTAURANT_INFO } from '../../data/restaurantInfo';

export const ReservationSuccessModal = () => {
  const { isSuccessModalOpen, closeSuccessModal, latestBooking } = useReservation();

  if (!isSuccessModalOpen || !latestBooking) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSuccessModal}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          className="relative w-full max-w-lg bg-[#0F0E0D] border border-[#D6A84F]/50 shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 z-10 text-center"
        >
          {/* Gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D6A84F] to-transparent" />

          <button
            onClick={closeSuccessModal}
            className="absolute top-4 right-4 text-[#8A7E72] hover:text-[#F5F0E8] p-2 hover:bg-[#1A1814] transition-colors"
            aria-label="Close confirmation"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Success Icon */}
          <div className="w-16 h-16 mx-auto mb-4 bg-[#D6A84F]/10 border border-[#D6A84F]/40 flex items-center justify-center text-[#D6A84F] shadow-[0_0_25px_rgba(214,168,79,0.2)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D6A84F] font-semibold">
            Reservation Confirmed (Demo)
          </span>
          <h3 className="font-luxury text-3xl sm:text-4xl font-light text-[#F5F0E8] mt-1 mb-2">
            An Evening <span className="italic text-gradient-gold">Reserved</span>
          </h3>
          <p className="text-xs text-[#8A7E72] font-light max-w-md mx-auto mb-6">
            A confirmation placeholder has been registered with our Maitre d'. Please review your reservation ticket below.
          </p>

          {/* Booking Card */}
          <div className="bg-[#0A0908] border border-[#221F1A] p-5 text-left mb-6 space-y-3.5">
            <div className="flex items-center justify-between border-b border-[#1E1B15] pb-3">
              <div>
                <p className="text-[10px] text-[#6A6258] uppercase tracking-[0.2em] font-semibold">Booking Reference</p>
                <p className="font-mono text-base font-bold text-[#D6A84F]">{latestBooking.reservationId}</p>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase tracking-wider font-semibold">
                Simulated Confirmed
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#6A6258] block">Guest:</span>
                <p className="font-medium text-[#F5F0E8]">{latestBooking.fullName}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#6A6258] block">Party Size:</span>
                <p className="font-medium text-[#F5F0E8] flex items-center gap-1 font-mono">
                  <Users className="w-3.5 h-3.5 text-[#D6A84F]" />
                  {latestBooking.guests} {latestBooking.guests === 1 ? 'Guest' : 'Guests'}
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#6A6258] block">Reserved Date:</span>
                <p className="font-medium text-[#F5F0E8] flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-[#D6A84F]" />
                  {latestBooking.date}
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#6A6258] block">Seating Time:</span>
                <p className="font-medium text-[#F5F0E8] flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#D6A84F]" />
                  {latestBooking.time}
                </p>
              </div>
            </div>

            <div className="border-t border-[#1E1B15] pt-3 text-xs flex items-start gap-2 text-[#8A7E72]">
              <MapPin className="w-4 h-4 text-[#D6A84F] flex-shrink-0 mt-0.5" />
              <span className="font-light">{RESTAURANT_INFO.address.line1}, {RESTAURANT_INFO.address.city}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={closeSuccessModal}
              className="btn-luxury-primary w-full py-3.5 text-xs tracking-[0.2em]"
            >
              Done & Return
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
