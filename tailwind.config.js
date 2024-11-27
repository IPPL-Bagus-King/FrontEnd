/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Tambahkan Poppins ke fontFamily
      },
      fontSize: {
        '13px': '13px', // Tambahkan ukuran font 13px
      },
      colors: {
        grayish: '#818181', // Tambahkan warna #818181
      },
    },
  },
  plugins: [],
};
