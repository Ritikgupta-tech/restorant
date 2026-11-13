import React from 'react';
import { Link } from 'react-router-dom';
import {
  UtensilsCrossed,
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  Calendar,
  ShieldCheck,
} from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);
import { RESTAURANT_INFO } from '../../data/restaurantInfo';
import { useReservation } from '../../context/ReservationContext';

export const Footer = () => {
  const { openReservation } = useReservation();

  return (
    <footer className="bg-[#0C0B0A] border-t border-[#D6A84F]/25 text-[#AAA39A] relative overflow-hidden">
      {/* Decorative top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#D6A84F]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D6A84F] to-[#8C6219] p-[1px]">
                <div className="w-full h-full bg-[#110F0B] rounded-[11px] flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5 text-[#D6A84F]" />
                </div>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-[#F8F5EF] block">
                  The Sizzle
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D6A84F]">
                  Good Food. Great Mood.
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-[#AAA39A]">
              {RESTAURANT_INFO.shortDescription}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#161410] border border-[#2D261C] flex items-center justify-center text-[#AAA39A] hover:text-[#D6A84F] hover:border-[#D6A84F]/50 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#161410] border border-[#2D261C] flex items-center justify-center text-[#AAA39A] hover:text-[#D6A84F] hover:border-[#D6A84F]/50 transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#161410] border border-[#2D261C] flex items-center justify-center text-[#AAA39A] hover:text-[#D6A84F] hover:border-[#D6A84F]/50 transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-bold text-[#F8F5EF] tracking-wide">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-[#D6A84F] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#D6A84F] transition-colors">
                  Full Food Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#D6A84F] transition-colors">
                  Our Culinary Story
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#D6A84F] transition-colors">
                  Atmosphere & Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D6A84F] transition-colors">
                  Contact & Location
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openReservation}
                  className="text-[#D6A84F] hover:underline flex items-center gap-1 font-medium"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Table Reservations
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Cuisines & Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-bold text-[#F8F5EF] tracking-wide">
              Signature Cuisines
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/menu?category=indian" className="hover:text-[#D6A84F] transition-colors">
                  Royal Indian Curries & Biryani
                </Link>
              </li>
              <li>
                <Link to="/menu?category=chinese" className="hover:text-[#D6A84F] transition-colors">
                  Szechuan & Wok Specialties
                </Link>
              </li>
              <li>
                <Link to="/menu?category=fast-food" className="hover:text-[#D6A84F] transition-colors">
                  Artisanal Sourdough Pizza & Burgers
                </Link>
              </li>
              <li>
                <Link to="/menu?category=desserts" className="hover:text-[#D6A84F] transition-colors">
                  Molten Brownies & Shahi Kulfi
                </Link>
              </li>
              <li>
                <Link to="/menu?category=beverages" className="hover:text-[#D6A84F] transition-colors">
                  Specialty Cold Brews & Coolers
                </Link>
              </li>
            </ul>
          </div>

          {/* Visit & Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-bold text-[#F8F5EF] tracking-wide">
              Visit & Contact
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D6A84F] flex-shrink-0 mt-0.5" />
                <span>
                  {RESTAURANT_INFO.address.line1}, {RESTAURANT_INFO.address.landmark}, {RESTAURANT_INFO.address.city} - {RESTAURANT_INFO.address.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D6A84F] flex-shrink-0" />
                <span className="font-mono">{RESTAURANT_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D6A84F] flex-shrink-0" />
                <span>{RESTAURANT_INFO.email}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D6A84F] flex-shrink-0 mt-0.5" />
                <div>
                  <p>Daily: 12:00 PM – 11:30 PM</p>
                  <p className="text-[11px] text-[#7E776C]">Weekends extended till 12:30 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#221E18] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8376]">
          <p>© {new Date().getFullYear()} The Sizzle Restaurant. Prototype Website Demonstration.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-[#D6A84F] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#D6A84F] transition-colors">
              Terms of Service
            </Link>
            <span className="text-[#555047]">•</span>
            <span className="text-[#D6A84F]">Demo Customer Journey Prototype</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
