import React from 'react';
import { FileText, Info } from 'lucide-react';
import { Reveal } from '../components/common/ScrollReveal';

export const TermsPage = () => {
  return (
    <div className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <Reveal>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6A84F]/10 border border-[#D6A84F]/30 text-[#D6A84F] text-[10px] font-semibold uppercase tracking-[0.25em] mb-4">
          <FileText className="w-3.5 h-3.5" />
          <span>Demonstration Terms</span>
        </div>
        <h1 className="font-luxury text-4xl sm:text-6xl font-light text-[#F5F0E8] mb-3">
          Terms & <span className="italic text-gradient-gold">Conditions</span>
        </h1>
        <p className="text-xs text-[#8A7E72] font-mono">Effective: November 2026 • Prototype Evaluation</p>
      </Reveal>

      <div className="p-5 bg-[#12100E] border border-[#26221B] text-xs text-[#8A7E72] flex items-start gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <Info className="w-4 h-4 text-[#D6A84F] flex-shrink-0 mt-0.5" />
        <p className="font-light leading-relaxed">
          <strong className="text-[#D6A84F] uppercase tracking-wider font-semibold">Demonstration Scope:</strong> The Sizzle Restaurant website is a conceptual frontend prototype designed to showcase modern luxury restaurant UI/UX, product catalogues, cart management, and simulated order placement.
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-[#8A7E72] leading-relaxed font-light">
        <section className="space-y-3 p-6 bg-[#0E0D0B] border border-[#1E1B15]">
          <h2 className="font-luxury text-xl font-light text-[#F5F0E8]">1. Simulated Pricing & Orders</h2>
          <p>
            Menu items, pricing in INR, tax rates, packaging charges, and delivery fee estimates represent mock demonstration data. Submitting an order does not place an order with a live commercial kitchen and incurs zero actual financial obligation.
          </p>
        </section>

        <section className="space-y-3 p-6 bg-[#0E0D0B] border border-[#1E1B15]">
          <h2 className="font-luxury text-xl font-light text-[#F5F0E8]">2. Table Reservations</h2>
          <p>
            Table bookings submitted through the reservation modal generate client-side simulation records only. No physical seats or tables are reserved at a real establishment.
          </p>
        </section>

        <section className="space-y-3 p-6 bg-[#0E0D0B] border border-[#1E1B15]">
          <h2 className="font-luxury text-xl font-light text-[#F5F0E8]">3. Intellectual Property & Photography</h2>
          <p>
            Culinary and interior imagery utilized across this prototype are sourced from royalty-free high-resolution libraries (Unsplash) to represent ambient culinary dining contexts.
          </p>
        </section>
      </div>
    </div>
  );
};
