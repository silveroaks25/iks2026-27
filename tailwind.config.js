/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        paper: 'var(--paper)',
        mute: 'var(--mute)',
        line: 'var(--line)',
        ember: 'var(--ember)',
        ember2: 'var(--ember2)',
        glow: 'var(--glow)',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px var(--glow)',
      },
    },
  },
  plugins: [],
}
