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
          bg: "#0B0B0B",
          secondary: "#151515",
          card: "#1B1916",
          cardHover: "#23201C",
          gold: "#D6A84F",
          goldLight: "#F3DC9B",
          goldDark: "#A87A29",
          amber: "#F59E0B",
          text: "#F8F5EF",
          muted: "#AAA39A",
          border: "rgba(214, 168, 79, 0.25)",
          borderHover: "rgba(214, 168, 79, 0.5)",
          surface: "#11100E",
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(214, 168, 79, 0.2)',
        'gold-sm': '0 0 12px rgba(214, 168, 79, 0.15)',
        'card-elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(214, 168, 79, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
