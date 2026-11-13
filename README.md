# The Sizzle Restaurant — Premium Luxury Prototype

> **Live Deployment:** [https://rest-delta-rust.vercel.app](https://rest-delta-rust.vercel.app)  
> **GitHub Repository:** [https://github.com/Ritikgupta-tech/restorant](https://github.com/Ritikgupta-tech/restorant)  
> **Tagline:** Good Food. Great Mood.  
> **Brand Palette:** Obsidian Black (`#080807`), Champagne Gold (`#D6A84F`), Warm Amber (`#F59E0B`), Ivory Bone (`#F5F0E8`).  
> **Typography:** Cormorant Garamond (Editorial Luxury Display), Playfair Display, & Poppins (Modern Body).

---

## 🍽️ Executive Overview

**The Sizzle Restaurant** is a high-end luxury digital dining prototype inspired by world-class restaurant websites (Nobu, Zuma, Gaggan Anand). It showcases the complete customer journey — from atmospheric storytelling and interactive food exploration to real-time cart curation, table reservations, and simulated checkout with live tracking.

---

## 🌐 Live URLs

- **Production URL:** [https://rest-delta-rust.vercel.app](https://rest-delta-rust.vercel.app)
- **Deployment URL:** [https://rest-jknt0sv9x-ritik95061-1508s-projects.vercel.app](https://rest-jknt0sv9x-ritik95061-1508s-projects.vercel.app)
- **GitHub Repository:** [https://github.com/Ritikgupta-tech/restorant.git](https://github.com/Ritikgupta-tech/restorant.git)

---

## ✨ Luxury Features & Animations

### 1. Visual & Interaction Architecture
- **Parallax Hero Section:** Multi-layer parallax scroll with smooth opacity fades, floating ember particles, and a subtle scroll indicator.
- **Marquee & Live Counters:** Smooth scrolling metrics strip with animated count-up numbers for years of heritage, guest ratings, and dishes.
- **Scroll Reveal System:** Custom spring-physics entrance animations for section titles, cards, and grid items.
- **Masonry Visual Gallery:** High-definition photography with interactive hover zooms and lightbox modal with keyboard navigation.
- **Live Slide-Over Cart Drawer & Quick-View:** Seamless backdrop-blur modal windows allowing fast item configuration and instant cart adjustments.

### 2. Customer Journey & Core Routes
- **`/` — Homepage:**
  - Dynamic announcement ticker with promotions and operating hours.
  - Parallax cinematic hero with dual gold CTA buttons.
  - Interactive culinary categories with live count badges.
  - Featured dishes with Dietary/Spice badges, quick view, and wishlist toggles.
  - Story split section with authentic chef philosophy and floating stats card.
  - Sample guest reviews carousel.
  - Salon location and Google Maps directions CTA.
- **`/menu` — Food Catalogue:**
  - Real-time instant search across dish names, categories, and ingredients.
  - Category filters, price sorting, and dietary chips (100% Veg, Chef Signature, Guest Favorites).
  - Staggered dish card reveal with quick-view modals.
- **`/menu/:slug` — Individual Food Detail:**
  - High-res culinary photography with gold corner accents.
  - Key ingredients and heritage spices tag cloud.
  - Responsive portion quantity selector.
  - Shareable link generator with clipboard feedback.
  - Curated complementary delicacies recommendations.
- **`/about` — Story & Culinary Philosophy:**
  - Founder's culinary journey and four pillars of The Sizzle standard.
  - Executive Chef portraits and bios.
  - Four-stage milestone timeline from 2018 to present.
- **`/gallery` — Visual Odyssey:**
  - Category filters (Food & Sizzles, Dining Ambience, Velvet Salons, Culinary Craft).
  - Responsive image grid with hover captions.
  - HD Lightbox modal with next/previous controls and ESC key dismissal.
- **`/contact` — Salon Concierge & Location:**
  - Concierge desk hotline, physical address, and operating hours.
  - Validated inquiry form with instant toast notifications.
  - Direct Google Maps redirection.
- **`/cart` — Dining Cart:**
  - Real-time subtotal, GST (5% Demo), and eco packaging fees.
  - Free delivery threshold tracker (Complimentary above ₹500).
  - Functional promo codes (`SIZZLE20` for 20% savings, `FIRSTBITE` for 15%).
  - LocalStorage persistence across sessions.
- **`/checkout` — Multi-Step Checkout Simulation:**
  - Step 1: Customer coordinates and 10-digit mobile validation.
  - Step 2: Payment method simulator (Card Sandbox, UPI Sandbox, Cash on Delivery).
  - Step 3: Order review with live breakdown and simulated authorization.
- **`/order-success` — Order Confirmation & Live Tracker:**
  - Celebratory confetti on order completion.
  - 3-stage animated timeline: Order Placed → At the Stoves → Out for Dispatch.
  - Itemized printable receipt with browser print integration (`window.print()`).
- **`/privacy` & `/terms`:**
  - Prototype simulation legal disclaimers.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + Vite 8 |
| **Styling** | Tailwind CSS v3 + Custom Luxury Design System |
| **Routing** | React Router DOM v7 (Lazy Loaded with Suspense) |
| **Icons** | Lucide React |
| **Animations** | Framer Motion (Parallax, Spring, AnimatePresence) |
| **Forms & Validation** | React Hook Form + Zod (`@hookform/resolvers`) |
| **Celebrations** | Canvas Confetti |
| **State & Persistence** | React Context API + Browser `LocalStorage` |
| **Hosting & CI/CD** | Vercel (Auto-deploy on GitHub push) |

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/Ritikgupta-tech/restorant.git
cd restorant

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 🔒 Prototype Disclosure

This website is a **frontend-only interactive prototype**:
- Prices are demonstration values in Indian Rupees (₹).
- Reservations, orders, and payment methods are client-side simulations.
- No real credit card or payment information is ever requested, stored, or processed.
