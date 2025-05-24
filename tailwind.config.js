/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1a202c',
            p: {
              marginTop: '0.75em',
              marginBottom: '0.75em',
            },
            'ul, ol': {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            li: {
              marginTop: '0.25em',
              marginBottom: '0.25em',
            },
            h1: {
              marginTop: '1em',
              marginBottom: '0.5em',
            },
            h2: {
              marginTop: '0.75em',
              marginBottom: '0.5em',
            },
            h3: {
              marginTop: '0.75em',
              marginBottom: '0.5em',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
