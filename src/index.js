const fs = require('fs-extra');
const getFileFromUrl = require('../src/application/urlManager');
const {getNegativeDataFrom, normalizeNegativeData} = require('../src/application/fileManager');

// eslint-disable-next-line func-names
(async function main(url) {
    const fullFileData = await getFileFromUrl(url);
    const negativeData = await getNegativeDataFrom(fullFileData);
    const horizontalData = await normalizeNegativeData(negativeData);
    // Write result to file
    await fs.writeFile('output.txt', horizontalData);
})(process.argv[2]);
