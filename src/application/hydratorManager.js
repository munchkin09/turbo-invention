const {hydrateHorizontalData, hydratePixelData} = require('../domain/pixelsHydration');

module.exports = function () {
    return {
        hydrateHorizontalData,
        hydratePixelData,
    };
};
