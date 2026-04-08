/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:     '#0A0B0D',
        bg2:    '#111318',
        bg3:    '#181C23',
        amber:  '#F5A623',
        amber2: '#FFD166',
        pdxred: '#E63946',
        pdxtext:'#E8E6E0',
        muted:  '#7A7F8E',
        border: '#242830',
        pdxgrn: '#2ECC71',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        mono:    ['var(--font-space-mono)', 'monospace'],
        body:    ['var(--font-barlow)', 'sans-serif'],
        cond:    ['var(--font-barlow-cond)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
