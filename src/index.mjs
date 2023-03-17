import fs from 'fs-extra';

import fileManagement from './application/urlContentManager.mjs';
import parserManager from './application/parserManager.mjs';
import hydratorManager from './application/hydratorManager.mjs';
import {checkOptions} from './application/configuration.mjs';

export default main;

async function main(url, optionsFilepath) {
    console.log('CleanCrapper is running...');
    try {
        const options = await checkOptions(optionsFilepath);

        const {getFileFromUrl, readFileContent} = fileManagement(options);
        const fullFileData = readFileContent(await getFileFromUrl(url));

        const {getNegativeDataFrom, normalizeNegativeData} = parserManager(options);
        const negativeData = await getNegativeDataFrom(fullFileData, options);
        const horizontalData = await normalizeNegativeData(negativeData);

        const {hydrateLayersWith} = hydratorManager(options);
        const hydratedHorizontalData = await hydrateLayersWith(horizontalData);

        await ouputResult(hydratedHorizontalData, options.output.type);
    } catch (e) {
        console.log(e);
    }
}

async function ouputResult(hydratedHorizontalData, type) {
    if (type === 'console') {
        hydratedHorizontalData.forEach(line => {
            console.log(line.line);
        });
        return Promise.resolve();
    }

    return fs.writeFile('output.txt', hydratedHorizontalData);
}

