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
            `VITE_TERMINAL_NAME=${JSON.stringify(name)}`,
            `VITE_TERMINAL_LINKEDIN=${JSON.stringify(linkedin)}`,
            `VITE_TERMINAL_GITHUB=${JSON.stringify(github)}`,
            `VITE_TERMINAL_EMAIL=${JSON.stringify(email)}`,
            `VITE_TERMINAL_ABOUT=${JSON.stringify(about)}`
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
