module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        black: '#000000',
        lightGray: {
          100: '#8a8a8a',
          200: '#bfc1c0',
          300: '#c0cecd',
          400: '#e4e3e2',
          500: '#ebebeb',
          600: '#f2f2f2',
          700: '#fbfbfb',
        },
        darkGray: {
          100: '#6e6e6e',
          200: '#4f4f50',
          300: '#434444',
          400: '#373737',
          500: '#2e2e2e',
          600: '#222222',
          700: '#141414',
        },
        lightBlue: {
          100: '#67a9ed',
          200: '#8ab6e9',
          300: '#b1cef0',
          400: '#d8e7f8',
          500: '#e5f0f9',
        },
        darkBlue: {
          100: '#1e63b8',
          200: '#325a9f',
          300: '#2f5392',
          400: '#2a487f',
          500: '#013063',
        },
        lightGreen: {
          100: '#94ce9c',
          200: '#c0ddc5',
          300: '#d4e8d9',
          400: '#e2ede4',
        },
        darkGreen: {
          100: '#80ae35',
          200: '#21a339',
          300: '#177f2f',
          400: '#42581a',
        },
        lightAmber: {
          100: '#fec271',
          200: '#ffd69f',
          300: '#ffebcf',
          400: '#fcefde',
        },
        darkAmber: {
          100: '#ecac43',
          200: '#fb902d',
          300: '#fc7b10',
          400: '#aa4f04',
        },
        lightRed: {
          100: '#df6668',
          200: '#eb999a',
          300: '#f5cccd',
          400: '#f7d9d9',
        },
        darkRed: {
          100: '#fe2c32',
          200: '#cb0712',
          300: '#a2040d',
          400: '#790207',
        },
      },
      fontFamily: {
        title: ['"Patua One"', 'cursive'],
      },
    },
  },
  plugins: [],
};
