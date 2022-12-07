/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./index.html', './src/**/*.{jsx,tsx}'],
   theme: {
      extend: {
         fontFamily: {
            poppins: ["'Poppins'", 'sans-serif'],
            'roboto-mono': ["'Roboto Mono'", 'sans-serif'],
         },
         animation: {
            'move-in': 'move-in 1s infinite',
         },
      },
   },
   plugins: [],
};
