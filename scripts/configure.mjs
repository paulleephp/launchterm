import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const current = {
    name: 'Your Name',
    linkedin: 'https://www.linkedin.com/in/your-profile',
    github: 'https://github.com/your-username',
    email: 'you@example.com',
    about: "I'm a fullstack developer who builds thoughtful, reliable web applications from front to back."
};

const serializeEnvValue = (value) => {
    const quote = ["'", '`', '"'].find(
        (character) => !value.includes(character) && (character !== '"' || !/\\[nr]/.test(value))
    );
    const escaped = value.replaceAll('$', '\\$');

    if (quote) {
        return `${quote}${escaped}${quote}`;
    }

    if (value.includes('#') || /[\r\n]/.test(value)) {
        throw new Error('Unable to safely serialize configuration value');
    }

    return escaped;
};

const rl = createInterface({ input, output });
const ask = async (label, fallback) => {
    const answer = (await rl.question(`${label} [${fallback}]: `)).trim();
    return answer || fallback;
};

async function main() {
    console.log('\nConfigure your terminal landing page\n');
    const name = await ask('Your name', current.name);
    const linkedin = await ask('LinkedIn URL', current.linkedin);
    const github = await ask('GitHub URL', current.github);
    const email = await ask('Email address', current.email);
    const about = await ask('Introduction for about.txt', current.about);

    const config =
        [
            `VITE_TERMINAL_NAME=${serializeEnvValue(name)}`,
            `VITE_TERMINAL_LINKEDIN=${serializeEnvValue(linkedin)}`,
            `VITE_TERMINAL_GITHUB=${serializeEnvValue(github)}`,
            `VITE_TERMINAL_EMAIL=${serializeEnvValue(email)}`,
            `VITE_TERMINAL_ABOUT=${serializeEnvValue(about)}`
        ].join('\n') + '\n';

    await writeFile(resolve('.env'), config);
    console.log('\nConfiguration saved to .env\n');
    rl.close();
}

main().catch((error) => {
    rl.close();
    console.error(error);
    process.exitCode = 1;
});
