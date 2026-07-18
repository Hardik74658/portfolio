/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Archivo', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Warm ivory / ink foundation
        cream: {
          50: '#FBFAF8',
          100: '#F6F4F0',
          200: '#EDEAE3',
          300: '#E0DBD1',
        },
        ink: {
          50: '#F6F5F4',
          100: '#E7E5E2',
          200: '#C9C5BF',
          300: '#A6A199',
          400: '#7C766D',
          500: '#57524A',
          600: '#3D3933',
          700: '#2A2723',
          800: '#1C1A17',
          900: '#141210',
          950: '#0D0C0B',
        },
        // Bright but non-neon warm accent
        accent: {
          50: '#FFF6ED',
          100: '#FFEBD5',
          200: '#FED4AA',
          300: '#FDB674',
          400: '#FB8D3C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        // Supporting brights (used sparingly for tags / category tints)
        sky2: '#0284C7',
        leaf: '#16A34A',
        plum: '#7C3AED',
        rose2: '#E11D48',
      },
      boxShadow: {
        'soft': '0 1px 2px rgba(20,18,16,0.04), 0 8px 24px -8px rgba(20,18,16,0.10)',
        'lift': '0 2px 4px rgba(20,18,16,0.05), 0 20px 48px -16px rgba(20,18,16,0.18)',
        'glow': '0 0 0 1px rgba(249,115,22,0.15), 0 8px 40px -8px rgba(249,115,22,0.35)',
        'soft-dark': '0 1px 2px rgba(0,0,0,0.4), 0 12px 32px -8px rgba(0,0,0,0.5)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      animation: {
        'marquee': 'marquee 32s linear infinite',
        'marquee-slow': 'marquee 55s linear infinite',
        'spin-slow': 'spin 14s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
