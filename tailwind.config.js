/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#020617",
          navy: "#0b1630",
          blue: "#1d4ed8",
          soft: "#e5edff"
        }
      },
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "Inter", "sans-serif"]
      },
      boxShadow: {
        card: "0 24px 60px rgba(15, 23, 42, 0.45)"
      }
    }
  },
  plugins: []
};
