/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#D4AF37", /* Burnished Gold */
        "primary-dim": "#A67C00",
        "secondary": "#E5C76B", /* Soft Sand */
        "tertiary": "#8B6535", /* Earth Amber */
        "surface": "#0C0A09", /* Deep Warm Stone */
        "on-surface": "#FFFCF2", /* Silk White */
        "on-surface-variant": "#A89F91",
        "background": "#0C0A09",
        "outline-variant": "#423C38",
        surface: {
            DEFAULT: '#0C0A09',
            low: '#141211',
            mid: '#1C1817',
            high: '#262221',
            highest: '#332E2C',
            bright: '#423C38',
            variant: '#262221',
        },
        ghostBorder: '#423C38',
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      fontFamily: {
        "headline": ["Manrope", 'sans-serif'],
        "body": ["Inter", 'sans-serif'],
        "label": ["Inter", 'sans-serif'],
        "sans": ["Inter", 'sans-serif'],
      },
      animation: {
        slideup: 'slideup 1s ease-in-out',
        slidedown: 'slidedown 1s ease-in-out',
        slideleft: 'slideleft 1s ease-in-out',
        slideright: 'slideright 1s ease-in-out',
        wave: 'wave 1.2s linear infinite',
        slowfade: 'slowfade 2.2s ease-in-out',
        breathing: 'breathing 4s ease-in-out infinite',
        aurora: 'aurora 15s ease infinite',
        waveform: 'waveform 1s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        slowfade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideup: {
          from: { opacity: 0, transform: 'translateY(25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slidedown: {
          from: { opacity: 0, transform: 'translateY(-25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slideleft: {
          from: { opacity: 0, transform: 'translateX(-20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideright: {
          from: { opacity: 0, transform: 'translateX(20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        wave: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
        breathing: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.9, transform: 'scale(1.02)' },
        },
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        waveform: {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
      },
      backgroundImage: {
        'glow-conic': 'conic-gradient(from 180deg at 50% 50%, #D4AF37 0deg, #E5C76B 180deg, #D4AF37 360deg)',
        'brand-gradient': 'linear-gradient(135deg, #D4AF37 0%, #A67C00 100%)',
        'brand-gradient-secondary': 'linear-gradient(135deg, #E5C76B 0%, #8B6535 100%)',
      },
      boxShadow: {
        'neon': '0 0 15px rgba(212, 175, 55, 0.2)',
        'neon-lg': '0 0 30px rgba(212, 175, 55, 0.3)',
        'ambient': '0 20px 40px rgba(0, 0, 0, 0.7), 0 0 15px rgba(212, 175, 55, 0.08)',
        'playback': '0 20px 40px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
};
