# Repository Guidelines

## Project Structure & Module Organization
- Extension popup UI lives in `src/App.tsx` with the React entry at `src/main.tsx`; styles are split across `src/App.css` and `src/index.css` with Tailwind utility classes used inline.
- The content script that finds and clicks target elements is in `src/content/index.ts`.
- Extension metadata and icons live in `public/manifest.json` and `public/icons/`; the production bundle lands in `dist/` after a build and is what you load as an unpacked extension.

## Build, Test, and Development Commands
- `npm install` to fetch dependencies.
- `npm run dev` starts Vite for quick UI iteration of the popup (Chrome extension loading still requires a build).
- `npm run build` runs TypeScript project references then Vite to produce `dist/` with the manifest, popup bundle, and content script.
- `npm run preview` serves the built popup for manual sanity checks; still use `dist/` for Chrome.
- `npm run lint` runs ESLint (TS + React Hooks + Refresh configs) across the repo.

## Coding Style & Naming Conventions
- TypeScript + React functional components with hooks; prefer descriptive hook state names (`selector`, `status`) and arrow functions for handlers.
- Use 2-space indentation, single quotes in TS/TSX, and Tailwind utility classes for layout.
- Keep content-script logic defensive: null-check DOM nodes and guard rapid clicks (`CLICK_COOLDOWN` pattern).
- Store extension settings under explicit keys in `chrome.storage.sync` (`selector`, `text`) to avoid collisions.

## Testing Guidelines
- No automated tests exist yet; prioritize manual verification: `npm run build`, load `dist/` as an unpacked extension in Chrome, set selector/text in the popup, and confirm the content script logs and clicks the intended element.
- When adding tests, prefer lightweight unit tests for DOM helpers and integration smoke tests for popup form state; keep selectors stable and avoid brittle text-dependent assertions.

## Commit & Pull Request Guidelines
- No prior history; use clear, imperative commit subjects (e.g., `Add content script cooldown`). Conventional Commits are welcome but not required.
- In PRs, include a short summary of behavior changes, manual test notes (browser + page used for validation), and screenshots/GIFs of the popup when UI changes occur.
- Keep diffs small and scoped (UI vs. content-script logic vs. manifest changes), and note any storage key or permission changes explicitly.
