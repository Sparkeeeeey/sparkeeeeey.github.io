/** @type {import('tailwindcss').Config} */
const hn = ['"Helvetica Neue ME"', 'Helvetica', 'Arial', 'sans-serif']
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { cream: '#efeee9', ink: '#0d0d0d' },
      fontFamily: { hn, sans: hn, serif: hn },
    },
  },
  plugins: [],
}
