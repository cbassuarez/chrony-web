import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        page: 'hsl(var(--page))',
        ink: 'hsl(var(--ink))',
        muted: 'hsl(var(--muted))',
        panel: 'hsl(var(--panel))',
        line: 'hsl(var(--line))',
        accent: 'hsl(var(--accent))',
        row: 'hsl(var(--row))',
        rowActive: 'hsl(var(--row-active))',
        rowBorder: 'hsl(var(--row-active-border))',
      },
      borderRadius: {
        micro: '4px',
        compact: '6px',
        standard: '8px',
      },
      boxShadow: {
        card: '0 14px 34px -24px hsl(var(--ink) / 0.28)',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', '"Avenir Next"', '"Segoe UI"', 'sans-serif'],
        serif: ['"IBM Plex Sans"', '"Avenir Next"', '"Segoe UI"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"SFMono-Regular"', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
