/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        expand: {
          "0%": { top: "69%" },
          "100%": { top: "0" }
        }
      },
      animation: {
        expand: "expand 0.5s ease-in-out"
      }
    }
  },
  plugins: []
};
