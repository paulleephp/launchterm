# Workspace State

## Current implementation

- SvelteKit terminal-only landing page is implemented in `src/routes/+page.svelte`.
- The page renders a full-screen terminal UI with a small window bar, prompt, welcome message, date/time display, and focus recovery.
- The terminal uses an in-browser virtual filesystem; it does not execute operating-system commands.
- Supported commands currently include `about`, `cat`, `cd`, `clear`, `email`, `github`, `help`, `linkedin`, `ls`, and `pwd`.
- Terminal history is capped at 300 lines to prevent long sessions from degrading performance.
- Email opens a configured `mailto:` link; GitHub and LinkedIn open configured links in a new tab.

## Configuration

- `.env` contains local personal values and is gitignored.
- `.env.example` documents the expected `VITE_TERMINAL_*` variables.
- `npm run configure` interactively creates or updates local environment configuration, including email and about text.

## Tooling state

- Prettier is configured for spaces with `tabWidth: 4`.
- Formatting has been applied to `src/`, `scripts/`, `package.json`, and the Prettier configuration.
- `npm run check` currently passes with no errors or warnings.

## Follow-up considerations

- Ensure Netlify environment variables are configured before building, since `.env` is not committed.
- The project uses `@sveltejs/adapter-static` and publishes the generated `build/` directory through `netlify.toml`.
- If more virtual commands are added, keep them explicitly allowlisted and update the `help` output and guardrails documentation.
