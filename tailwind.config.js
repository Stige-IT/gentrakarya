/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "custom-dark": "#111827",
        "custom-yellow": "#FFD302",
        "custom-blue": "#0093DD",
      },
    },
  },
  plugins: [
    require("rippleui")
  ],
}

