# Evalbranch

A blog about AI developer tools — coding agents, LLM APIs, prompt engineering, and evaluation tooling.

- **Stack:** Astro 5 + @astrojs/sitemap, Markdown content collection
- **Published by:** the OnlyOrders team (https://onlyorders.tech)
- **Pages:** GitHub Pages at https://john-the-r-ipper.github.io/evalbranch/
- **Vercel:** https://evalbranch.vercel.app

## Scripts

- `npm run dev` — local dev
- `npm run build` — production build
- `npm run preview` — preview build
- `npm run check:live` — Playwright post-deploy checks (set `BASE_URL`)
- `npm run indexnow` — submit URLs to IndexNow (set `BASE_URL`)

## Content

Articles live in `src/content/blog/`. Add a Markdown file with the required frontmatter (title, description, pubDate, category, tags, sources, mentionsPublisher). Each article must cite real sources.

No secrets are stored in this repository. The IndexNow key file in `public/` is public by design.
