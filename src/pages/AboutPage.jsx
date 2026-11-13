import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Flame,
  ChefHat,
  Award,
  Heart,
  UtensilsCrossed,
  ArrowRight,
  ShieldCheck,
  Clock,
  Compass,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { useReservation } from '../context/ReservationContext';
import { Reveal, Counter } from '../components/common/ScrollReveal';

export const AboutPage = () => {
  const { openReservation } = useReservation();

  const milestones = [
    { year: '2018', title: 'The Sizzle Founded', desc: 'Started with an ambition to revive authentic clay tandoor and cast iron sizzle dining in Mumbai.' },
    { year: '2020', title: 'Farm-to-Fork Sourcing', desc: 'Established partnerships with organic spice growers in Kerala and heritage grain mills in Punjab.' },
    { year: '2023', title: 'Private Velvet Salon', desc: 'Introduced the Velvet Room for intimate celebrations and bespoke culinary masterclasses.' },
    { year: '2026', title: 'Digital Prototype Launch', desc: 'Released our modern digital customer journey prototype with instant table bookings and gourmet ordering.' },
  ];

  const chefs = [
    {
      name: 'Chef Kaviraj Malhotra',
      role: 'Executive Culinary Director',
      bio: '25 years of mastery across royal Awadhi slow-cooking, classic French techniques, and modern plated gastronomy.',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Chef Lin Zhang',
      role: 'Master Wok & Dim Sum Specialist',
      bio: 'Trained in Sichuan and Guangzhou, perfecting wok-hei smokiness, hand-pinched dim sums, and fiery chilli oils.',
      image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Chef Sophie Laurent',
      role: 'Head Pastry & Artisanal Baker',
      bio: 'Parisian trained pastry chef curating 70% dark Belgian cocoa molten creations and traditional Italian tiramisu.',
      image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      {/* Header Banner */}
      <Reveal className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6A84F]/10 border border-[#D6A84F]/30 text-[#D6A84F] text-[11px] font-semibold uppercase tracking-[0.25em] mb-4">
          <Compass className="w-3.5 h-3.5" />
          <span>Heritage & Philosophy</span>
        </div>
        <h1 className="font-luxury text-4xl sm:text-6xl md:text-7xl font-light text-[#F5F0E8] tracking-wide mb-4">
          The Sizzle <span className="italic font-normal text-gradient-gold">Story</span>
        </h1>
        <p className="text-sm sm:text-base text-[#A09080] font-light leading-relaxed">
          Good Food. Great Mood. An intimate sanctuary where heritage flame, royal Awadhi spices, and contemporary hospitality converge.
        </p>
      </Reveal>

      {/* Main Story Hero Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal className="space-y-6">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D6A84F] block">
            The Sizzle Concept
          </span>
          <h2 className="font-luxury text-3xl sm:text-5xl font-light text-[#F5F0E8] leading-tight">
            Where Flame, Flavor, & <span className="italic font-normal text-gradient-gold">Elegance</span> Meet
          </h2>
          <p className="text-sm text-[#9E9284] leading-relaxed font-light">
            The Sizzle was conceived around a simple yet powerful ideal: food should not merely nourish; it should evoke emotion, stir memories, and kindle conversation. From the dramatic hiss of cast iron brought tableside to the aroma of 24-hour slow-cooked Dal Makhani, every plate tells a story of patience.
          </p>
          <p className="text-sm text-[#9E9284] leading-relaxed font-light">
            Our interior pairs charcoal black architecture with brushed champagne gold accents and warm amber filament lamps. It is a setting designed to slow down time, encouraging long conversations and unhurried savoring.
          </p>

          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <button
              onClick={openReservation}
              className="btn-luxury-primary px-8 py-3.5 text-xs tracking-[0.2em] inline-flex items-center gap-2"
            >
              <span>Reserve a Table</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/menu"
              className="btn-luxury-outline px-6 py-3.5 text-xs tracking-[0.2em]"
            >
              Explore Catalogue
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="relative">
          <div className="relative overflow-hidden border border-[#D6A84F]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
              alt="Restaurant Dining Hall"
              className="w-full h-[480px] object-cover hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#D6A84F]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#D6A84F]" />

            {/* Floating stat box */}
            <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 bg-[#0C0B0A]/90 border border-[#D6A84F]/30 backdrop-blur-md flex items-center justify-between">
              <div>
                <span className="font-luxury text-2xl sm:text-3xl font-light text-gradient-gold block">
                  <Counter to={8} suffix="+" /> Years
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A7E72]">
                  Of Culinary Excellence
                </span>
              </div>
              <div className="h-8 w-[1px] bg-[#2E281F]" />
              <div>
                <span className="font-luxury text-2xl sm:text-3xl font-light text-gradient-gold block">
                  <Counter to={45000} suffix="+" />
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A7E72]">
                  Evenings Hosted
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Values & Core Pillars */}
      <Reveal className="space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D6A84F] block mb-2">
            The Sizzle Standards
          </span>
          <h2 className="font-luxury text-3xl sm:text-5xl font-light text-[#F5F0E8]">
            Our Four Culinary <span className="italic text-gradient-gold">Pillars</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESTAURANT_INFO.features.map((item, idx) => (
            <div
              key={idx}
              className="card-luxury p-8 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 bg-[#1A1713] border border-[#D6A84F]/30 flex items-center justify-center text-[#D6A84F] mb-6 group-hover:border-[#D6A84F] transition-colors">
                  {idx === 0 && <ChefHat className="w-6 h-6" />}
                  {idx === 1 && <Sparkles className="w-6 h-6" />}
                  {idx === 2 && <Flame className="w-6 h-6" />}
                  {idx === 3 && <Award className="w-6 h-6" />}
                </div>
                <h3 className="font-luxury text-xl font-light text-[#F5F0E8] mb-3">{item.title}</h3>
                <p className="text-xs text-[#8A7E72] leading-relaxed font-light">{item.description}</p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#1E1B15] flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#5A5247]">
                <span>Pillar 0{idx + 1}</span>
                <span className="text-[#D6A84F]">Verified</span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Culinary Masters */}
      <Reveal className="space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D6A84F] block mb-2">
            The Stoves of The Sizzle
          </span>
          <h2 className="font-luxury text-3xl sm:text-5xl font-light text-[#F5F0E8]">
            Meet Our <span className="italic text-gradient-gold">Culinary Leaders</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {chefs.map((chef, idx) => (
            <div
              key={idx}
              className="card-luxury overflow-hidden group flex flex-col"
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#161411] relative">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#D6A84F] font-semibold block mb-1">
                    {chef.role}
                  </span>
                  <h3 className="font-luxury text-2xl font-light text-[#F5F0E8]">
                    {chef.name}
                  </h3>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-xs text-[#8A7E72] leading-relaxed font-light">
                  {chef.bio}
                </p>
                <div className="pt-4 mt-4 border-t border-[#1E1B15] flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#5A5247]">
                  <span>Michelin Standard</span>
                  <span className="text-[#D6A84F]">Executive</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Timeline Milestones */}
      <Reveal className="space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D6A84F] block mb-2">
            Chronology
          </span>
          <h2 className="font-luxury text-3xl sm:text-5xl font-light text-[#F5F0E8]">
            Milestones of Our <span className="italic text-gradient-gold">Journey</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="card-luxury p-7 relative"
            >
              <span className="font-luxury text-4xl font-light text-[#D6A84F]/30 block mb-3">
                {m.year}
              </span>
              <h4 className="font-luxury text-lg font-light text-[#F5F0E8] mb-2">{m.title}</h4>
              <p className="text-xs text-[#8A7E72] leading-relaxed font-light">{m.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
};
