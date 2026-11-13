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
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { useReservation } from '../context/ReservationContext';

export const AboutPage = () => {
  const { openReservation } = useReservation();

  const milestones = [
    { year: '2018', title: 'The Sizzle Founded', desc: 'Started with an ambition to revive authentic clay tandoor and cast iron sizzle dining in Mumbai.' },
    { year: '2020', title: 'Farm-to-Fork Sourcing', desc: 'Established partnerships with organic spice growers in Kerala and heritage grain mills in Punjab.' },
    { year: '2023', title: 'Private Dining Salon', desc: 'Introduced the Velvet Room for intimate celebrations and bespoke culinary masterclasses.' },
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
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D6A84F] block mb-2">
          Heritage & Passion
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F8F5EF] mb-4">
          Our Culinary Story
        </h1>
        <p className="text-sm sm:text-base text-[#AAA39A] leading-relaxed">
          Good Food. Great Mood. An intimate exploration of flavors, timeless culinary traditions, and heartfelt hospitality.
        </p>
      </div>

      {/* Main Story Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6A84F] block">
            The Sizzle Concept
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8F5EF] leading-tight">
            Where Fire, Flavor, and Elegance Meet
          </h2>
          <p className="text-sm text-[#AAA39A] leading-relaxed">
            The Sizzle was conceived around a simple yet powerful idea: food should not merely nourish; it should evoke emotion, stir memories, and kindle conversation. From the dramatic hiss of cast iron brought to your table to the aroma of 24-hour slow-cooked Dal Makhani, every dish tells a story.
          </p>
          <p className="text-sm text-[#AAA39A] leading-relaxed">
            Our interior design pairs charcoal black architecture with brushed champagne gold accents and warm amber filament lamps. It is a setting designed to slow down time, encouraging long conversations and unhurried savoring.
          </p>

          <div className="pt-2">
            <button
              onClick={openReservation}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B08332] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold-sm transition-all inline-flex items-center gap-2"
            >
              <span>Reserve an Evening With Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl overflow-hidden border border-[#D6A84F]/30 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
              alt="Restaurant Dining Hall"
              className="w-full h-[450px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Values & Core Pillars */}
      <div className="bg-[#12100E] border border-[#2B251B] rounded-3xl p-8 sm:p-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6A84F] block mb-2">
            The Sizzle Standards
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F5EF]">
            Our Four Culinary Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESTAURANT_INFO.features.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#171512] border border-[#2B251B] p-6 rounded-2xl hover:border-[#D6A84F]/50 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[#221E17] border border-[#D6A84F]/30 flex items-center justify-center text-[#D6A84F] mb-4">
                {idx === 0 && <ChefHat className="w-6 h-6" />}
                {idx === 1 && <Sparkles className="w-6 h-6" />}
                {idx === 2 && <Flame className="w-6 h-6" />}
                {idx === 3 && <Award className="w-6 h-6" />}
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F8F5EF] mb-2">{item.title}</h3>
              <p className="text-xs text-[#AAA39A] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Culinary Team */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6A84F] block mb-2">
            The Masters Behind The Stove
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8F5EF]">
            Meet Our Culinary Leaders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {chefs.map((chef, idx) => (
            <div
              key={idx}
              className="bg-[#151310] border border-[#2B251B] hover:border-[#D6A84F]/50 rounded-2xl overflow-hidden shadow-xl transition-all group"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#1E1B16]">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-[#F8F5EF] mb-1">{chef.name}</h3>
                <p className="text-xs font-semibold text-[#D6A84F] mb-3">{chef.role}</p>
                <p className="text-xs text-[#AAA39A] leading-relaxed">{chef.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Journey */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6A84F] block mb-2">
            Milestones
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8F5EF]">
            Our Journey Over The Years
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="bg-[#14120E] border border-[#2B251B] p-6 rounded-2xl relative"
            >
              <span className="font-serif text-3xl font-bold text-[#D6A84F]/40 block mb-2">
                {m.year}
              </span>
              <h4 className="font-serif text-lg font-bold text-[#F8F5EF] mb-2">{m.title}</h4>
              <p className="text-xs text-[#AAA39A] leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
