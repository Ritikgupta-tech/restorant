import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { Reveal } from '../components/common/ScrollReveal';

export const PrivacyPage = () => {
  return (
    <div className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <Reveal>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6A84F]/10 border border-[#D6A84F]/30 text-[#D6A84F] text-[10px] font-semibold uppercase tracking-[0.25em] mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Prototype Protocol</span>
        </div>
        <h1 className="font-luxury text-4xl sm:text-6xl font-light text-[#F5F0E8] mb-3">
          Privacy <span className="italic text-gradient-gold">Policy</span>
        </h1>
        <p className="text-xs text-[#8A7E72] font-mono">Last updated: November 2026 • Client Demonstration Version</p>
      </Reveal>

      <div className="p-5 bg-[#12100E] border border-[#26221B] text-xs text-[#8A7E72] flex items-start gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <Info className="w-4 h-4 text-[#D6A84F] flex-shrink-0 mt-0.5" />
        <p className="font-light leading-relaxed">
          <strong className="text-[#D6A84F] uppercase tracking-wider font-semibold">Prototype Disclosure:</strong> This website is an interactive frontend application prototype created for demonstration purposes. No real personal user data is sold, transferred to third-party ad networks, or processed by live production payment processors.
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-[#8A7E72] leading-relaxed font-light">
        <section className="space-y-3 p-6 bg-[#0E0D0B] border border-[#1E1B15]">
          <h2 className="font-luxury text-xl font-light text-[#F5F0E8]">1. Information Stored Locally</h2>
          <p>
            When utilizing interactive functions such as the shopping cart, favorites wishlist, table booking simulation, or demo checkout, data is cached strictly in your browser's local storage (LocalStorage). This data remains on your machine and may be cleared at any time by emptying your browser cache.
          </p>
        </section>

        <section className="space-y-3 p-6 bg-[#0E0D0B] border border-[#1E1B15]">
          <h2 className="font-luxury text-xl font-light text-[#F5F0E8]">2. Form Inquiries & Table Reservations</h2>
          <p>
            Contact submissions and table bookings simulated through this interface do not transmit information to a live restaurant database or external customer relationship system. Data is stored solely in local simulated state for UI feedback.
          </p>
        </section>

        <section className="space-y-3 p-6 bg-[#0E0D0B] border border-[#1E1B15]">
          <h2 className="font-luxury text-xl font-light text-[#F5F0E8]">3. Analytics & Cookies</h2>
          <p>
            This prototype does not embed intrusive third-party trackers, cross-site targeting cookies, or behavioral advertising scripts. Any session data generated is strictly temporary to enable realistic front-end functionality.
          </p>
        </section>
      </div>
    </div>
  );
};
