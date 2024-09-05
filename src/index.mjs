import fs from 'fs-extra';
import {getFileFromUrl} from './application/urlContentManager.mjs';
import {converterManager} from './application/converterManager.mjs';
import {hydratorManager} from './application/hydratorManager.mjs';
import checkOptions from './application/configuration.mjs';

export default async function main(url, optionsFilepath) {
    console.log('CleanCrappers is running...');
    try {
        const options = await checkOptions(optionsFilepath);
        const {getNegativeDataFrom, normalizeNegativeData} = await converterManager(options);
        const fullFileData = await getFileFromUrl(url);
        const negativeData = await getNegativeDataFrom(fullFileData, options);
        const horizontalData = await normalizeNegativeData(negativeData);
        const {hydrateHorizontalData} = hydratorManager();
        const hydratedHorizontalData = await hydrateHorizontalData(horizontalData);

        await ouputResult(hydratedHorizontalData, options);
    } catch (e) {
        // TODO Make test for error handling
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
    // TODO Make test for error handling

    return fs.writeFile('output.txt', hydratedHorizontalData);
}
