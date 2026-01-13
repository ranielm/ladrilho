/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul-blue': '#1e40af',
        'azul-yellow': '#eab308',
        'azul-red': '#dc2626',
        'azul-black': '#1f2937',
        'azul-white': '#f8fafc',
      },
      animation: {
        'tile-place': 'tile-place 0.3s ease-out',
        'score-pop': 'score-pop 0.5s ease-out',
      },
      keyframes: {
        'tile-place': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'score-pop': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
