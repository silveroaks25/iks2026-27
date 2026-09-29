# Indian Knowledge Systems · Silver Oaks International School

Premium static learning journey for GitHub Pages. Progress, awards, theme, volume, and answers persist in the browser with LocalStorage. No backend is required.

## Local development

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

The site uses HashRouter (`/#/explore`, `/#/awards`) so nested links work on GitHub Pages.

## GitHub Pages

1. Push this repository to GitHub.
2. Settings → Pages → Source: **GitHub Actions**.
3. Push to `main` (or `master`). The workflow in `.github/workflows/deploy.yml` builds and deploys `dist`.
4. Manual deploy is also available from the Actions tab.

`vite.config.ts` sets `base: './'` so assets resolve on project pages.

## Architecture

| Layer | Location |
| --- | --- |
| Locked educational content | `src/content/iks.ts` |
| Awards | `src/content/awards.ts` |
| Progress + settings | `src/lib/storage.ts`, `src/lib/ProgressContext.tsx` |
| Sound | `src/lib/sound.ts` (optional, off if muted) |
| UI | `src/pages`, `src/components` |

Supabase is **not** used. Cross-device sync would need a backend; local progress is the intended model for GitHub Pages.

## Completing a level

1. Watch every required video (optional traveller clips do not block completion).
2. Answer every mission prompt for the selected grade band.
3. Use **Seal this chapter**. The matching award unlocks and the next gate opens.
4. Section 6 grants the **Completer** award.

## Accessibility

Semantic landmarks, skip link, keyboard-usable controls, visible focus, and `prefers-reduced-motion` support.

## Brand assets

Placed in `public/assets/`:

- School wordmark
- Knowledge-book hero still
- Oak-leaf texture
- “Character Before Competence” image (renders after the footer)

Educational wording is stored exactly as supplied and must not be rewritten.
