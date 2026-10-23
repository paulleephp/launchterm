# Design Notes and Special-Purpose Configuration

## Visual direction

- Full viewport terminal and nothing else.
- Dark GitHub/xterm-inspired palette with a restrained macOS-style window bar.
- Monospace typography, readable line height, and responsive horizontal padding.
- No remote fonts or external UI framework are required.

## Terminal model

The terminal is a presentation layer over a deliberately tiny virtual machine:

- `src/routes/+page.svelte` owns input, output history, focus, command dispatch, and environment-backed personal configuration.
- The virtual filesystem is an in-memory `Record<string, string>`.
- Commands are parsed into a command name and arguments, then handled by explicit branches.
- Unknown commands return an error; they are never passed to a shell or evaluator.
- `ls`, `cat`, `pwd`, and `cd` operate only on the virtual filesystem and virtual home directory.
- Social and email commands use only configured `VITE_TERMINAL_*` values. Email navigates only to the configured `mailto:` address.

## Personal configuration schema

Personal values are supplied through `.env` locally and Netlify environment variables in deployment:

```env
VITE_TERMINAL_NAME="Your Name"
VITE_TERMINAL_LINKEDIN="https://www.linkedin.com/in/your-profile"
VITE_TERMINAL_GITHUB="https://github.com/your-username"
VITE_TERMINAL_EMAIL="you@example.com"
VITE_TERMINAL_ABOUT="A short introduction about you."
```

Display labels are derived from the configured URLs at runtime. Do not duplicate personal URLs in the component.

## Configuration command

`scripts/configure.mjs` uses Node's standard readline API and writes the five `VITE_TERMINAL_*` values above to the local `.env` file. It is intentionally a local setup utility and does not make network requests.

## Safety guardrails

- No `child_process`, `node-pty`, WebSocket shell bridge, eval, or dynamic module loading.
- No arbitrary URL command or user-supplied URL navigation.
- No host filesystem access from the browser terminal.
- Keep the virtual command set small and documented in `help`.
- Keep output history bounded to protect the DOM during prolonged use.
