const fs = require('fs-extra');
const {getFileFromUrl} = require('./application/urlContentManager');
const {getNegativeDataFrom, normalizeNegativeData} = require('./application/fileParserManager');
const {hydrateHorizontalData} = require('./application/pixelsHydrationManager');
const {checkOptions} = require('./application/configuration');

module.exports = main;

async function main(url, optionsFilepath) {
    console.log('CleanCrapper is running...');
    const options = await checkOptions(optionsFilepath);
    const fullFileData = await getFileFromUrl(url);
    const negativeData = await getNegativeDataFrom(fullFileData, options);
    const horizontalData = await normalizeNegativeData(negativeData);
    const hydratedHorizontalData = await hydrateHorizontalData(horizontalData);

    await ouputResult(hydratedHorizontalData, options);
}

async function ouputResult(hydratedHorizontalData, options) {
    if (options.output === 'console') {
        hydratedHorizontalData.forEach(line => {
            console.log(line.line);
        });
        return Promise.resolve();
    }

    return fs.writeFile('output.txt', hydratedHorizontalData);
}
