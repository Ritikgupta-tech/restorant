import React, { createContext, useContext, useState } from 'react';
import { generateDemoReservationId } from '../utils/formatters';
import { useToast } from './ToastContext';

const RESERVATION_STORAGE_KEY = 'the_sizzle_reservations_v1';
const ReservationContext = createContext(null);

export const ReservationProvider = ({ children }) => {
  const { addToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [latestBooking, setLatestBooking] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const openReservation = () => setIsModalOpen(true);
  const closeReservation = () => setIsModalOpen(false);

  const makeReservation = (data) => {
    const reservationId = generateDemoReservationId();
    const newBooking = {
      ...data,
      reservationId,
      createdAt: new Date().toISOString(),
      status: 'Confirmed (Demo Prototype)',
    };

    try {
      const existing = JSON.parse(localStorage.getItem(RESERVATION_STORAGE_KEY) || '[]');
      localStorage.setItem(RESERVATION_STORAGE_KEY, JSON.stringify([newBooking, ...existing]));
    } catch (e) {
      console.error('Failed to store reservation:', e);
    }

    setLatestBooking(newBooking);
    setIsModalOpen(false);
    setIsSuccessModalOpen(true);
    addToast(`Table request reserved for ${data.fullName}! (Booking ID: ${reservationId})`, 'success');
    return newBooking;
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <ReservationContext.Provider
      value={{
        isModalOpen,
        openReservation,
        closeReservation,
        makeReservation,
        latestBooking,
        isSuccessModalOpen,
        closeSuccessModal,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) throw new Error('useReservation must be used within ReservationProvider');
  return context;
};
