export default function ({output}) {
    return {
        hydrateLayersWith(horizontalData) {
            return Promise.all(horizontalData.split('\n').map(async (line, index) => {
                const regexClouds = line.match(new RegExp(output.chars.cloud, 'g'));
                const numberOfClouds = regexClouds === null ? 0 : regexClouds.length;

                const regexFloors = line.match(new RegExp(output.chars.building, 'g'));
                const numberOfFloors = regexFloors === null ? 0 : regexFloors.length;

                const regexFoundations = line.match(new RegExp(output.chars.foundation, 'g'));
                const numberOfFoundations = regexFoundations === null ? 0 : regexFoundations.length;

                const regexStreets = line.match(new RegExp(output.chars.street, 'g'));
                const numberOfStreets = regexStreets === null ? 0 : regexStreets.length;

                const numberOfTotalCharacters = line.length;

                return {
                    line,
                    index,
                    numberOfFloors,
                    numberOfClouds,
                    numberOfFoundations,
                    numberOfStreets,
                    numberOfTotalCharacters,
                    indivdualPixeldData: line.split(''),
                };
            }));
        },
        async hydratePixelsWith(fullData) {
            for await (const line of fullData) {
                line.indivdualPixeldData = await Promise.all(line.indivdualPixeldData.map(async (pixel, pixelIndex) => ({pixel, pixelIndex})));
            }
        },
    };
}
