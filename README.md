# Haozhe Li — Portfolio

An editorial-style React portfolio built with Vite, Tailwind CSS, Radix Dialog,
React Router, and i18next.

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Content and translations

Stable project metadata lives in `src/data/portfolio.json`. User-facing copy
lives in the locale JSON files:

- `src/locales/en/translation.json`
- `src/locales/zh/translation.json`

The TypeScript files under `src/types` and `src/data/portfolio.ts` only define
and validate the data shape. They do not contain portfolio copy.

The site routes are `/`, `/timeline`, `/about`, `/contact`, and
`/projects/:projectId`. Shared navigation, language switching, and the ink
canvas live in `src/components/AppLayout.tsx`.

Projects with long-form case studies can opt into a detail route at
`/projects/:projectId`. Add a Markdown filename to the project's `markdown`
field in `src/data/portfolio.json`, then create the matching file under
`src/content/projects/`. Markdown images can use `assets/example.png`; place
those files under `public/project-assets/<project-id>/`.

The local Source Han Serif SC web subset is generated from the current JSON
content and stored under `src/assets/fonts/SourceHanSerifSC/Web`. If new Chinese
characters are added to the content, regenerate the subset before building the
site.
