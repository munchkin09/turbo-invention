const fs = require('fs-extra');
const {getFileFromUrl} = require('./application/urlContentManager');
const parserManager = require('./application/parserManager');
const hydratorManager = require('./application/hydratorManager');
const {checkOptions} = require('./application/configuration');

module.exports = main;

async function main(url, optionsFilepath) {
    console.log('CleanCrappers is running...');
    try {
        const options = await checkOptions(optionsFilepath);
        const {getNegativeDataFrom, normalizeNegativeData} = parserManager(options);
        const {hydrateHorizontalData} = hydratorManager();
        const fullFileData = await getFileFromUrl(url);
        const negativeData = await getNegativeDataFrom(fullFileData, options);
        const horizontalData = await normalizeNegativeData(negativeData);
        const hydratedHorizontalData = await hydrateHorizontalData(horizontalData);

        await ouputResult(hydratedHorizontalData, options);
    } catch (e) {
        console.log(e);
    }
}

async function ouputResult(hydratedHorizontalData, options) {
    if (options.output.type === 'console') {
        hydratedHorizontalData.forEach(line => {
            console.log(line.line);
        });
        return;
    }

    return fs.writeFile('output.txt', hydratedHorizontalData);
}
