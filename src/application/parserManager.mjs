import {asciiParser} from '../domain/ASCII_parser.mjs';
import {emojiParser} from '../domain/EMOJI_parser.mjs';

export async function parserManager(options) {
    let selectedParser = null;
    const style = options.style.toLowerCase();
    if (style === 'ascii') {
        selectedParser = asciiParser(options);
    }

    if (style === 'emoji') {
        selectedParser = emojiParser(options);
    }

    return selectedParser;
}
