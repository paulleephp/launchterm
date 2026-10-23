# Agent Ground Rules

## Scope

This repository is a SvelteKit landing page that presents a terminal-only personal homepage. Keep the experience intentionally minimal: the terminal is the product, and avoid adding navigation, cards, dashboards, or unrelated page chrome.

## Ground rules

- Inspect the existing implementation before changing it.
- Keep personal information out of tracked source files. Personal values belong in the ignored `.env`; update `.env.example` when the configuration shape changes.
- Never introduce a real server shell or process execution for terminal commands. The browser terminal must remain a virtual, allowlisted filesystem.
- Do not add commands that execute arbitrary JavaScript, spawn processes, access the host filesystem, make arbitrary network requests, or evaluate user input.
- Keep external links fixed by configuration and open only in response to explicit user commands.
- Preserve keyboard accessibility and a way to recover terminal focus.
- Keep terminal output bounded so long sessions remain responsive.
- Use 4 spaces, not tabs. Run Prettier after source changes.
- Use Svelte 5 reactive primitives (`$state`) for mutable component state.
- Prefer small, targeted edits and avoid changing generated files or dependencies without a clear need.

## Validation

Before finishing a change, run:

```bash
npm run check
npm run lint
```

For a production-oriented change, also run `npm run build`.

## Configuration workflow

Personal configuration is generated locally with:

```bash
npm run configure
```

This writes `.env`, which is intentionally gitignored. A new checkout should copy `.env.example` or run the configure command before building. Netlify should receive the same `VITE_TERMINAL_*` values through its environment settings.
