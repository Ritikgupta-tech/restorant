import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const PrivacyPage = () => {
  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6A84F]/10 border border-[#D6A84F]/30 text-[#D6A84F] text-xs font-semibold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          Prototype Demonstration Policy
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8F5EF] mb-2">
          Privacy Policy (Prototype)
        </h1>
        <p className="text-xs text-[#AAA39A]">Last updated: November 2026</p>
      </div>

      <div className="p-4 rounded-xl bg-[#171410] border border-[#2D261C] text-xs text-[#AAA39A] flex items-start gap-3">
        <Info className="w-4 h-4 text-[#D6A84F] flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-[#D6A84F]">Prototype Notice:</strong> This website is an interactive frontend application prototype created for demonstration purposes. No real personal user data is sold, transferred to third-party ad networks, or processed by live production payment processors.
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-[#AAA39A] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#F8F5EF]">1. Information Stored Locally</h2>
          <p>
            When utilizing interactive functions such as the shopping cart, favorites wishlist, table booking simulation, or demo checkout, data is cached strictly in your browser's local storage (LocalStorage). This data remains on your machine and may be cleared at any time by emptying your browser cache.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#F8F5EF]">2. Form Submissions</h2>
          <p>
            Customer names, telephone numbers, emails, and notes entered in the reservation and checkout modules are processed entirely on the client side to simulate realistic customer validation workflows.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#F8F5EF]">3. Cookies and Analytics</h2>
          <p>
            This prototype does not employ intrusive third-party tracking pixels or persistent advertising cookies. Standard session tokens may be utilized by client-side routers for seamless navigation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#F8F5EF]">4. Contact</h2>
          <p>
            For feedback or inquiries regarding this digital restaurant prototype, please use the form provided on our Contact page.
          </p>
        </section>
      </div>
    </div>
  );
};
