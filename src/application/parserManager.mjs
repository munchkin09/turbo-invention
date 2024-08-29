import parser from '../domain/ASCII_parser.mjs';
import emoParser from '../domain/EMOJI_parser.mjs';

export default async function parserManager(options) {
    let selectedParser = {};
    console.log(options.style);
    if (options.style === 'ASCII' || options.style === 'ascii') {
        selectedParser = parser(options);
    }

    if (options.style === 'EMOJI' || options.style === 'emoji') {
        console.log("ENTRO")
        selectedParser = emoParser(options);
    }

    return Promise.resolve(selectedParser);
}
