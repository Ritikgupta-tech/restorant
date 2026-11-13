import { z } from 'zod';

// Phone number regex for 10 digit Indian numbers
const phoneRegex = /^[6-9]\d{9}$/;
const pincodeRegex = /^[1-9][0-9]{5}$/;

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(60, "Name is too long"),
  mobileNumber: z.string().regex(phoneRegex, "Enter a valid 10-digit Indian mobile number (starts with 6-9)"),
  email: z.string().email("Please enter a valid email address"),
  deliveryAddress: z.string().min(10, "Please provide complete street address (min 10 characters)"),
  landmark: z.string().optional(),
  city: z.string().min(2, "Please enter your city"),
  pincode: z.string().regex(pincodeRegex, "Please enter a valid 6-digit Indian PIN code"),
  paymentMethod: z.enum(["cod", "online", "upi"], {
    errorMap: () => ({ message: "Please select a payment method" }),
  }),
  deliveryNotes: z.string().max(200, "Notes cannot exceed 200 characters").optional(),
});

export const reservationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string().regex(phoneRegex, "Enter a valid 10-digit Indian phone number"),
  email: z.string().email("Enter a valid email address"),
  date: z.string().min(1, "Please select reservation date"),
  time: z.string().min(1, "Please select a time slot"),
  guests: z.coerce.number().min(1, "At least 1 guest is required").max(20, "For parties over 20, please contact us directly"),
  seatingArea: z.enum(["indoor", "terrace", "private_salon", "bar_lounge"], {
    errorMap: () => ({ message: "Select preferred seating" }),
  }),
  specialRequests: z.string().max(250, "Special requests must not exceed 250 characters").optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().regex(phoneRegex, "Enter a valid 10-digit phone number").optional().or(z.literal('')),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(15, "Message must be at least 15 characters long"),
});
