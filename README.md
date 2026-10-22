# Terminal Landing Page

A minimal SvelteKit landing page presented as an interactive, terminal-only personal homepage.

Live example: [launchterm.netlify.app](https://launchterm.netlify.app/)

The terminal runs entirely in the browser. Commands such as `ls`, `cat`, `pwd`, and `cd` use a small virtual filesystem; no operating-system shell or server process is exposed.

## Requirements

- Node.js 18.13 or newer
- npm

## Install

```bash
npm install
```

## Configure personal details

Personal details are stored in local `.env` variables, which are intentionally excluded from Git.

Run the interactive setup command:

```bash
npm run configure
```

It asks for:

- Name
- LinkedIn URL
- GitHub URL
- Email address
- About text

The expected configuration format is available in `.env.example`. The configuration command creates or updates `.env` with the same variables used by Netlify.

## Run locally

Start the development server:

```bash
npm run dev
```

Open the URL shown by Vite, usually [http://localhost:5173](http://localhost:5173).

To open the browser automatically:

```bash
npm run dev -- --open
```

## Available terminal commands

```text
about
cat about.txt
cd
clear
email
github
help
linkedin
ls
pwd
```

`github` and `linkedin` open the configured profile in a new browser tab. The terminal only accepts its explicitly implemented commands and cannot execute arbitrary system commands.

## Validate and build

Run type checking and Svelte diagnostics:

```bash
npm run check
```

Check formatting and lint rules:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run formatting when needed:

```bash
npm run format
```

## Deployment note

Because `.env` contains personal information and is gitignored, configure the variables in the deployment environment before building. In Netlify, add the following environment variables in Site configuration → Environment variables:

```text
VITE_TERMINAL_NAME
VITE_TERMINAL_LINKEDIN
VITE_TERMINAL_GITHUB
VITE_TERMINAL_EMAIL
VITE_TERMINAL_ABOUT
```

The Netlify CLI is included as a local development dependency, so no global installation is needed. After `npm install`, authenticate with:

```bash
npm run netlify:login
```

The login command opens a browser so you can authorize the CLI. Run the Netlify build locally with:

```bash
npm run netlify:build
```

Deploy a draft/preview with:

```bash
npm run netlify:deploy
```

Deploy directly to the production site with:

```bash
npm run netlify:deploy:prod
```

`npm run netlify:build` runs `netlify build`. `npm run netlify:deploy` runs `netlify deploy --build`. `npm run netlify:deploy:prod` adds the Netlify `--prod` flag.

For Netlify’s hosted Git builds, use this build command in the site settings:

```bash
npm run build
```

For local development, `npm run configure` writes the same variables to `.env`.

## AI-assisted development

This project was developed with assistance from the **Pi coding agent** (an AI coding assistant running in the repository workspace). The assistant was used for implementation, refactoring, documentation, and validation. No AI runtime or API calls are part of the deployed application.

## Project structure

```text
src/routes/+page.svelte       Terminal UI and virtual command handlers
.env                         Local personal configuration (ignored)
.env.example                 Configuration template
scripts/configure.mjs        Interactive configuration utility
agents.md                     Agent rules and safety guardrails
tasks.md                      Current workspace state
design.md                     Architecture and design notes
```
