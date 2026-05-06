/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Cormorant Garamond", "serif"],
        sans: ["Jost", "sans-serif"],
      },
      colors: {
        gold: {
          light: "#f0d080",
          DEFAULT: "#c9a84c",
          dark: "#8a6a1e",
        },
        cream: {
          light: "#fdf8f0",
          DEFAULT: "#f5ead6",
          dark: "#e8d5b0",
        },
        espresso: {
          light: "#3a2a1a",
          DEFAULT: "#1e1208",
          dark: "#0d0804",
        },
      },
      backgroundImage: {
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
