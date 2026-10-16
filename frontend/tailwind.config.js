/** @type {import('tailwindcss').Config} */
export default {
  content: {
    relative: true, // rutas relativas a este archivo, no al cwd
    files: ['./index.html', './src/**/*.{js,jsx}'],
  },
  theme: {
    extend: {
      colors: {
        // Verde sostenibilidad
        eco: {
          50: '#effaf3',
          100: '#d8f3e1',
          200: '#b3e6c6',
          300: '#7fd2a3',
          400: '#47b77c',
          500: '#259b60',
          600: '#187d4c',
          700: '#14643f',
          800: '#135034',
          900: '#10422c',
          950: '#082519',
        },
        // Azul tecnológico
        tech: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcdaff',
          300: '#8ec3ff',
          400: '#59a1ff',
          500: '#337dfc',
          600: '#1c5ef1',
          700: '#1549d6',
          800: '#183dad',
          900: '#1a3888',
          950: '#0f1f45',
        },
        // Fondos "hoja en blanco"
        paper: {
          DEFAULT: '#fbfbf8',
          50: '#ffffff',
          100: '#fbfbf8',
          200: '#f3f3ee',
          300: '#e7e7df',
        },
        ink: '#0e1a17',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        sheet: '0 1px 0 rgba(14,26,23,.04), 0 12px 32px -12px rgba(14,26,23,.18)',
      },
      keyframes: {
        feed: {
          '0%': { transform: 'translateY(-18%)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        spinslow: { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        feed: 'feed 1.6s cubic-bezier(.2,.8,.2,1) both',
        spinslow: 'spinslow 24s linear infinite',
      },
    },
  },
  plugins: [],
}
