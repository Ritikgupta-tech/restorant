import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Calendar, Clock, Users, MapPin, X, Download, Share2 } from 'lucide-react';
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
          className="fixed inset-0 bg-black/85 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-[#14120F] border border-[#D6A84F]/50 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 text-center"
        >
          <button
            onClick={closeSuccessModal}
            className="absolute top-4 right-4 text-[#AAA39A] hover:text-[#F8F5EF] p-2 hover:bg-[#201D17] rounded-lg transition-colors"
            aria-label="Close confirmation"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Success Icon */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D6A84F]/15 border border-[#D6A84F]/40 flex items-center justify-center text-[#D6A84F]">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-xs uppercase tracking-widest text-[#D6A84F] font-semibold">
            Reservation Confirmed (Demo)
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F5EF] mt-1 mb-2">
            We Look Forward To Welcoming You!
          </h3>
          <p className="text-xs text-[#AAA39A] max-w-md mx-auto mb-6">
            A confirmation placeholder has been generated for your party. Please review your booking card below.
          </p>

          {/* Booking Card */}
          <div className="bg-[#1A1814] border border-[#2F2920] rounded-2xl p-5 text-left mb-6 space-y-3.5">
            <div className="flex items-center justify-between border-b border-[#2B251B] pb-3">
              <div>
                <p className="text-[11px] text-[#AAA39A] uppercase tracking-wider">Booking ID</p>
                <p className="font-mono text-base font-bold text-[#D6A84F]">{latestBooking.reservationId}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                Simulated Confirmed
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#AAA39A]">Guest Name:</span>
                <p className="font-semibold text-[#F8F5EF]">{latestBooking.fullName}</p>
              </div>
              <div>
                <span className="text-[#AAA39A]">Party Size:</span>
                <p className="font-semibold text-[#F8F5EF] flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#D6A84F]" />
                  {latestBooking.guests} {latestBooking.guests === 1 ? 'Guest' : 'Guests'}
                </p>
              </div>
              <div>
                <span className="text-[#AAA39A]">Date:</span>
                <p className="font-semibold text-[#F8F5EF] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#D6A84F]" />
                  {latestBooking.date}
                </p>
              </div>
              <div>
                <span className="text-[#AAA39A]">Time Slot:</span>
                <p className="font-semibold text-[#F8F5EF] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D6A84F]" />
                  {latestBooking.time}
                </p>
              </div>
            </div>

            <div className="border-t border-[#2B251B] pt-3 text-xs flex items-start gap-2 text-[#AAA39A]">
              <MapPin className="w-4 h-4 text-[#D6A84F] flex-shrink-0 mt-0.5" />
              <span>{RESTAURANT_INFO.address.line1}, {RESTAURANT_INFO.address.city}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={closeSuccessModal}
              className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] font-bold text-sm hover:brightness-110 transition-all shadow-md"
            >
              Done & Return
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
