<script lang="ts">
    import { onMount } from 'svelte';
    import config from '../lib/config.json';

    const terminalConfig = {
        ...config,
        githubLabel: config.github.replace(/^https?:\/\//, '').replace(/\/$/, ''),
        linkedinLabel: config.linkedin.replace(/^https?:\/\//, '').replace(/\/$/, '')
    };

    let input = $state('');
    let cwd = $state('~');
    let terminal: HTMLDivElement;
    let inputField: HTMLInputElement;
    let lines = $state([
        {
            text: `Date: ${new Date().toLocaleString('en-US', { timeZoneName: 'short' })} (UTC${formatUtcOffset()})`,
            tone: 'muted'
        },
        { text: `Welcome to ${terminalConfig.name}'s terminal`, tone: 'accent' },
        { text: '', tone: '' },
        { text: "This is a personal terminal. Type 'help' to see what you can do.", tone: '' },
        { text: '', tone: '' }
    ]);

    function formatUtcOffset() {
        const offset = -new Date().getTimezoneOffset();
        const sign = offset >= 0 ? '+' : '-';
        const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
        const minutes = String(Math.abs(offset) % 60).padStart(2, '0');
        return `${sign}${hours}:${minutes}`;
    }

    onMount(() => {
        inputField?.focus();
        // Keep the terminal recoverable if Tab moves focus to browser chrome or another element.
        const recoverFocus = (event: KeyboardEvent) => {
            if (event.key === 'Tab' && document.activeElement !== inputField) {
                requestAnimationFrame(() => inputField?.focus());
            }
        };
        document.addEventListener('keydown', recoverFocus);
        return () => document.removeEventListener('keydown', recoverFocus);
    });

    const files: Record<string, string> = {
        'about.txt': terminalConfig.about,
        'README.md': 'Welcome to my terminal. Try ls, cat about.txt, pwd, or help.'
    };

    function runCommand(event: SubmitEvent) {
        event.preventDefault();
        const command = input.trim();
        lines = [...lines, { text: `guest@xterm:${cwd}$ ${command}`, tone: 'command' }];
        const [name, ...args] = command.split(/\s+/);

        if (name === 'clear') {
            lines = [];
        } else if (name === 'ls') {
            lines = [...lines, { text: 'about.txt  README.md', tone: '' }];
        } else if (name === 'pwd') {
            lines = [...lines, { text: `/home/guest${cwd === '~' ? '' : `/${cwd}`}`, tone: '' }];
        } else if (name === 'cat') {
            const file = args[0];
            lines = [
                ...lines,
                {
                    text: file && files[file] ? files[file] : `cat: ${file ?? ''}: No such file`,
                    tone: file && files[file] ? '' : 'error'
                }
            ];
        } else if (name === 'cd') {
            const destination = args[0] ?? '~';
            if (destination === '~' || destination === '/home/guest') cwd = '~';
            else
                lines = [
                    ...lines,
                    { text: `cd: ${destination}: No such directory`, tone: 'error' }
                ];
        } else if (name === 'help') {
            lines = [
                ...lines,
                { text: 'Available commands:', tone: 'accent' },
                { text: '  about    Learn more about me', tone: '' },
                { text: '  cat      Print a file from the virtual filesystem', tone: '' },
                { text: '  cd       Change virtual directory', tone: '' },
                { text: '  clear    Clear the terminal', tone: '' },
                { text: '  github   Visit my GitHub profile', tone: '' },
                { text: '  help     Show this help message', tone: '' },
                { text: '  linkedin Visit my LinkedIn profile', tone: '' },
                { text: '  ls       List files in the virtual directory', tone: '' },
                { text: '  pwd      Print the current virtual directory', tone: '' }
            ];
        } else if (name === 'about') {
            lines = [...lines, { text: files['about.txt'], tone: '' }];
        } else if (name === 'linkedin') {
            window.open(terminalConfig.linkedin, '_blank', 'noopener,noreferrer');
            lines = [...lines, { text: `Opening ${terminalConfig.linkedinLabel} ...`, tone: '' }];
        } else if (name === 'github') {
            window.open(terminalConfig.github, '_blank', 'noopener,noreferrer');
            lines = [...lines, { text: `Opening ${terminalConfig.githubLabel} ...`, tone: '' }];
        } else if (name) {
            lines = [...lines, { text: `command not found: ${name}`, tone: 'error' }];
        }
        // Keep the DOM bounded so a long session stays responsive.
        if (lines.length > 300) lines = lines.slice(-300);
        input = '';
        requestAnimationFrame(() => {
            terminal?.scrollTo(0, terminal.scrollHeight);
            inputField?.focus();
        });
    }
</script>

<svelte:head>
    <title>xterm.js — terminal for the web</title>
    <meta name="description" content="A terminal emulator for the web" />
</svelte:head>

<main class="terminal-shell" role="application" aria-label="Interactive terminal">
    <div class="window-bar" aria-hidden="true">
        <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
        <span class="window-title">guest@xterm: ~</span>
    </div>
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
    <div
        class="terminal"
        bind:this={terminal}
        onclick={() => inputField?.focus()}
        role="application"
        aria-label="Terminal output"
    >
        {#each lines as line, index (index)}
            <div class="line {line.tone}">{line.text || '\u00a0'}</div>
        {/each}
        <form class="prompt-line" onsubmit={runCommand}>
            <span class="prompt">guest@xterm:~$</span>
            <input
                bind:this={inputField}
                bind:value={input}
                aria-label="Terminal input"
                autocomplete="off"
                autocapitalize="off"
                spellcheck="false"
            />
        </form>
    </div>
</main>

<style>
    :global(*) {
        box-sizing: border-box;
    }
    :global(html, body) {
        margin: 0;
        min-height: 100%;
        background: #0d1117;
    }
    :global(body) {
        overflow: hidden;
    }
    :global(body),
    input {
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
    }
    .terminal-shell {
        height: 100vh;
        width: 100vw;
        background: #0d1117;
        color: #d6deeb;
        display: flex;
        flex-direction: column;
        font-size: clamp(13px, 1.15vw, 16px);
    }
    .window-bar {
        height: 38px;
        flex: 0 0 38px;
        background: #161b22;
        border-bottom: 1px solid #252c35;
        display: flex;
        align-items: center;
        padding: 0 16px;
        position: relative;
    }
    .dot {
        width: 11px;
        height: 11px;
        border-radius: 50%;
        margin-right: 8px;
    }
    .red {
        background: #ff5f57;
    }
    .yellow {
        background: #febc2e;
    }
    .green {
        background: #28c840;
    }
    .window-title {
        color: #77808d;
        font-size: 12px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    .terminal {
        flex: 1;
        overflow-y: auto;
        padding: 28px 32px;
        line-height: 1.65;
        outline: none;
    }
    .line {
        white-space: pre-wrap;
        min-height: 1.65em;
    }
    .accent {
        color: #61afef;
    }
    .muted {
        color: #7f8c98;
    }
    .command {
        color: #c678dd;
    }
    .error {
        color: #e06c75;
    }
    .prompt-line {
        display: flex;
        align-items: baseline;
        min-height: 1.65em;
    }
    .prompt {
        color: #98c379;
        white-space: nowrap;
        margin-right: 9px;
    }
    input {
        border: 0;
        outline: 0;
        background: transparent;
        color: #d6deeb;
        font: inherit;
        padding: 0;
        min-width: 0;
        flex: 1;
        caret-color: #61afef;
    }
    @media (max-width: 600px) {
        .terminal {
            padding: 20px 16px;
        }
        .window-bar {
            padding-left: 12px;
        }
    }
</style>
