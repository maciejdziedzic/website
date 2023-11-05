/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          "background-primary": "#ffffff",
          "background-secondary": "#f0f0f0",
          text: "#000000",
        },
        dark: {
          "background-primary": "#606269",
          "background-secondary": "#2a2a2a",
          "dark-text": "rgb(59, 80, 69)",
        },
      },
    },
  },
  plugins: [],
};
