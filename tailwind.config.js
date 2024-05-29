/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'sans': ['var(--font-body)'],
      },
      colors:{
        'lred': 'rgb(239 68 68)',
        'bred': 'rgb(248 113 113)',
        'primary': '#714B67',
        'sgreen': {
          '100': '#CFEAEF',
          '200': '#C6DFE4',
          '400': '#017e84',
          '500': '#BCD4D9',
          '600': '#A2C0C6',
        },
        'lc1': 'rgba(0, 0, 0, 0.87)',
        'white': '#fff'
      }
    },
    
  },
  plugins: [],
}
