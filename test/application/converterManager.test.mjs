import path from 'path';
import fs from 'fs-extra';

import {converterManager} from '../../src/application/converterManager.mjs';

describe('ASCII converter Manager', () => {
    it('should return array with negative data when a valid input is given', async () => {
        // Given
        const input = await fs.readFile(path.resolve('test/fixtures/application/converter/code.js'), 'utf8');
        const expectedResult = await fs.readFile(path.resolve('test/fixtures/application/converter/ascii/expectedOutputFromNegativeData.txt'), 'utf8');
        const options = JSON.parse(await fs.readFile(path.resolve('test/fixtures/application/converter/ascii/configuration.json'), 'utf8'));

        // When
        const {getNegativeDataFrom} = await converterManager(options);
        const result = await getNegativeDataFrom(input);

        // Then
        expect(result.toString()).toBe(expectedResult);
    });

    it('should output horizontal conversion when a valid input is given', async () => {
        // Given
        const input = (await fs.readFile(path.resolve('test/fixtures/application/converter/ascii/input.txt'), 'utf8')).toString().split(',');
        const expectedResult = (await fs.readFile(path.resolve('test/fixtures/application/converter/ascii/expectedOutputFromNormalizedData.txt'), 'utf8'));
        const options = JSON.parse(await fs.readFile(path.resolve('test/fixtures/application/converter/ascii/configuration.json'), 'utf8'));
        
        // When
        const {normalizeNegativeData} = await converterManager(options);
        const result = await normalizeNegativeData(input);

        // Then
        expect(result.toString()).toBe(expectedResult);
    });
});

describe('EMOJI converter Manager', () => {
    it('should return array with negative data when a valid input is given', async () => {
        // Given
        const input = await fs.readFile(path.resolve('test/fixtures/application/converter/code.js'), 'utf8');
        const expectedResult = await fs.readFile(path.resolve('test/fixtures/application/converter/emoji/expectedOutputFromNegativeData.txt'), 'utf8');
        const options = JSON.parse(await fs.readFile(path.resolve('test/fixtures/application/converter/emoji/config_emoji.json'), 'utf8'));
        
        // When
        const {getNegativeDataFrom} = await converterManager(options);
        const negativeData = await getNegativeDataFrom(input);

        // Then
        expect(negativeData.toString()).toBe(expectedResult);
    });

    it('should output horizontal conversion when a valid input is given', async () => {
        // Given
        const input = (await fs.readFile(path.resolve('test/fixtures/application/converter/emoji/input.txt'), 'utf8')).toString().split(',');
        const expectedResult = (await fs.readFile(path.resolve('test/fixtures/application/converter/emoji/expectedOutputFromNormalizedData.txt'), 'utf8'));
        const options = JSON.parse(await fs.readFile(path.resolve('test/fixtures/application/converter/emoji/config_emoji.json'), 'utf8'));
        
        // When
        const {normalizeNegativeData} = await converterManager(options);
        const result = await normalizeNegativeData(input);
        // Then
        expect(result.toString()).toBe(expectedResult);
    });
});

describe('BMP converter Manager', () => {
    it('should return array with negative data when a valid input is given', async () => {
        // Given
        const input = await fs.readFile(path.resolve('test/fixtures/application/converter/code.js'), 'utf8');
        const expectedResult = await fs.readFile(path.resolve('test/fixtures/application/converter/emoji/expectedOutputFromNegativeData.txt'), 'utf8');
        const options = JSON.parse(await fs.readFile(path.resolve('test/fixtures/application/converter/emoji/config_emoji.json'), 'utf8'));
        const {getNegativeDataFrom} = await converterManager(options);
        
        // When
        const negativeData = await getNegativeDataFrom(input);

        // Then
        expect(negativeData.toString()).toBe(expectedResult);
    });

    it('should output horizontal conversion when a valid input is given', async () => {
        // Given
        const input = (await fs.readFile(path.resolve('test/fixtures/application/converter/emoji/input.txt'), 'utf8')).toString().split(',');
        const expectedResult = (await fs.readFile(path.resolve('test/fixtures/application/converter/emoji/expectedOutputFromNormalizedData.txt'), 'utf8'));
        const options = JSON.parse(await fs.readFile(path.resolve('test/fixtures/application/converter/emoji/config_emoji.json'), 'utf8'));
        
        // When
        const {normalizeNegativeData} = await converterManager(options);
        const result = await normalizeNegativeData(input);
        // Then
        expect(result.toString()).toBe(expectedResult);
    });
});
