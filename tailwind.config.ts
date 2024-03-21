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
        primary: '#EDF2F4',
        secondary: '#1846be',
        tertiary: '#1d3557',
        quaternary: '#1d3557',
        senary: 'D90429',
        textPrimary: '#ffffff',
        textSecondary: '#000000',
        textSP: '#ffbe0b',
        textMRP: '#ffbe0b',
      },
    },
    fontFamily: {
      display: 'Oswald, ui-serif', // Adds a new `font-display` class
    },
  },
  plugins: [],
};
export default config;
