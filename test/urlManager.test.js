const path = require('path');
const axios = require('axios');
const fs = require('fs-extra');

const {getFileFromUrl} = require('../src/application/urlContentManager');

jest.mock('axios');

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
});
