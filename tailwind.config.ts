/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: "#00ffcc", // Neon accent color
        dark: "#121212", // Dark background color
      },
    },
  },
  plugins: [],
};
