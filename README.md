# Terminal Landing Page

A minimal SvelteKit landing page presented as an interactive, terminal-only personal homepage.

The terminal runs entirely in the browser. Commands such as `ls`, `cat`, `pwd`, and `cd` use a small virtual filesystem; no operating-system shell or server process is exposed.

## Requirements

- Node.js 18.13 or newer
- npm

## Install

```bash
npm install
```

## Configure personal details

Personal details are stored locally in `src/lib/config.json`, which is intentionally excluded from Git.

Run the interactive setup command:

```bash
npm run configure
```

It asks for:

- Name
- LinkedIn URL
- GitHub URL
- About text

The expected configuration format is available in `src/lib/config.example.json`.

For a fresh checkout, the configuration command creates `src/lib/config.json`. You can also copy the example first:

```bash
cp src/lib/config.example.json src/lib/config.json
npm run configure
```

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

Because `src/lib/config.json` contains personal information and is gitignored, configure the app in the deployment environment before running the build:

```bash
npm install
npm run configure
npm run build
```

Alternatively, provide `src/lib/config.json` through the deployment system before the build step.

## AI-assisted development

This project was developed with assistance from the **Pi coding agent** (an AI coding assistant running in the repository workspace). The assistant was used for implementation, refactoring, documentation, and validation. No AI runtime or API calls are part of the deployed application.

## Project structure

```text
src/routes/+page.svelte       Terminal UI and virtual command handlers
src/lib/config.json           Local personal configuration (ignored)
src/lib/config.example.json   Configuration template
scripts/configure.mjs         Interactive configuration utility
agents.md                     Agent rules and safety guardrails
tasks.md                      Current workspace state
design.md                     Architecture and design notes
```
