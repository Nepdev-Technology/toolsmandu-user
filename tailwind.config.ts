import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '375px',
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
    },
    extend: {
      colors: {
        // primary: '#012651',
        // secondary: '#1e3a8a',
        // darkPrimary: '#011d3e',
        // lightBlue: '#1c4dd4',
        // textPrimary: '#ffffff',
        // textSecondary: '#FACC15',
        primary: '#012651',
        secondary: '#1d4ed6',
        tertiary: '#011d3e',
        quaternary: '#1d3557',
        senary: 'D90429',
        textPrimary: '#ffffff',
        textSecondary: '#000000',
        textSP: '#ffbe0b',
        textMRP: '#ffbe0b',
        iconPrimary: '#000000',
        iconSecondary: '#60A5FA',
        textHeader: '#FACC15',
        iconTertiary: '#6366F1',
      },
    },
    fontFamily: {
      display: 'Roboto', // Adds a new `font-display` class
    },
  },
  plugins: [],
};
export default config;
