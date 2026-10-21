import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const current = {
    name: 'Paul',
    linkedin: 'https://www.linkedin.com/in/paul-lee-2b445734',
    github: 'https://github.com/paulleephp',
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
    const about = await ask('About text', current.about);

    const config = JSON.stringify({ name, linkedin, github, about }, null, '\t') + '\n';

    await writeFile(resolve('src/lib/config.json'), config);
    console.log('\nConfiguration saved to src/lib/config.json\n');
    rl.close();
}

main().catch((error) => {
    rl.close();
    console.error(error);
    process.exitCode = 1;
});
