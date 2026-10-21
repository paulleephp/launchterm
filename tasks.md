# Workspace State

## Current implementation

- SvelteKit terminal-only landing page is implemented in `src/routes/+page.svelte`.
- The page renders a full-screen terminal UI with a small window bar, prompt, welcome message, date/time display, and focus recovery.
- The terminal uses an in-browser virtual filesystem; it does not execute operating-system commands.
- Supported commands currently include `about`, `cat`, `cd`, `clear`, `github`, `help`, `linkedin`, `ls`, and `pwd`.
- Terminal history is capped at 300 lines to prevent long sessions from degrading performance.
- GitHub and LinkedIn commands open the configured links in a new tab.

## Configuration

- `src/lib/config.json` contains local personal values and is gitignored.
- `src/lib/config.example.json` documents the expected configuration shape.
- `npm run configure` interactively creates or updates the local JSON configuration.

## Tooling state

- Prettier is configured for spaces with `tabWidth: 4`.
- Formatting has been applied to `src/`, `scripts/`, `package.json`, and the Prettier configuration.
- `npm run check` currently passes with no errors or warnings.

## Follow-up considerations

- Ensure deployment runs `npm run configure` or otherwise supplies `src/lib/config.json` before building, since the file is not committed.
- If the configuration strategy changes to environment variables, update the import path, configure script, and deployment documentation together.
- If more virtual commands are added, keep them explicitly allowlisted and update the `help` output and guardrails documentation.
