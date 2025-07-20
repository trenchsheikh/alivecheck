/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#f0fdfa',
            100: '#ccfbf1',
            500: '#0d9488',
            600: '#0f766e',
            700: '#115e59',
            800: '#134e4a',
            900: '#042f2e',
          },
          accent: {
            100: '#fef3c7',
            200: '#fef08a',
            500: '#f59e0b',
          },
          danger: {
            500: '#ef4444',
            600: '#dc2626',
          }
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
        },
        animation: {
          'pulse-success': 'pulse-success 0.6s ease-in-out',
          'fade-in': 'fade-in 0.3s ease-out',
        },
        keyframes: {
          'pulse-success': {
            '0%': { transform: 'scale(1)', backgroundColor: 'rgb(13 148 136)' },
            '50%': { transform: 'scale(1.05)', backgroundColor: 'rgb(6 182 212)' },
            '100%': { transform: 'scale(1)', backgroundColor: 'rgb(13 148 136)' },
          },
          'fade-in': {
            '0%': { opacity: '0', transform: 'translateY(10px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          }
        }
      },
    },
    plugins: [],
  }