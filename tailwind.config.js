/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      letterSpacing: {
        'super-wide': '0.25em', // tag untuk menambah nilai jarak antar huruf
      },
    },
  },
  plugins: [],
}