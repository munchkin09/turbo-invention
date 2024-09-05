import {hydrateHorizontalData, hydratePixelData} from '../domain/pixelsHydration.mjs';

export function hydratorManager() {
    return {
        hydrateHorizontalData,
        hydratePixelData,
    };
}
