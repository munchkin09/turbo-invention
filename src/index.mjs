import fs from 'fs-extra';

import {getFileFromUrl} from './application/urlContentManager.mjs';
import parserManager from './application/parserManager.mjs';
import hydratorManager from './application/hydratorManager.mjs';
import {checkOptions} from './application/configuration.mjs';

export default main;

async function main(url, optionsFilepath) {
    const {getNegativeDataFrom, normalizeNegativeData} = parserManager();
    const {hydrateHorizontalData} = hydratorManager();

    console.log('CleanCrapper is running...');
    try {
        const options = await checkOptions(optionsFilepath);
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
    if (options.output === 'console') {
        hydratedHorizontalData.forEach(line => {
            console.log(line.line);
        });
        return Promise.resolve();
    }

    return fs.writeFile('output.txt', hydratedHorizontalData);
}
