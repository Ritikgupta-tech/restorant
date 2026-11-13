import React from 'react';
import { FileText, Info } from 'lucide-react';

export const TermsPage = () => {
  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6A84F]/10 border border-[#D6A84F]/30 text-[#D6A84F] text-xs font-semibold uppercase tracking-wider mb-3">
          <FileText className="w-3.5 h-3.5" />
          Prototype Terms & Conditions
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8F5EF] mb-2">
          Terms & Conditions (Prototype)
        </h1>
        <p className="text-xs text-[#AAA39A]">Effective: November 2026</p>
      </div>

      <div className="p-4 rounded-xl bg-[#171410] border border-[#2D261C] text-xs text-[#AAA39A] flex items-start gap-3">
        <Info className="w-4 h-4 text-[#D6A84F] flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-[#D6A84F]">Demonstration Scope:</strong> The Sizzle Restaurant website is a conceptual frontend prototype designed to showcase modern restaurant UI/UX, product catalogues, cart management, and simulated order placement.
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-[#AAA39A] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#F8F5EF]">1. Simulated Pricing & Orders</h2>
          <p>
            Menu items, pricing in INR, tax rates, packaging charges, and delivery fee estimates represent mock demonstration data. Submitting an order does not place an order with a live commercial kitchen and incurs zero actual financial obligation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#F8F5EF]">2. Table Reservations</h2>
          <p>
            The table reservation workflow provides an interactive demonstration of guest party management and slot reservation confirmations. It does not reserve physical seating at a brick-and-mortar restaurant.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#F8F5EF]">3. Intellectual Property</h2>
          <p>
            All UI components, design tokens, brand motifs, and layout styling are crafted for The Sizzle Restaurant prototype. High-resolution culinary imagery is curated from royalty-free Unsplash photography.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#F8F5EF]">4. Limitation of Liability</h2>
          <p>
            This prototype is provided "as is" without commercial warranty of any kind, explicit or implied.
          </p>
        </section>
      </div>
    </div>
  );
};
