/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    container: {
    },
    colors: {
      current: '#0ea5e9',
    }
  },
  plugins: ['prettier-plugin-tailwindcss'],
}

