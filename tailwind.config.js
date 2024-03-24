/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      'azulMarino': '#100D40',
      'Blanco': '#FAF9FF',
      'BlancoClaro': '#FFFFFF80',
      'MoradoClaro': '#F1EDFF',
      'GrisClaro': '#F2F2F2',
      'Gris': '#999999',
      'Rojo': '#FF552F',
      'NegroInputs': '#333333',
      'GrisLabel': '#020614'

    },
  },
  plugins: [],
};
