import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#1E7A38',   // muted forest green — accent only
        'dark-green': '#0E4520',
        'deep-green': '#194D2A',
        'surface': '#111111',
        'card': '#181818',
        'cream': '#F0EDE4',
        'pale-blue': '#A8C4DF',
        'gold': '#C9A84C',
        'coral': '#D94530',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
        'ultra-wide': '0.25em',
      },
    },
  },
  plugins: [],
}

export default config
