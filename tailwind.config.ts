import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Black & white system — legacy token names kept so existing classes resolve to monochrome.
        'brand-green': '#FFFFFF',
        'dark-green': '#0A0A0A',
        'deep-green': '#1A1A1A',
        'surface': '#111111',
        'card': '#181818',
        'cream': '#F4F4F2',
        'pale-blue': '#D4D4D4',
        'gold': '#A3A3A3',
        'coral': '#737373',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
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
