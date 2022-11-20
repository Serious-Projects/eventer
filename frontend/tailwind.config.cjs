/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./index.html', './src/**/*.{jsx,tsx}'],
   theme: {
      container: {
         center: true,
         padding: {
            sm: '1rem',
         },
      },
      extend: {
         fontFamily: {
            poppins: ["'Poppins'", 'sans-serif'],
         },
         animation: {
            'move-in': 'move-in 1s infinite',
         },
         backgroundImage: {
            'rose-petals': "url('/rose-petals.svg')",
         },
      },
   },
   plugins: [],
};
