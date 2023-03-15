const path = require('path');

const fs = require('fs-extra');

const defaultOptions = {
    type: 'skyline',
    style: 'ascii',
    tabsInterpolation: 4,
    spaces: 4,
    output: {
        type: 'console',
        chars: {
            cloud: '#',
            street: '▁',
            building: 'I',
            foundation: '¡',
        },
    },
};

module.exports = {
    async checkOptions(optionsFilepath) {
        let currentOptions = {};
        if (optionsFilepath === undefined || optionsFilepath === null) {
            console.warn('No path given. Using default options');
            return defaultOptions;
        }

        const pathToOpen = path.resolve(optionsFilepath);
        if (!(await fs.exists(pathToOpen))) {
            console.warn('Path given does not exists. Using default options');
            return defaultOptions;
        }

        try {
            currentOptions = {...JSON.parse((await fs.readFile(pathToOpen, 'utf8')))};
        } catch (error) {
            console.warn(`Cannot parse options file, using default options. Original error was: ${error}`);
            return defaultOptions;
        }

        if (currentOptions.output === undefined) {
            throw new Error('No output was provided');
        }

        if (currentOptions.output.type !== 'console' && currentOptions.output.type !== 'file') {
            throw new Error(`Output not supported Given: ${currentOptions.output} Supported: console, file`);
        }

        if (currentOptions.type === undefined) {
            currentOptions.type = defaultOptions.type;
        }

        if (currentOptions.type !== 'skyline' && currentOptions.type !== 'landscape') {
            currentOptions.type = defaultOptions.type;
        }

        if (currentOptions.style === undefined) {
            currentOptions.style = defaultOptions.style;
        }

        if (currentOptions.style !== 'ascii' && currentOptions.style !== 'unicode') {
            currentOptions.style = defaultOptions.style;
        }

        if (currentOptions.tabsInterpolation === undefined) {
            currentOptions.tabsInterpolation = defaultOptions.tabsInterpolation;
        }

        if (currentOptions.spaces === undefined) {
            currentOptions.spaces = defaultOptions.spaces;
        }

        currentOptions.output.chars = {
            cloud: defaultOptions.output.chars.cloud,
            street: defaultOptions.output.chars.street,
            building: defaultOptions.output.chars.building,
            foundation: defaultOptions.output.chars.foundation,
        };

        return currentOptions;
    },
};
