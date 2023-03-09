const fs = require('fs-extra');

const defaultOptions = {
    type: 'skyline',
    style: 'ascii',
    tabs_interpolation: 4,
    spaces: 4,
    output: 'console',
};

const currentOptions = {};

module.exports = {
    async checkOptions(optionsFilepath) {
        if (optionsFilepath === undefined || optionsFilepath === null) {
            console.warn('No path given. Using default options');
            return defaultOptions;
        }

        if(!(await fs.fileExists(optionsFilepath))) return defaultOptions;

        try {
            currentOptions = JSON.parse((await fs.readFile(optionsFilepath, 'utf8')));
        } catch(error) {
            console.warn('Cannot parse options file, using default options. Original error was: ', error);
            return defaultOptions;
        }

        if (currentOptions.output === undefined) {
            throw new Error('No output was provided');
        }

        if (currentOptions.output !== 'console' && options.output !== 'file') {
            throw new Error('Output not supported');
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

        if (currentOptions.tabs_interpolation === undefined) {
            currentOptions.tabs_interpolation = defaultOptions.tabs_interpolation;
        }

        if (currentOptions.spaces === undefined) {
            currentOptions.spaces = defaultOptions.spaces;
        }

        return currentOptions;
    },
};