const path = require('path');

const axios = require('axios');
const fs = require('fs-extra');

jest.mock('axios');

const {getFileFromUrl} = require('../src/application/urlContentManager');

describe('Url Manager', () => {
    beforeEach(() => {
    });
    it('should return a valid output from the given url', async () => {
    // Given
        const url = 'https://raw.githubusercontent.com/munchkin09/node-csgo/master/handlers/player.js';
        const expectedResult = await fs.readFile(path.resolve('test/fixtures/expectedOutputFromUrl.txt'), 'utf8');
        const response = {status: 200, data: await fs.readFile(path.resolve('test/fixtures/code.js'))};

        axios.get.mockResolvedValue(response);

        // When
        const result = await getFileFromUrl(url);

        // Then
        expect(result.toString()).toBe(expectedResult);
    });

    it('should return an error when the url is not valid', async () => {
        // Given
        const url = 'https://raw.githubusercontent.com/munchkin09/node-csgo/master/handlers/player.js';
        const response = {status: 404, data: 'Not Found'};

        axios.get.mockResolvedValue(response);

        try {
            // When
            const result = await getFileFromUrl(url);
        } catch (e) {
            // Then
            expect(e.message).toBe('The file could not be retrieved');
        }
    })
});
