# chrony-web

Marketing, support, and legal website for chrony.

## Stack

- React + TypeScript + Vite
- React Router
- Tailwind CSS + shadcn-style UI primitives
- Framer Motion
- Paper shaders (`@paper-design/shaders-react`)
- Vitest + React Testing Library

## Routes

- `/`
- `/download`
- `/privacy`
- `/terms`
- `/support`
- `/about`

## Development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Deploy (GitHub Pages)

This repo deploys via `.github/workflows/deploy.yml` on push to `main`.

### Required GitHub settings

1. Repo Settings -> Pages -> Source: **GitHub Actions**
2. Repo Settings -> Pages -> Custom domain: `chronyapp.com`
3. Enable **Enforce HTTPS** once certificate is issued.

### Cloudflare DNS records

Create these records:

- `A` `@` -> `185.199.108.153`
- `A` `@` -> `185.199.109.153`
- `A` `@` -> `185.199.110.153`
- `A` `@` -> `185.199.111.153`
- `AAAA` `@` -> `2606:50c0:8000::153`
- `AAAA` `@` -> `2606:50c0:8001::153`
- `AAAA` `@` -> `2606:50c0:8002::153`
- `AAAA` `@` -> `2606:50c0:8003::153`
- `CNAME` `www` -> `cbassuarez.github.io`

Use apex (`chronyapp.com`) as canonical host.

## Notes

- `public/CNAME` is committed as `chronyapp.com`.
- `public/404.html` includes SPA fallback logic for deep links on GitHub Pages.
- Website intentionally ships with no analytics/cookies in v1.
