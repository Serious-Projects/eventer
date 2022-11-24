/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./index.html', './src/**/*.{jsx,tsx}'],
   theme: {
      extend: {
         fontFamily: {
            poppins: ["'Poppins'", 'sans-serif'],
         },
         animation: {
            'move-in': 'move-in 1s infinite',
            'circle': 'stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards',
            'fill-in': 'fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both',
            'stroke': 'stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards',
         },
      },
   },
   plugins: [],
};