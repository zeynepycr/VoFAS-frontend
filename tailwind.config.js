/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        colors: {
          // Main Colors
          primary: '#004EB9', // Primary-40 Blue
          secondary: '#707070', // Primary-30 Gray
          purple: '#B392F0', // Primary-30 Purple

          // Chart Colors
          red: '#BB2222',
          yellow: '#F1DC00',
          green: '#46CD39',

          // Primary Blue Shades
          'primary-10': '#C2E4FF',
          'primary-20': '#5CB8FF',
          'primary-30': '#008BF5',
          'primary-40': '#004EB9',
          'primary-50': '#002E52',

          // Secondary Gray Shades
          'gray-10': '#C2C2C2',
          'gray-20': '#999999',
          'gray-30': '#707070',
          'gray-40': '#525252',
          'gray-50': '#333333',

          // Tertiary Purple Shades
          'purple-10': '#F5F0FF',
          'purple-20': '#D1BCF9',
          'purple-30': '#B392F0',
          'purple-40': '#8A63D2',
          'purple-50': '#6F42C1',

          // Chart Hover Colors
          'red-hover': '#D94444',
          'yellow-hover': '#FFE94D',
          'green-hover': '#66E25A',
        }
      }
    },
  },
  plugins: [],
}