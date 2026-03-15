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
        glow: 'hsl(var(--glow))',
      },
      borderRadius: {
        xl: '1rem',
      },
      boxShadow: {
        card: '0 16px 48px -24px hsl(var(--ink) / 0.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', '"Avenir Next"', '"Segoe UI"', 'sans-serif'],
        serif: ['"Source Serif 4"', '"Iowan Old Style"', 'serif'],
        mono: ['"JetBrains Mono"', '"SFMono-Regular"', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
