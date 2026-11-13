import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Utensils, ArrowRight, Sparkles, Flame, ChefHat, Award, Clock,
  MapPin, Phone, ChevronLeft, ChevronRight, Star, Quote, Play,
  Leaf, TrendingUp, Wine, Coffee,
} from 'lucide-react';
import { DISHES, CATEGORIES } from '../data/dishes';
import { TESTIMONIALS } from '../data/testimonials';
import { GALLERY_ITEMS } from '../data/gallery';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { DishCard } from '../components/menu/DishCard';
import { DishQuickViewModal } from '../components/menu/DishQuickViewModal';
import { useReservation } from '../context/ReservationContext';

/* ── Scroll-reveal wrapper ── */
const Reveal = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ── Animated counter ── */
const Counter = ({ target, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
};

/* ── Floating particle ── */
const FloatingParticle = ({ style }) => (
  <motion.div
    className="absolute rounded-full bg-[#D6A84F] pointer-events-none"
    style={style}
    animate={{ y: [-20, 20, -20], opacity: [0.1, 0.5, 0.1], scale: [1, 1.5, 1] }}
    transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 3 }}
  />
);

export const HomePage = () => {
  const { openReservation } = useReservation();
  const [selectedQuickDish, setSelectedQuickDish] = useState(null);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.1]);

  const featuredDishes = DISHES.filter((d) => d.isFeatured).slice(0, 6);
  const previewGallery = GALLERY_ITEMS.slice(0, 6);

  // Auto advance testimonials
  useEffect(() => {
    const t = setInterval(() => {
      setActiveTestimonialIdx(p => (p + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  // Category icons
  const catConfig = {
    indian: { icon: Flame, label: 'Indian', img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80' },
    chinese: { icon: Utensils, label: 'Chinese', img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=400&q=80' },
    'fast-food': { icon: TrendingUp, label: 'Fast Food', img: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=400&q=80' },
    beverages: { icon: Coffee, label: 'Beverages', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80' },
    desserts: { icon: Award, label: 'Desserts', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80' },
  };

  return (
    <div className="bg-luxury-gradient overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════
          1. CINEMATIC HERO
         ══════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY, scale: heroScale }}>
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=90"
            alt="Fine Dining Ambience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080807]/50 via-[#080807]/65 to-[#080807]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080807]/40 via-transparent to-[#080807]/30" />
        </motion.div>

        {/* Ambient particles */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <FloatingParticle key={i} style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${10 + Math.random() * 80}%`,
              top: `${20 + Math.random() * 60}%`,
            }} />
          ))}
        </div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 text-center py-32"
        >
          {/* Pre-heading badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D6A84F]" />
            <span className="badge-luxury">
              <Sparkles className="w-3 h-3" />
              Premium Fine Dining & Lounge
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D6A84F]" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-luxury font-light text-[#F5F0E8] leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: 'clamp(52px, 10vw, 120px)' }}
          >
            The Art of
            <br />
            <em className="gold-text not-italic font-semibold">Sizzle</em>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#D6A84F] to-transparent mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="text-sm sm:text-lg font-light text-[#C8BEB0] max-w-2xl mx-auto leading-relaxed tracking-wide mb-12"
          >
            Where culinary artistry meets timeless elegance. Experience handcrafted masterpieces, 
            rare spice journeys, and candlelit dining in Mumbai's most celebrated kitchen.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/menu" className="btn-luxury-primary group w-full sm:w-auto">
              <span>Explore Our Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button onClick={openReservation} className="btn-luxury-outline w-full sm:w-auto">
              <Flame className="w-4 h-4 text-[#D6A84F] animate-flicker" />
              <span>Reserve a Table</span>
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-[#D6A84F]/50"
            >
              <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-[#D6A84F]/50 to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. MARQUEE STATS BAR
         ══════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden border-y border-[#D6A84F]/15 bg-[#0F0E0C] py-5">
        <div className="animate-marquee flex gap-0 whitespace-nowrap select-none">
          {[...Array(2)].map((_, arrIdx) => (
            <div key={arrIdx} className="flex items-center gap-0">
              {[
                { label: 'Dishes on Menu', value: '24+', icon: Utensils },
                { label: 'Happy Guests (Demo)', value: '10K+', icon: Star },
                { label: 'Years of Sizzle', value: '8+', icon: Award },
                { label: 'Expert Chefs', value: '12', icon: ChefHat },
                { label: 'Cuisine Categories', value: '5', icon: Flame },
                { label: 'Private Dining Rooms', value: '3', icon: Wine },
              ].map((stat, i) => (
                <div key={i} className="inline-flex items-center gap-10 px-12">
                  <div className="flex items-center gap-4">
                    <stat.icon className="w-4 h-4 text-[#D6A84F]" />
                    <span className="font-luxury text-2xl text-[#D6A84F]">{stat.value}</span>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#A09080]">{stat.label}</span>
                  </div>
                  <div className="w-[1px] h-6 bg-[#D6A84F]/20" />
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0F0E0C] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0F0E0C] to-transparent pointer-events-none z-10" />
      </div>

      {/* ══════════════════════════════════════════════════════
          3. RESTAURANT HIGHLIGHTS — FOUR PILLARS
         ══════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-dot-grid">
        <div className="container-luxury">
          <Reveal className="section-header mb-16">
            <span className="section-label">The Sizzle Experience</span>
            <h2 className="section-title">Why Guests Return</h2>
            <div className="section-divider mt-4" />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESTAURANT_INFO.features.map((item, idx) => {
              const icons = [ChefHat, Sparkles, Flame, Award];
              const Icon = icons[idx];
              return (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="card-luxury p-8 h-full flex flex-col group cursor-default">
                    <div className="relative mb-6">
                      <div className="w-14 h-14 rounded-luxury bg-gradient-to-br from-[#D6A84F]/15 to-[#D6A84F]/5 border border-[#D6A84F]/30 flex items-center justify-center transition-all duration-500 group-hover:border-[#D6A84F] group-hover:shadow-gold-sm">
                        <Icon className="w-6 h-6 text-[#D6A84F]" />
                      </div>
                      <div className="absolute -top-1 -left-1 text-6xl font-luxury font-bold text-[#D6A84F]/5 select-none leading-none">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#F5F0E8] mb-3 group-hover:text-[#D6A84F] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#A09080] leading-relaxed flex-1">
                      {item.description}
                    </p>
                    <div className="mt-6 h-[1px] bg-gradient-to-r from-[#D6A84F]/40 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. CUISINE CATEGORIES — IMMERSIVE CARDS
         ══════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#0A0908]">
        <div className="container-luxury">
          <Reveal className="section-header mb-16">
            <span className="section-label">Curated Palate</span>
            <h2 className="section-title">Explore by Cuisine</h2>
            <div className="section-divider mt-4" />
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.filter(c => c.id !== 'all').map((cat, idx) => {
              const cfg = catConfig[cat.id];
              const Icon = cfg?.icon || Flame;
              const isHovered = hoveredCategory === cat.id;
              return (
                <Reveal key={cat.id} delay={idx * 0.08}>
                  <Link
                    to={`/menu?category=${cat.id}`}
                    onMouseEnter={() => setHoveredCategory(cat.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    className="relative group block aspect-[3/4] rounded-luxury overflow-hidden border border-[#D6A84F]/15 hover:border-[#D6A84F]/50 transition-all duration-500"
                  >
                    {/* Background image */}
                    <div className="absolute inset-0 overflow-hidden">
                      {cfg?.img && (
                        <motion.img
                          src={cfg.img}
                          alt={cat.name}
                          className="w-full h-full object-cover"
                          animate={{ scale: isHovered ? 1.1 : 1 }}
                          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                        />
                      )}
                    </div>
                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080807]/95 via-[#080807]/40 to-[#080807]/10" />
                    <motion.div
                      className="absolute inset-0 bg-[#D6A84F]/10"
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.4 }}
                    />
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5">
                      <div className="mb-3">
                        <div className={`w-10 h-10 rounded-luxury flex items-center justify-center transition-all duration-400 ${isHovered ? 'bg-[#D6A84F] text-[#080807]' : 'bg-[#D6A84F]/15 text-[#D6A84F] border border-[#D6A84F]/30'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <h3 className="font-display text-base font-bold text-[#F5F0E8] mb-1 group-hover:text-[#D6A84F] transition-colors">
                        {cat.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#A09080] uppercase tracking-[0.15em]">
                          {DISHES.filter(d => d.category === cat.id).length} Dishes
                        </span>
                        <motion.div
                          animate={{ x: isHovered ? 0 : 8, opacity: isHovered ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowRight className="w-3.5 h-3.5 text-[#D6A84F]" />
                        </motion.div>
                      </div>
                    </div>
                    {/* Top gold line on hover */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D6A84F] to-transparent"
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. FEATURED SIGNATURE DISHES
         ══════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#080807]">
        <div className="container-luxury">
          <Reveal>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16">
              <div>
                <span className="section-label">Chef's Handpicked Selection</span>
                <h2 className="section-title mt-2 text-left">Signature Dishes</h2>
                <div className="section-divider-left mt-4" />
              </div>
              <Link
                to="/menu"
                className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#D6A84F] hover-underline-gold"
              >
                <span>View Complete Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredDishes.map((dish, idx) => (
              <Reveal key={dish.id} delay={idx * 0.08}>
                <DishCard dish={dish} onQuickView={(d) => setSelectedQuickDish(d)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. ABOUT / STORY SPLIT SECTION
         ══════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#0A0908]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: imagery composition */}
            <Reveal direction="left">
              <div className="relative">
                {/* Main image */}
                <div className="relative z-10 img-overlay-hover rounded-luxury overflow-hidden border border-[#D6A84F]/20">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"
                    alt="The Sizzle Dining Hall"
                    className="w-full h-[520px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080807]/80 to-transparent" />
                </div>
                {/* Floating accent quote card */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="absolute -bottom-6 -right-6 max-w-xs glass-card p-6 rounded-luxury shadow-luxury z-20"
                >
                  <Quote className="w-6 h-6 text-[#D6A84F] mb-3 opacity-60" />
                  <p className="font-luxury text-base italic text-[#F5F0E8] leading-relaxed">
                    "Cooking is not a craft — it is poetry written in fire and spice."
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-8 h-[1px] bg-[#D6A84F]" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#D6A84F]">Executive Chef</span>
                  </div>
                </motion.div>

                {/* Small overlay stat badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.7 }}
                  className="absolute -top-4 -left-4 glass-card px-5 py-4 rounded-luxury z-20 text-center"
                >
                  <div className="stat-counter text-3xl text-[#D6A84F]">8+</div>
                  <div className="text-[9px] uppercase tracking-[0.2em] text-[#A09080] mt-1">Years of Excellence</div>
                </motion.div>
              </div>
            </Reveal>

            {/* Right: Story text */}
            <Reveal direction="right" delay={0.2}>
              <div className="space-y-6">
                <div>
                  <span className="section-label">Our Culinary Philosophy</span>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F0E8] mt-3 leading-[1.1]">
                    Where Fire, Flavour &
                    <br />
                    <span className="gold-text">Elegance Unite</span>
                  </h2>
                  <div className="section-divider-left mt-5" />
                </div>

                <p className="text-sm text-[#A09080] leading-relaxed">
                  At The Sizzle Restaurant, we believe dining is an act of intimacy — a conversation between the chef's vision and the guest's soul. Since 2018, our kitchen has been a sanctuary where ancient Indian clay-oven traditions harmonise with Szechuan wok fire and Parisian pastry craft.
                </p>

                <p className="text-sm text-[#A09080] leading-relaxed">
                  Every spice is stone-ground in our own spice atelier. Every sauce is slow-reduced over hours. Every plate is an act of obsession.
                </p>

                {/* Key attributes */}
                <div className="grid grid-cols-2 gap-4 py-4">
                  {[
                    { icon: Leaf, text: 'Organic Farm Sourcing' },
                    { icon: ChefHat, text: 'Michelin-Standard Chefs' },
                    { icon: Wine, text: 'Curated Wine Cellar' },
                    { icon: Award, text: 'Award Dining Heritage' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-luxury bg-[#D6A84F]/10 border border-[#D6A84F]/25 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-[#D6A84F]" />
                      </div>
                      <span className="text-xs font-medium text-[#C8BEB0]">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link to="/about" className="btn-luxury-primary">
                    <span>Read Our Story</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button onClick={openReservation} className="btn-luxury-outline">
                    Reserve a Table
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. GALLERY PREVIEW — MASONRY-STYLE
         ══════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#080807] border-t border-[#D6A84F]/10">
        <div className="container-luxury">
          <Reveal className="section-header mb-16">
            <span className="section-label">Visual Journey</span>
            <h2 className="section-title">Atmosphere & Artistry</h2>
            <div className="section-divider mt-4" />
          </Reveal>

          {/* Asymmetric gallery grid */}
          <div className="grid grid-cols-12 grid-rows-3 gap-3 h-[600px] sm:h-[700px]">
            {previewGallery.map((item, idx) => {
              // Span configs for a compelling masonry-like layout
              const spanConfig = [
                'col-span-7 row-span-2',
                'col-span-5 row-span-1',
                'col-span-5 row-span-1',
                'col-span-4 row-span-1',
                'col-span-4 row-span-1',
                'col-span-4 row-span-1',
              ];
              return (
                <Reveal key={item.id} delay={idx * 0.07} className={spanConfig[idx]}>
                  <Link
                    to="/gallery"
                    className="group relative block w-full h-full rounded-luxury overflow-hidden border border-[#D6A84F]/10 hover:border-[#D6A84F]/50 transition-all duration-500"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080807]/90 via-[#080807]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#D6A84F] font-semibold">
                        {item.category}
                      </span>
                      <h4 className="font-display text-sm sm:text-base font-bold text-[#F5F0E8]">
                        {item.title}
                      </h4>
                    </div>
                    {/* Hover gold line top */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D6A84F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="text-center mt-10">
            <Link to="/gallery" className="btn-luxury-outline inline-flex">
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          8. TESTIMONIALS — CINEMATIC CAROUSEL
         ══════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#0A0908] relative overflow-hidden">
        {/* Ambient gold orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D6A84F]/4 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-luxury relative z-10">
          <Reveal className="section-header mb-16">
            <span className="section-label">Guest Impressions</span>
            <h2 className="section-title">Words From Our Guests</h2>
            <p className="text-xs text-[#706050] mt-2">Identified sample testimonials — interactive prototype mode</p>
            <div className="section-divider mt-4" />
          </Reveal>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonialIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="card-luxury p-8 sm:p-12 text-center">
                  {/* Giant quote mark */}
                  <div className="absolute top-6 left-6 font-luxury text-9xl text-[#D6A84F]/8 leading-none select-none pointer-events-none">
                    "
                  </div>

                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(TESTIMONIALS[activeTestimonialIdx].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D6A84F] text-[#D6A84F]" />
                    ))}
                  </div>

                  <h3 className="font-luxury text-xl sm:text-2xl font-semibold text-[#F5F0E8] mb-4 italic">
                    "{TESTIMONIALS[activeTestimonialIdx].title}"
                  </h3>

                  <p className="text-sm sm:text-base text-[#A09080] leading-relaxed max-w-2xl mx-auto italic mb-8">
                    "{TESTIMONIALS[activeTestimonialIdx].comment}"
                  </p>

                  <div className="flex flex-col items-center gap-4">
                    <img
                      src={TESTIMONIALS[activeTestimonialIdx].avatar}
                      alt={TESTIMONIALS[activeTestimonialIdx].author}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#D6A84F]/40"
                    />
                    <div>
                      <h4 className="font-semibold text-[#F5F0E8] text-sm">{TESTIMONIALS[activeTestimonialIdx].author}</h4>
                      <p className="text-xs text-[#D6A84F] mt-0.5">{TESTIMONIALS[activeTestimonialIdx].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Controls */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                onClick={() => setActiveTestimonialIdx(p => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="w-10 h-10 rounded-luxury border border-[#D6A84F]/30 hover:border-[#D6A84F] hover:bg-[#D6A84F]/10 flex items-center justify-center text-[#A09080] hover:text-[#D6A84F] transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonialIdx(i)}
                    className={`transition-all duration-300 rounded-full ${i === activeTestimonialIdx ? 'w-8 h-2 bg-[#D6A84F]' : 'w-2 h-2 bg-[#D6A84F]/30 hover:bg-[#D6A84F]/60'}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveTestimonialIdx(p => (p + 1) % TESTIMONIALS.length)}
                className="w-10 h-10 rounded-luxury border border-[#D6A84F]/30 hover:border-[#D6A84F] hover:bg-[#D6A84F]/10 flex items-center justify-center text-[#A09080] hover:text-[#D6A84F] transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          9. VISIT US — SPLIT INFO + MAP
         ══════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#080807] border-t border-[#D6A84F]/10">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal direction="left">
              <div className="space-y-8">
                <div>
                  <span className="section-label">Find Our Table</span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F0E8] mt-3 leading-[1.15]">
                    Visit <span className="gold-text">The Sizzle</span>
                    <br />Restaurant
                  </h2>
                  <div className="section-divider-left mt-5" />
                </div>

                <div className="space-y-5">
                  {[
                    { icon: MapPin, title: 'Address', content: '42, Royal Promenade, Gold Crest Avenue, Opp Grand Orchid Palace, Mumbai – 400050' },
                    { icon: Clock, title: 'Opening Hours', content: 'Mon–Thu: 12pm–11:30pm\nFri–Sun: 12pm–12:30am' },
                    { icon: Phone, title: 'Direct Hotline (Demo)', content: '+91 98765 43210' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-luxury bg-[#D6A84F]/10 border border-[#D6A84F]/25 flex items-center justify-center flex-shrink-0 group-hover:border-[#D6A84F] group-hover:bg-[#D6A84F]/15 transition-all">
                        <item.icon className="w-5 h-5 text-[#D6A84F]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#D6A84F] mb-1">{item.title}</h4>
                        <p className="text-sm text-[#A09080] whitespace-pre-line leading-relaxed">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://maps.google.com/?q=Mumbai+Fine+Dining"
                    target="_blank" rel="noreferrer"
                    className="btn-luxury-primary"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Get Directions</span>
                  </a>
                  <button onClick={openReservation} className="btn-luxury-outline">
                    Book a Table
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Map Card */}
            <Reveal direction="right" delay={0.2}>
              <div className="relative h-[400px] rounded-luxury overflow-hidden border border-[#D6A84F]/20 bg-[#0F0E0C] flex flex-col items-center justify-center shadow-luxury">
                <div className="absolute inset-0 bg-dot-grid opacity-30" />
                <div className="relative text-center px-8 z-10">
                  <div className="w-16 h-16 rounded-full bg-[#D6A84F]/15 border border-[#D6A84F]/40 flex items-center justify-center mx-auto mb-4 animate-pulse-gold">
                    <MapPin className="w-8 h-8 text-[#D6A84F]" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-[#F5F0E8] mb-1">The Sizzle Restaurant</h4>
                  <p className="text-xs text-[#A09080] mb-6 max-w-xs mx-auto">Royal Promenade, Gold Crest Avenue, Mumbai – 400050</p>
                  <a
                    href="https://maps.google.com/?q=Mumbai+Fine+Dining"
                    target="_blank" rel="noreferrer"
                    className="btn-luxury-primary text-xs px-5 py-3 inline-flex"
                  >
                    Open in Google Maps
                  </a>
                </div>
                {/* Gold corner accents */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#D6A84F]/40" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#D6A84F]/40" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#D6A84F]/40" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#D6A84F]/40" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          10. CTA BANNER
         ══════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1920&q=80"
            alt="Dining"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#080807]/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080807]/90 via-[#080807]/60 to-[#080807]/90" />
        </div>
        {/* Gold ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D6A84F]/8 blur-[80px] pointer-events-none rounded-full" />

        <div className="container-luxury relative z-10 text-center">
          <Reveal>
            <span className="section-label">Your Experience Awaits</span>
            <h2 className="font-luxury font-light text-[#F5F0E8] mt-4 mb-6 leading-[1.1]"
              style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>
              A Table Reserved<br />
              <span className="gold-text font-semibold italic">Just for You</span>
            </h2>
            <div className="section-divider mb-6" />
            <p className="text-sm text-[#A09080] max-w-xl mx-auto mb-10 leading-relaxed">
              Whether celebrating life's milestones or simply indulging in a midweek luxury, our hosts are ready to curate an unforgettable evening.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={openReservation} className="btn-luxury-primary w-full sm:w-auto">
                <Sparkles className="w-4 h-4" />
                <span>Book a Table Now</span>
              </button>
              <Link to="/menu" className="btn-luxury-outline w-full sm:w-auto">
                <span>Explore Menu First</span>
              </Link>
            </div>
          </Reveal>
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
