# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static personal portfolio website for Monkir Chowdhury — plain HTML/CSS/JS with no build step, no package manager, and no test suite. It's deployed as-is to GitHub Pages.

## Development

There is no build/lint/test tooling (no `package.json`). To preview changes, just open `index.html` in a browser or serve the folder with any static file server (e.g. `npx serve` or the VS Code "Live Server" extension). There's nothing to compile or bundle.

Formatting follows `.prettierrc` (4-space indent, single quotes, semicolons, 100-char print width) — run Prettier manually if available, since there's no configured script for it.

## Deployment

`.github/workflows/static.yml` deploys the entire repository to GitHub Pages on every push to `main` (or manual dispatch). There is no CI build/test step — whatever is committed to `main` is published directly, so verify pages render correctly in a browser before pushing.

## Architecture

- `index.html` — the single-page site (hero, about, skills, experience timeline, projects grid, contact, footer). All sections live on this one page, navigated via in-page anchors (`#about`, `#skills`, etc.).
- `projects/*.html` — one static case-study page per project, linked from the projects grid in `index.html`. Each is a standalone HTML document (not a template/partial) that duplicates the same header, mobile sidebar, and footer markup as `index.html`, with relative paths adjusted (`../assets/...`, `../index.html#section`). When adding a new project page, copy an existing one (e.g. `projects/bus-ticketing.html`) as the starting point to keep this structure consistent, and add a matching card to the `.projects-grid` in `index.html`.
- `assets/styles.css` — single stylesheet for the entire site (~1300 lines), organized in commented sections (custom cursor, background/stars, header/nav, hero, about, skills tabs, timeline, project cards, project case-study pages, contact, footer). Uses CSS custom properties defined in `:root` (`--bg`, `--accent`, `--text`, `--muted`, etc.) for the color system — reuse these variables rather than hardcoding colors.
- `assets/script.js` — single vanilla JS file wiring up all interactive behavior: custom cursor follower, 3D tilt effect on `[data-tilt]` elements, scroll-reveal via `IntersectionObserver` on `.reveal` elements, skills-tab switching, mobile sidebar open/close, footer year, and scroll-based active-nav-link highlighting. No modules/bundler — it's loaded directly via a `<script>` tag on every page.
- `assets/logo/` and `assets/projects/` — SVG/PNG logos and per-project cover images referenced by `index.html` and the project pages.
- `assets/*.pdf` — resume/CV files linked from the header, sidebar, and hero "Download CV" buttons.

## Conventions to follow

- Keep the header, mobile sidebar, and footer markup identical across `index.html` and every `projects/*.html` page (aside from relative link prefixes) — there's no shared layout/include mechanism, so changes to nav/footer must be manually replicated across all HTML files.
- New interactive UI elements that should animate in on scroll get the `reveal` class; elements wanting the mouse-tilt/shine effect get `data-tilt`.
- Contact form (`#contact`) has no backend — its `onsubmit="return false"` is a placeholder with no submission logic wired up.
