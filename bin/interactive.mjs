import inquirer from 'inquirer';

import index from '../src/index.mjs';

const questions = [
    {
        type: 'confirm',
        name: 'amIARobot',
        message: 'Are you a robot? (I´m not sure if I should trust you) 🤖',
        default: false,
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Can you provide me a raw file code url? (example: https://raw.githubusercontent.com/username/repo/master/file.js)',
        validate(value) {
            const expression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
            const regex = new RegExp(expression);
            const pass = value.match(regex);
            if (pass) {
                return true;
            }

            return 'Please enter a valid url';
        },
    },
];

(async function () {
    const answers = await inquirer
        .prompt(questions);

    await index(answers.url, {...answers});
})();
