/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        bluelight: "#4189DD",
        greenlight: "#4ade80",
        redlight: "#f87171",
        orangelight: "#fb923c",
        graylight: "#9ca3af",
      },
    },
  },
  plugins: [],
};
