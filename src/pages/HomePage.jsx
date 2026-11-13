import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Utensils,
  ArrowRight,
  Sparkles,
  Flame,
  ChefHat,
  Award,
  Clock,
  MapPin,
  Phone,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Eye,
} from 'lucide-react';
import { DISHES, CATEGORIES } from '../data/dishes';
import { TESTIMONIALS } from '../data/testimonials';
import { GALLERY_ITEMS } from '../data/gallery';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { DishCard } from '../components/menu/DishCard';
import { DishQuickViewModal } from '../components/menu/DishQuickViewModal';
import { useReservation } from '../context/ReservationContext';

export const HomePage = () => {
  const { openReservation } = useReservation();
  const [selectedQuickDish, setSelectedQuickDish] = useState(null);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const featuredDishes = DISHES.filter((d) => d.isFeatured).slice(0, 6);
  const previewGallery = GALLERY_ITEMS.slice(0, 6);

  const nextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="relative overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Hero Image with Slow Zoom Animation */}
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: 'easeOut' }}
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1920&q=85"
            alt="The Sizzle Restaurant Fine Dining Ambience"
            className="w-full h-full object-cover"
          />
          {/* Cinematic Dark Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/75 to-[#0B0B0B]/40" />
          <div className="absolute inset-0 bg-radial-vignette opacity-70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1813]/80 border border-[#D6A84F]/40 backdrop-blur-md text-[#D6A84F] text-xs font-semibold uppercase tracking-[0.2em] mb-6 shadow-gold-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome To Fine Dining Excellence</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F8F5EF] leading-[1.1] mb-6"
          >
            Welcome to <br />
            <span className="gold-gradient-text">The Sizzle Restaurant</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-xl text-[#AAA39A] max-w-2xl mx-auto font-light leading-relaxed mb-10"
          >
            Experience the perfect blend of taste, ambience and hospitality. Savor hand-curated multi-cuisine masterpieces in a warm champagne-lit sanctuary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/menu"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] font-bold text-sm uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all shadow-gold-sm flex items-center justify-center gap-2"
            >
              <span>Order Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={openReservation}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#161410]/80 hover:bg-[#201D17] border border-[#D6A84F]/40 text-[#F8F5EF] font-semibold text-sm uppercase tracking-wider backdrop-blur-md hover:border-[#D6A84F] transition-all flex items-center justify-center gap-2"
            >
              <Flame className="w-4 h-4 text-[#D6A84F]" />
              <span>Reserve a Table</span>
            </button>
          </motion.div>
        </div>

        {/* Ambient bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0B0B0B] to-transparent z-10 pointer-events-none" />
      </section>

      {/* 2. RESTAURANT HIGHLIGHTS */}
      <section className="relative z-10 py-12 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {RESTAURANT_INFO.features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-[#151310]/95 border border-[#2D271D] hover:border-[#D6A84F]/50 rounded-2xl p-6 shadow-xl backdrop-blur-md transition-all group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-[#201C15] border border-[#D6A84F]/30 flex items-center justify-center text-[#D6A84F] mb-4 group-hover:scale-110 group-hover:border-[#D6A84F] transition-all">
                {idx === 0 && <ChefHat className="w-6 h-6" />}
                {idx === 1 && <Sparkles className="w-6 h-6" />}
                {idx === 2 && <Flame className="w-6 h-6" />}
                {idx === 3 && <Award className="w-6 h-6" />}
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F8F5EF] mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs text-[#AAA39A] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. POPULAR CUISINE CATEGORIES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6A84F] block mb-2">
            Curated Palate
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8F5EF]">
            Popular Categories
          </h2>
          <div className="w-16 h-[2px] bg-[#D6A84F] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
            <Link
              key={cat.id}
              to={`/menu?category=${cat.id}`}
              className="group relative bg-[#161411] border border-[#29241B] hover:border-[#D6A84F] rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-sm flex flex-col items-center justify-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#1F1B14] border border-[#3A3326] group-hover:border-[#D6A84F] flex items-center justify-center text-[#D6A84F] mb-3 group-hover:scale-110 transition-all">
                {cat.id === 'indian' && <Flame className="w-6 h-6" />}
                {cat.id === 'chinese' && <Utensils className="w-6 h-6" />}
                {cat.id === 'fast-food' && <Sparkles className="w-6 h-6" />}
                {cat.id === 'beverages' && <Clock className="w-6 h-6" />}
                {cat.id === 'desserts' && <Award className="w-6 h-6" />}
              </div>
              <h3 className="font-serif text-base font-bold text-[#F8F5EF] group-hover:text-[#D6A84F] transition-colors">
                {cat.name}
              </h3>
              <span className="text-[11px] text-[#AAA39A] mt-1">
                {cat.count} Masterpieces
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED SIGNATURE DISHES */}
      <section className="py-20 bg-[#100E0C] border-y border-[#262017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6A84F] block mb-2">
                Chef's Handpicked
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8F5EF]">
                Featured Signature Dishes
              </h2>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-[#D6A84F] hover:text-[#F3DC9B] transition-colors"
            >
              <span>Explore Complete Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredDishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onQuickView={(d) => setSelectedQuickDish(d)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. ABOUT RESTAURANT HIGHLIGHT SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#D6A84F]/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80"
                alt="The Sizzle Interior Atmosphere"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#14120E]/90 border border-[#D6A84F]/30 backdrop-blur-md">
                <p className="font-serif text-base font-bold text-[#F8F5EF]">
                  "Cooking is an act of romance and patience."
                </p>
                <p className="text-xs text-[#D6A84F] mt-1">— Executive Culinary Master</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6A84F] block">
              Our Food Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8F5EF] leading-tight">
              Crafting Unforgettable Flavours Since 2018
            </h2>
            <p className="text-sm text-[#AAA39A] leading-relaxed">
              At The Sizzle Restaurant, our kitchen is an artisanal sanctuary where ancient Indian clay-oven traditions meet bold Szechuan wok heat and European baking craft. Every recipe is calibrated with hand-ground spices, cold-pressed oils, and farm-fresh harvest.
            </p>
            <p className="text-sm text-[#AAA39A] leading-relaxed">
              Whether you are sharing an intimate candlelit celebration or enjoying our express simulated gourmet delivery at home, we deliver good food that inspires a truly great mood.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/about"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={openReservation}
                className="px-6 py-3 rounded-xl bg-[#191612] border border-[#3A3326] hover:border-[#D6A84F] text-xs font-semibold text-[#F8F5EF] hover:bg-[#221E18] transition-all"
              >
                Reserve Table Experience
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GALLERY PREVIEW */}
      <section className="py-20 bg-[#100E0C] border-y border-[#262017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6A84F] block mb-2">
              Atmosphere & Artistry
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8F5EF]">
              Gallery Preview
            </h2>
            <div className="w-16 h-[2px] bg-[#D6A84F] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {previewGallery.map((item) => (
              <Link
                key={item.id}
                to="/gallery"
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#2D261B] hover:border-[#D6A84F]/60 shadow-lg block"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <span className="text-[11px] text-[#D6A84F] uppercase tracking-wider font-semibold">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-sm sm:text-base font-bold text-[#F8F5EF]">
                    {item.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1A1813] border border-[#D6A84F]/40 text-[#D6A84F] text-xs font-bold uppercase tracking-wider hover:bg-[#D6A84F] hover:text-[#0B0B0B] transition-all shadow-md"
            >
              <span>Explore Full Photo Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS CAROUSEL (Explicitly Identified Demo Mode) */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6A84F] block mb-2">
            Guest Impressions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8F5EF]">
            Words From Our Guests
          </h2>
          <p className="text-xs text-[#8A8376] mt-2">
            Identified sample testimonials presented in interactive prototype mode.
          </p>
        </div>

        <div className="relative bg-[#161411] border border-[#2F2920] rounded-3xl p-6 sm:p-10 shadow-2xl">
          <Quote className="w-12 h-12 text-[#D6A84F]/20 absolute top-6 right-6" />

          {/* Testimonial card */}
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="flex justify-center gap-1 text-amber-400">
              {[...Array(TESTIMONIALS[activeTestimonialIdx].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F8F5EF]">
              "{TESTIMONIALS[activeTestimonialIdx].title}"
            </h3>

            <p className="text-sm sm:text-base text-[#AAA39A] leading-relaxed italic">
              "{TESTIMONIALS[activeTestimonialIdx].comment}"
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <img
                src={TESTIMONIALS[activeTestimonialIdx].avatar}
                alt={TESTIMONIALS[activeTestimonialIdx].author}
                className="w-12 h-12 rounded-full object-cover border border-[#D6A84F]/40"
              />
              <div className="text-left">
                <h4 className="text-sm font-bold text-[#F8F5EF]">
                  {TESTIMONIALS[activeTestimonialIdx].author}
                </h4>
                <p className="text-xs text-[#D6A84F]">
                  {TESTIMONIALS[activeTestimonialIdx].role}
                </p>
              </div>
            </div>
          </div>

          {/* Carousel navigation controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#262118]">
            <button
              onClick={prevTestimonial}
              className="p-2.5 rounded-xl bg-[#201D17] border border-[#352F24] hover:border-[#D6A84F] text-[#AAA39A] hover:text-[#F8F5EF] transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonialIdx(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === activeTestimonialIdx ? 'w-6 bg-[#D6A84F]' : 'w-2 bg-[#332E25]'
                  }`}
                  aria-label={`Jump to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2.5 rounded-xl bg-[#201D17] border border-[#352F24] hover:border-[#D6A84F] text-[#AAA39A] hover:text-[#F8F5EF] transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. VISIT US & LOCATION SECTION */}
      <section className="py-20 bg-[#100E0C] border-t border-[#262017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6A84F] block">
                Find Our Table
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8F5EF]">
                Visit The Sizzle
              </h2>
              <p className="text-sm text-[#AAA39A] leading-relaxed">
                Conveniently situated in the city's premier dining district. Join us for a celebratory dinner, leisurely lunch, or late-night dessert craving.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#1A1813] border border-[#D6A84F]/30 text-[#D6A84F]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#F8F5EF]">Address</h4>
                    <p className="text-xs text-[#AAA39A] mt-0.5">
                      {RESTAURANT_INFO.address.line1}, {RESTAURANT_INFO.address.landmark}, {RESTAURANT_INFO.address.city} - {RESTAURANT_INFO.address.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#1A1813] border border-[#D6A84F]/30 text-[#D6A84F]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#F8F5EF]">Opening Hours</h4>
                    <p className="text-xs text-[#AAA39A] mt-0.5">
                      Monday – Thursday: 12:00 PM – 11:30 PM <br />
                      Friday – Sunday: 12:00 PM – 12:30 AM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#1A1813] border border-[#D6A84F]/30 text-[#D6A84F]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#F8F5EF]">Direct Hotline (Demo)</h4>
                    <p className="text-xs text-[#AAA39A] font-mono mt-0.5">
                      {RESTAURANT_INFO.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href={RESTAURANT_INFO.address.googleMapsSearchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md inline-flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
                <button
                  onClick={openReservation}
                  className="px-6 py-3 rounded-xl bg-[#1A1813] border border-[#3A3326] hover:border-[#D6A84F] text-xs font-semibold text-[#F8F5EF] transition-all"
                >
                  Book a Table Now
                </button>
              </div>
            </div>

            {/* Map Placeholder Card */}
            <div className="relative rounded-3xl overflow-hidden border border-[#2F2920] bg-[#171512] h-[360px] flex flex-col items-center justify-center p-6 text-center shadow-xl">
              <div className="w-16 h-16 rounded-full bg-[#201D17] border border-[#D6A84F]/30 flex items-center justify-center text-[#D6A84F] mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#F8F5EF] mb-1">
                The Sizzle Fine Dining
              </h4>
              <p className="text-xs text-[#AAA39A] max-w-sm mb-6">
                Royal Promenade, Gold Crest Avenue, Mumbai
              </p>
              <a
                href={RESTAURANT_INFO.address.googleMapsSearchUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#211E18] hover:bg-[#D6A84F] hover:text-[#0B0B0B] text-xs font-semibold text-[#F8F5EF] border border-[#3A3326] transition-all"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {selectedQuickDish && (
        <DishQuickViewModal
          dish={selectedQuickDish}
          onClose={() => setSelectedQuickDish(null)}
        />
      )}
    </div>
  );
};
