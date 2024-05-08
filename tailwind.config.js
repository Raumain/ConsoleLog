/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'tick': "url('/public/tick.svg')",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#f0f7fe",
          100: "#deecfb",
          200: "#c4e0f9",
          300: "#9cccf4",
          400: "#6dafed",
          500: "#4b90e6",
          600: "#3674da",
          700: "#2d60c8",
          800: "#2a4fa3",
          900: "#274481",
          950: "#0f172a",
        },
        secondary: {
          50: "#fdf6fd",
          100: "#faecfb",
          200: "#f4d8f6",
          300: "#edb9ee",
          400: "#e28fe3",
          500: "#d163d2",
          600: "#b544b3",
          700: "#953691",
          800: "#7b2d77",
          900: "#652a61",
          950: "#3a0f37",
        },
        dark: {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#171717',
          '950': '#111111',
        },


      }
    },
  },
  plugins: [],
}

