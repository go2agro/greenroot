import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#006e1c',
          container: '#4caf50',
          fixed: '#a8d5ba',
          'fixed-dim': '#7eb894',
        },
        secondary: {
          DEFAULT: '#8b7355',
          container: '#d4c4b0',
        },
        surface: {
          DEFAULT: '#f8faf9',
          'container-lowest': '#ffffff',
          'container-low': '#f2f4f3',
          'container': '#eceeec',
          'container-high': '#e6e8e7',
          'container-highest': '#e0e3e1',
        },
        'on-surface': '#191c1c',
        'on-primary': '#ffffff',
        'on-primary-container': '#00390d',
        'outline-variant': '#c2c8c5',
      },
      borderRadius: {
        'xl': '1.5rem',
        'lg': '1rem',
        'full': '9999px',
      },
      boxShadow: {
        'atmospheric': '0px 20px 40px rgba(25, 28, 28, 0.06)',
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
};

export default config;
