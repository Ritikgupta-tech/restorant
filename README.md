# The Sizzle Restaurant — Premium Website Prototype

> **Tagline:** Good Food. Great Mood.  
> **Brand Palette:** Charcoal Black (`#0B0B0B`), Champagne Gold (`#D6A84F`), Warm Amber (`#F59E0B`), Bone White (`#F8F5EF`).  
> **Typography:** Playfair Display (Headings) & Poppins (Body).

---

## 🍽️ Executive Overview

**The Sizzle Restaurant** is a high-end, responsive restaurant web prototype designed and architected to deliver a realistic digital customer experience.

From discovering artisanal dishes and filtering multi-cuisine menus to reserving intimate dining tables, managing a real-time persistent shopping cart, and completing a simulated checkout flow with itemized receipts.

---

## 🌟 Key Features & Workflows

### 1. Customer Journey & Core Routes
- **`/` — Homepage:**
  - Announcement bar with rotating restaurant offers & dine-in hours.
  - Cinematic hero section with slow zoom, gold-accent typography, and dual CTAs.
  - Four pillars highlight cards: Master Culinary Chefs, Farm-Fresh Ingredients, Atmospheric Ambience, White Glove Hospitality.
  - Curated cuisine categories (Indian, Chinese, Fast Food, Beverages, Desserts).
  - Featured dishes with live quick-view modals, wishlist toggles, and direct cart actions.
  - "About The Sizzle" story preview with chef philosophy.
  - Interactive testimonials carousel with identified sample demo reviews.
  - "Visit Us" location card with map directions CTA.
- **`/menu` — Complete Food Catalogue:**
  - Category filtering across all items and 5 distinct cuisines.
  - Real-time search by dish name, description, category, and ingredients.
  - Price sorting (Low to High, High to Low, Highest Rated, Featured).
  - Toggles for **"Veg Only"** and **"Popular Picks"**.
  - Custom empty states with a one-click filter reset action.
- **`/menu/:slug` — Food Detail Page:**
  - High-definition photography with interactive zoom and dietary badges.
  - Detailed ingredients breakdown, dietary classification, prep time, and calories.
  - Responsive quantity selector ensuring minimum threshold enforcement (never zero).
  - Add to cart and wishlist integration.
  - Shareable dish URL copy action.
  - "More From This Category" recommendations.
- **`/about` — Story & Culinary Philosophy:**
  - Background story of the restaurant since 2018.
  - Executive chef biographies and specialties.
  - Interactive 4-year milestone timeline.
  - Direct table reservation triggers.
- **`/gallery` — Atmospheric Gallery & Lightbox:**
  - Filterable by Category: Food, Dining Ambience, Interiors, Chef Experience.
  - Fullscreen lightbox with previous/next navigation and keyboard shortcuts (`Escape`, `ArrowLeft`, `ArrowRight`).
- **`/contact` — Contact & Location:**
  - Direct inquiry form with full Zod validation and success feedback.
  - Operating hours and physical address in Mumbai, India.
  - Directions action linking directly to Google Maps.
- **`/cart` — Shopping Cart Page:**
  - Real-time quantity adjustments and item removals.
  - Dynamic subtotal, demo packaging charge, and demo 5% restaurant GST.
  - Free delivery threshold tracker (Free above ₹500, else ₹50 demo fee).
  - Working promo codes (`SIZZLE20` for 20% off up to ₹150, `FIRSTBITE` for 15% off).
  - Persistent state across refreshes via `LocalStorage`.
- **`/checkout` — Multi-Step Checkout Simulation:**
  - Step 1: Customer details & complete delivery address (validates 10-digit Indian mobile and 6-digit PIN code).
  - Step 2: Payment method selection (Cash on Delivery simulation, Card simulation, UPI simulation).
  - Step 3: Order review with live recalculation.
  - Step 4: Submission creates a uniquely numbered order ID (`SZL-YYYY-XXXXX`).
- **`/order-success` — Order Confirmation:**
  - Celebratory confetti on order completion.
  - 3-stage animated order progress bar (Order Placed -> Kitchen Preparing -> Dispatched).
  - Itemized printable receipt with customer destination details.
  - Browser print action (`window.print()`).
- **`/privacy` & `/terms`:**
  - Transparent legal prototypes explicitly clarifying demo mode, LocalStorage usage, and absence of actual financial transactions.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + Vite 8 |
| **Styling** | Tailwind CSS v3 |
| **Routing** | React Router DOM v7 |
| **Icons** | Lucide React |
| **Animations** | Framer Motion |
| **Forms & Validation** | React Hook Form + Zod (`@hookform/resolvers`) |
| **Celebrations** | Canvas Confetti |
| **Persistence** | Browser `LocalStorage` |

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+` or `v20+` (tested on Node v22)
- npm `v9+` or `v10+`

### Installation & Run

```bash
# Clone the repository / navigate to project directory
cd rest

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build

```bash
# Compile and bundle for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🔒 Prototype Simulation Disclosure

This project is a **frontend-only interactive prototype**:
- All prices are prototype demonstration values in Indian Rupees (INR).
- Reviews, table bookings, and payment methods are client-side simulations.
- No real financial transactions are executed, and no live restaurant orders are dispatched.
