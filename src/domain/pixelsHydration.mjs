
async function hydrateHorizontalData(horizontalData) {
    return Promise.all(horizontalData.split('\n').map(async (line, index) => {
        const regexClouds = line.match(/./g);
        const numberOfClouds = regexClouds === null ? 0 : regexClouds.length;
        const regexFloors = line.match(/L/g);
        const numberOfFloors = regexFloors === null ? 0 : regexFloors.length;
        const regexFoundations = line.match(/Y/g);
        const numberOfFoundations = regexFoundations === null ? 0 : regexFoundations.length;
        const regextStreets = line.match(/_/g);
        const numberOfStreets = regextStreets === null ? 0 : regextStreets.length;
        const numberOfTotalCharacters = line.length;
        const returnedValue = {
            line,
            index,
            numberOfFloors,
            numberOfClouds,
            numberOfFoundations,
            numberOfStreets,
            numberOfTotalCharacters,
            indivdualPixeldData: line.split(''),
        };
        return returnedValue;
    }));
}

async function hydratePixelData(fullData) {
    for await (const line of fullData) {
        line.indivdualPixeldData = await Promise.all(line.indivdualPixeldData.map(async (pixel, pixelIndex) => ({pixel, pixelIndex})));
    }
}

export {
    hydrateHorizontalData,
    hydratePixelData,
};
