import path from 'path';
import fs from 'fs-extra';

import parserManager from '../src/application/parserManager.mjs';

describe('File Manager', () => {
    it('should return array with negative data when a valid input is given', async () => {
        // Given
        const expectedResult = await fs.readFile(path.resolve('test/fixtures/expectedOutputFromNegativeData.txt'), 'utf8');
        const input = await fs.readFile(path.resolve('test/fixtures/code.js'), 'utf8');
        const options = await fs.readFile(path.resolve('test/fixtures/parser/config.json'), 'utf8');
        const {getNegativeDataFrom} = parserManager(options);
        // When
        const result = await getNegativeDataFrom(input);

        // Then
        expect(result.toString()).toBe(expectedResult);
    });

    it('should output horizontal conversion when a valid input is given', async () => {
        // Given
        const input = (await fs.readFile(path.resolve('test/fixtures/expectedOutputFromNegativeData.txt'), 'utf8')).toString().split(',');
        const expectedResult = (await fs.readFile(path.resolve('test/fixtures/expectedOutputFromNormalizedData.txt'), 'utf8'));
        const options = JSON.parse(await fs.readFile(path.resolve('test/fixtures/parser/config.json'), 'utf8'));
        
        const {normalizeNegativeData} = parserManager(options);
        // When
        const result = await normalizeNegativeData(input);

        // Then
        expect(result.toString()).toBe(expectedResult);
    });
});
