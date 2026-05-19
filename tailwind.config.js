/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './projects/ecommerce-components/src/**/*.{html,ts}',
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        ecommerce: {
          blue: '#0066FF',
          'blue-hover': '#0052CC',
          'blue-light': 'rgba(0, 102, 255, 0.08)',
          electric: '#00D2FF',
        },
        promo: {
          red: '#FF2D55',
        },
        bg: {
          app: '#F2F5F8',
          card: '#FFFFFF',
        },
        text: {
          main: '#1A1D20',
          muted: '#6C7A89',
        },
        border: {
          muted: '#E9ECEF',
        },
      },
      borderRadius: {
        card: '16px',
        pill: '999px',
        badge: '6px',
      },
      boxShadow: {
        'eco-sm': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'eco-blue': '0 4px 16px rgba(0, 102, 255, 0.05)',
        'eco-card': '0 4px 12px rgba(0, 102, 255, 0.03)',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      letterSpacing: {
        tight: '-0.02em',
      },
    },
  },
  plugins: [],
};
