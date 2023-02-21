/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Inter", ...fontFamily.sans],
      },
      colors: {
        brand: "#000101",
        primary: {
          DEFAULT: "#6A4FFF",
          50: "#FFFFFF",
          100: "#F4F2FF",
          200: "#D2C9FF",
          300: "#AFA1FF",
          400: "#8D78FF",
          500: "#6A4FFF",
          600: "#3B17FF",
          700: "#2200DE",
          800: "#1900A6",
          900: "#11006E",
        },
      },
      borderRadius: {
        md: "0.25rem",
      },
      boxShadow: {
        button: "0 0.0625rem 0 rgba(0,0,0,.05)",
      },
    },
  },
  plugins: [],
};
