import path from 'path';

import axios from 'axios';
import MockAdapter from "axios-mock-adapter";
import fs from 'fs-extra';

import {getFileFromUrl} from '../src/application/urlContentManager.mjs';

describe('Url Manager', () => {

    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });
    
    it('should return a valid output from the given url', async () => {
    // Given
        const url = 'https://raw.githubusercontent.com/munchkin09/node-csgo/master/handlers/player.js';
        const expectedResult = await fs.readFile(path.resolve('test/fixtures/expectedOutputFromUrl.txt'), 'utf8');
        const response = {status: 200, data: await fs.readFile(path.resolve('test/fixtures/code.js'))};
        mock.onGet(`${url}`).reply(response.status, response.data);

        // When
        const result = await getFileFromUrl(url);

        // Then
        expect(result.toString()).toBe(expectedResult);
    });

    it('should return an error when the url is not valid', async () => {
        // Given
        const url = 'https://raw.githubusercontent.com/munchkin09/node-csgo/master/handlers/player.js';
        const response = {status: 404, data: 'Not Found'};

        mock.onGet(`${url}`).reply(response.status, response.data);

        try {
            // When
            const result = await getFileFromUrl(url);
        } catch (e) {
            // Then
            expect(e.message).toBe('Request failed with status code 404');
        }
    })
});
