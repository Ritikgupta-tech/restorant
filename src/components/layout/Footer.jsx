import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, MapPin, Phone, Mail, Clock, Calendar, ArrowRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/restaurantInfo';
import { useReservation } from '../../context/ReservationContext';

const InstagramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
const FacebookIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const TwitterIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

export const Footer = () => {
  const { openReservation } = useReservation();

  return (
    <footer className="relative bg-[#060605] overflow-hidden">
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D6A84F]/50 to-transparent" />
      {/* Ambient gold orb bottom right */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D6A84F]/4 rounded-full blur-[120px] pointer-events-none" />

      {/* Pre-footer CTA Strip */}
      <div className="relative border-b border-[#D6A84F]/10 py-10 sm:py-14">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#D6A84F] font-semibold block mb-1">Reserve Your Experience</span>
            <h3 className="font-luxury text-2xl sm:text-3xl text-[#F5F0E8] font-light">
              A Table Reserved<em className="text-[#D6A84F] not-italic font-semibold"> Just for You</em>
            </h3>
          </div>
          <button
            onClick={openReservation}
            className="btn-luxury-primary flex-shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a Table</span>
          </button>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-luxury bg-gradient-to-br from-[#D6A84F] to-[#7A5A1E] p-[1px] flex-shrink-0">
                <div className="w-full h-full rounded-luxury bg-[#080807] flex items-center justify-center group-hover:bg-[#111009] transition-colors">
                  <UtensilsCrossed className="w-5 h-5 text-[#D6A84F]" />
                </div>
              </div>
              <div>
                <span className="font-luxury text-xl text-[#F5F0E8] font-semibold block leading-tight">The Sizzle</span>
                <span className="text-[8px] uppercase tracking-[0.3em] text-[#D6A84F]">Good Food. Great Mood.</span>
              </div>
            </Link>

            <p className="text-xs text-[#706050] leading-relaxed">
              A premium fine-dining experience where ancient Indian traditions meet global culinary artistry in Mumbai's most elegant setting.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2 pt-2">
              {[
                { href: 'https://instagram.com', Icon: InstagramIcon, label: 'Instagram' },
                { href: 'https://facebook.com', Icon: FacebookIcon, label: 'Facebook' },
                { href: 'https://twitter.com', Icon: TwitterIcon, label: 'Twitter' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-luxury border border-[#D6A84F]/20 flex items-center justify-center text-[#706050] hover:text-[#D6A84F] hover:border-[#D6A84F]/50 hover:bg-[#D6A84F]/8 transition-all duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#D6A84F] font-semibold mb-5 pb-3 border-b border-[#D6A84F]/10">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Homepage', path: '/' },
                { label: 'Full Food Menu', path: '/menu' },
                { label: 'Our Culinary Story', path: '/about' },
                { label: 'Atmosphere & Gallery', path: '/gallery' },
                { label: 'Contact & Location', path: '/contact' },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-xs text-[#706050] hover:text-[#D6A84F] transition-colors duration-300 hover-underline-gold"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={openReservation}
                  className="text-xs text-[#D6A84F] hover:text-[#F3DC9B] transition-colors duration-300 font-semibold flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Table Reservations
                </button>
              </li>
            </ul>
          </div>

          {/* Cuisines */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#D6A84F] font-semibold mb-5 pb-3 border-b border-[#D6A84F]/10">
              Signature Cuisines
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Royal Indian Curries & Biryani', cat: 'indian' },
                { label: 'Szechuan & Wok Specialties', cat: 'chinese' },
                { label: 'Artisanal Pizza & Smash Burgers', cat: 'fast-food' },
                { label: 'Molten Brownies & Shahi Kulfi', cat: 'desserts' },
                { label: 'Specialty Cold Brews & Coolers', cat: 'beverages' },
              ].map(({ label, cat }) => (
                <li key={cat}>
                  <Link
                    to={`/menu?category=${cat}`}
                    className="text-xs text-[#706050] hover:text-[#D6A84F] transition-colors duration-300 hover-underline-gold"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#D6A84F] font-semibold mb-5 pb-3 border-b border-[#D6A84F]/10">
              Visit & Contact
            </h4>
            <div className="space-y-4">
              {[
                { icon: MapPin, text: '42, Royal Promenade, Gold Crest Ave, Mumbai – 400050' },
                { icon: Phone, text: '+91 98765 43210 (Demo)' },
                { icon: Mail, text: 'reservations@thesizzlerestaurant.demo' },
                { icon: Clock, text: 'Mon–Thu: 12pm–11:30pm\nFri–Sun: 12pm–12:30am' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Icon className="w-3.5 h-3.5 text-[#D6A84F] flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-[#706050] leading-relaxed whitespace-pre-line">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#D6A84F]/8 py-6">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#504840]">
          <p>© {new Date().getFullYear()} The Sizzle Restaurant. Frontend Prototype Demonstration.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-[#D6A84F] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#D6A84F] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
