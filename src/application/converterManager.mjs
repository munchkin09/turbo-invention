import {asciiConverter} from '../domain/ASCII_converter.mjs';
import {emojiConverter} from '../domain/EMOJI_converter.mjs';

export async function converterManager(options) {
    let selectedConverter = null;
    const style = options.style.toLowerCase();
    switch (style) {
    case 'ascii':
        selectedConverter = asciiConverter(options);
        break;
    case 'emoji':
        selectedConverter = emojiConverter(options);
        break;
    default:
        throw new Error('Invalid style');
    }

    return selectedConverter;
}
