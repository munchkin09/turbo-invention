import path from 'path';

import axios from 'axios';
import MockAdapter from "axios-mock-adapter";
import fs from 'fs-extra';

import urlContentManager from '../../src/application/urlContentManager.mjs';

describe('Url Manager', () => {

    let mock;
    let getFileFrom;
    let readFile;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    beforeEach(() => {
        const { getFileFromUrl, readFileContent } = urlContentManager()
        getFileFrom = getFileFromUrl;
        readFile = readFileContent;
    });

    afterEach(() => {
        mock.reset();
    });
    
    it('should return a valid output from the given url', async () => {
        // Given
        const url = 'https://raw.githubusercontent.com/munchkin09/node-csgo/master/handlers/player.js';
        const expectedResult = await fs.readFile(path.resolve('test/fixtures/application/urlContentManager/expectedOutputFromUrl.txt'), 'utf8');
        const response = {status: 200, data: await fs.readFile(path.resolve('test/fixtures/application/urlContentManager/code.js'))};
        mock.onGet(url).reply(response.status, response.data);

        // When
        const code = await getFileFrom(url);
        const result = readFile(code);

        // Then
        expect(result.toString()).toBe(expectedResult);
    });

    it('should return an error when the url is not valid', async () => {
        // Given
        const url = 'https://raw.githubusercontent.com/munchkin09/node-csgo/master/handlers/player.js';
        const response = {status: 404, data: 'Not Found'};

        mock.onGet(url).reply(response.status, response.data);

        try {
            // When
            const result = await getFileFrom(url);
        } catch (e) {
            // Then
            expect(e.message).toBe('Request failed with status code 404');
        }
    })
});
