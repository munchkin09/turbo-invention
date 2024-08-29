import path from 'path';
import fs from 'fs-extra';

import parserManager from '../../src/application/parserManager.mjs';

describe('ASCII parser Manager', () => {
    it('should return array with negative data when a valid input is given', async () => {
        // Given
        const input = await fs.readFile(path.resolve('test/fixtures/application/parser/code.js'), 'utf8');
        const expectedResult = await fs.readFile(path.resolve('test/fixtures/application/parser/expectedOutputFromNegativeData.txt'), 'utf8');
        const options = await fs.readFile(path.resolve('test/fixtures/application/parser/configuration.json'), 'utf8');
        const {getNegativeDataFrom} = parserManager(options);
        // When
        const result = await getNegativeDataFrom(input);

        // Then
        expect(result.toString()).toBe(expectedResult);
    });

    it('should output horizontal conversion when a valid input is given', async () => {
        // Given
        const input = (await fs.readFile(path.resolve('test/fixtures/application/parser/input.txt'), 'utf8')).toString().split(',');
        const expectedResult = (await fs.readFile(path.resolve('test/fixtures/application/parser/expectedOutputFromNormalizedData.txt'), 'utf8'));
        const options = JSON.parse(await fs.readFile(path.resolve('test/fixtures/application/parser/configuration.json'), 'utf8'));
        
        const {normalizeNegativeData} = parserManager(options);
        // When
        const result = await normalizeNegativeData(input);
        console.log(input)
        console.log('***********')
        console.log(result)

        // Then
        expect(result.toString()).toBe(expectedResult);
    });
});


describe('EMOJI parser Manager', () => {
    it('should return array with negative data when a valid input is given', async () => {
        // Given
        const input = await fs.readFile(path.resolve('test/fixtures/application/parser/code.js'), 'utf8');
        const expectedResult = await fs.readFile(path.resolve('test/fixtures/application/parser/expectedOutputFromNegativeData.txt'), 'utf8');
        const options = await fs.readFile(path.resolve('test/fixtures/application/parser/config_emoji.json'), 'utf8');
        const rua = await parserManager(options);
        console.log(rua)
        // When
        const result = await getNegativeDataFrom(input);

        // Then
        expect(result.toString()).toBe(expectedResult);
    });

    it('should output horizontal conversion when a valid input is given', async () => {
        // Given
        const input = (await fs.readFile(path.resolve('test/fixtures/application/parser/input.txt'), 'utf8')).toString().split(',');
        const expectedResult = (await fs.readFile(path.resolve('test/fixtures/application/parser/expectedOutputFromNormalizedData.txt'), 'utf8'));
        const options = JSON.parse(await fs.readFile(path.resolve('test/fixtures/application/parser/configuration.json'), 'utf8'));
        
        const {normalizeNegativeData} = parserManager(options);
        // When
        const result = await normalizeNegativeData(input);
        console.log(input)
        console.log('***********')
        console.log(result)

        // Then
        expect(result.toString()).toBe(expectedResult);
    });
});
