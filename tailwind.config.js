/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sizzle: {
          bg: "#080807",
          secondary: "#0F0E0C",
          card: "#161411",
          elevated: "#1C1916",
          surface: "#11100E",
          gold: "#D6A84F",
          "gold-light": "#F3DC9B",
          "gold-muted": "#E8C170",
          "gold-dark": "#A87A29",
          "gold-deep": "#7A5A1E",
          amber: "#F59E0B",
          text: "#F5F0E8",
          "text-soft": "#C8BEB0",
          muted: "#A09080",
          "muted-dark": "#706050",
        }
      },
      fontFamily: {
        luxury: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        'label': ['11px', { lineHeight: '1', letterSpacing: '0.2em' }],
      },
      boxShadow: {
        'gold': '0 0 30px rgba(214, 168, 79, 0.25), 0 0 60px rgba(214, 168, 79, 0.1)',
        'gold-sm': '0 0 15px rgba(214, 168, 79, 0.2)',
        'gold-lg': '0 0 50px rgba(214, 168, 79, 0.3), 0 0 100px rgba(214, 168, 79, 0.1)',
        'card': '0 20px 50px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(214,168,79,0.1)',
        'luxury': '0 30px 60px -15px rgba(0,0,0,0.7), 0 0 40px rgba(214,168,79,0.08)',
        'inner-gold': 'inset 0 0 25px rgba(214, 168, 79, 0.06)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D6A84F 0%, #B08332 100%)',
        'gold-shine': 'linear-gradient(135deg, #FFF0D0 0%, #E8C170 35%, #D6A84F 60%, #B08332 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #B08332 0%, #E8C170 25%, #FFF0D0 50%, #E8C170 75%, #B08332 100%)',
        'dark-vignette': 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
        'luxury-bg': 'radial-gradient(ellipse at top, rgba(214,168,79,0.06) 0%, transparent 60%), radial-gradient(ellipse at bottom-right, rgba(185,130,50,0.04) 0%, transparent 50%), #080807',
        'hero-overlay': 'linear-gradient(to bottom, rgba(8,8,7,0.3) 0%, rgba(8,8,7,0.6) 50%, rgba(8,8,7,0.95) 100%)',
        'card-luxury': 'linear-gradient(145deg, #1C1916 0%, #141210 100%)',
      },
      animation: {
        'shimmer': 'shimmer 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2.5s ease-in-out infinite',
        'flicker': 'flicker 3s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'spin-slow': 'spin 15s linear infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'draw-line': 'drawLine 1.5s ease-out forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(214, 168, 79, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(214, 168, 79, 0.5), 0 0 60px rgba(214, 168, 79, 0.2)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(0.98)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        drawLine: {
          from: { width: '0' },
          to: { width: '100%' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      borderRadius: {
        'luxury': '2px',
        'pill': '100px',
      },
    },
  },
  plugins: [],
}
