export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f8fafc',
        secondary: '#334155',
        accent: '#0f172a',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}