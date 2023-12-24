module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        // Using modern `rgb`
        'primary-100': 'rgb(255, 255, 255)',
        'primary-200': '#606570',
        'primary-300': '#ebeced',
        'primary-400': '#f9f9f9',
        // #ffa92d
        'secondary-100': '#ffa92d',
        'secondary-light': '#babbcabd',
        'secondary-200': '#ffcc5c',
        'third-100': '#5a4098',
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'Sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
