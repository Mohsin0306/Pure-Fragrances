/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a1a2e",
      }
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-/,
    },
    {
      pattern: /text-/,
    },
    {
      pattern: /border-/,
    },
  ]
}