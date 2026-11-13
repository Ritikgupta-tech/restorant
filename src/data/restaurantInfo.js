// Centralized Restaurant Brand & Configuration Data
// Explicitly identifies demo/prototype data per guidelines

export const RESTAURANT_INFO = {
  name: "The Sizzle Restaurant",
  tagline: "Good Food. Great Mood.",
  shortDescription: "Experience the perfect symphony of artisanal culinary art, warm hospitality, and unforgettable sizzles in a refined ambient setting.",
  foundedYear: "2018",
  currency: "₹",
  currencyCode: "INR",
  phone: "+91 98765 43210 (Demo Hotline)",
  email: "reservations@thesizzlerestaurant.demo",
  address: {
    line1: "42, Royal Promenade, Gold Crest Avenue",
    landmark: "Opposite Grand Orchid Palace",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    country: "India",
    googleMapsSearchUrl: "https://maps.google.com/?q=Mumbai+Fine+Dining",
  },
  openingHours: [
    { days: "Monday – Thursday", lunch: "12:00 PM – 03:30 PM", dinner: "07:00 PM – 11:30 PM" },
    { days: "Friday – Sunday", lunch: "12:00 PM – 04:00 PM", dinner: "07:00 PM – 12:30 AM" },
  ],
  socials: [
    { name: "Instagram", url: "https://instagram.com", handle: "@thesizzle.dining" },
    { name: "Facebook", url: "https://facebook.com", handle: "The Sizzle Fine Dine" },
    { name: "Twitter / X", url: "https://twitter.com", handle: "@thesizzledine" },
    { name: "TripAdvisor", url: "https://tripadvisor.com", handle: "The Sizzle Restaurant" },
  ],
  features: [
    {
      title: "Master Culinary Chefs",
      description: "Our world-class chefs blend classical cooking traditions with modern culinary art.",
      icon: "ChefHat",
    },
    {
      title: "Farm-Fresh Ingredients",
      description: "100% locally sourced organic produce, premium cuts, and artisanal farm spices.",
      icon: "Sparkles",
    },
    {
      title: "Atmospheric Ambience",
      description: "Soft charcoal tones, warm champagne lighting, and soothing acoustic jazz.",
      icon: "Flame",
    },
    {
      title: "White Glove Hospitality",
      description: "Attentive table service and bespoke dining experiences for every guest.",
      icon: "Award",
    },
  ],
  demoNotice: "Prototype Simulation Mode: All orders, table reservations, reviews, and payment steps are frontend demonstrations and do not process real transactions or restaurant bookings.",
};

export const ANNOUNCEMENTS = [
  "✨ Complimentary Chef's amuse-bouche on all weekend reservations!",
  "🔥 Sizzling Winter Flavours: Try our new Tandoori Sizzle Platter today.",
  "🛵 Express 35-min simulated gourmet delivery now available across central zones.",
];
