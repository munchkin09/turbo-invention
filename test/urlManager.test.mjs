import {jest} from '@jest/globals';
import path from 'path';

import fs from 'fs-extra';


import {getFileFromUrl} from '../src/application/urlContentManager.mjs';

describe('Url Manager', () => {
    beforeEach(() => {
    });
    it('should return a valid output from the given url', async () => {
    // Given
        const url = 'https://raw.githubusercontent.com/munchkin09/node-csgo/master/handlers/player.js';
        const expectedResult = await fs.readFile(path.resolve('test/fixtures/expectedOutputFromUrl.txt'), 'utf8');
        const response = {status: 200, data: await fs.readFile(path.resolve('test/fixtures/code.js'), 'utf8')};
        jest.spyOn(global, 'fetch').mockResolvedValue(response);

        // When
        const result = await getFileFromUrl(url);

        // Then
        expect(result.toString()).toBe(expectedResult);
    });

    it('should return an error when the url is not valid', async () => {
        // Given
        const url = 'https://raw.githubusercontent.com/munchkin09/node-csgo/master/handlers/player.js';
        const response = {status: 404, data: 'Not Found'};

        jest.unstable_mockModule('axios',() => {
            get: jest.fn().mockResolvedValue(response);
        });

        try {
            // When
            const result = await getFileFromUrl(url);
        } catch (e) {
            // Then
            expect(e.message).toBe('The file could not be retrieved');
        }
    })
});
