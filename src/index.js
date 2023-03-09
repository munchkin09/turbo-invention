const fs = require('fs-extra');
const {getFileFromUrl} = require('./application/urlContentManager');
const {getNegativeDataFrom, normalizeNegativeData} = require('./application/fileParserManager');
const {hydrateHorizontalData} = require('./application/pixelsHydrationManager');
const {checkOptions} = require('./application/configuration');
// eslint-disable-next-line func-names
(async function main(url, optionsFilepath) {
    const options = await checkOptions(optionsFilepath);
    const fullFileData = await getFileFromUrl(url);
    const negativeData = await getNegativeDataFrom(fullFileData, options);
    const horizontalData = await normalizeNegativeData(negativeData);
    const hydratedHorizontalData = await hydrateHorizontalData(horizontalData); 

    ouputResult(hydratedHorizontalData, options);
})(process.argv[2]);

function ouputResult(hydratedHorizontalData, options) {

    if (options.output === 'console') {
        hydrateHorizontalData.forEach((line) => {
            console.log(line.line);
        });
        return Promise.resolve();
    } else {
        return fs.writeFile('output.txt', hydratedHorizontalData);
    }
}