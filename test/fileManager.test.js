const path = require('path');
const axios = require('axios');
const fs = require('fs-extra');

const { normalizeNegativeData, getNegativeDataFrom } = require('../src/application/fileManager');
const exp = require('constants');

describe('File Manager', () => {

    it('should return array with negative data when a valid input is given', async () => {

        //Given
        const expectedResult = await fs.readFile(path.resolve('test/fixtures/expectedOutputFromNegativeData.txt'), 'utf8');
        const input = await fs.readFile(path.resolve('test/fixtures/code.js'), 'utf8');

        //When
        const result = await getNegativeDataFrom(input);

        //Then
        expect(result.toString()).toBe(expectedResult);

    });

    it('should horizontal conversion when a valid input is given', async () => {

        //Given
        const input = (await fs.readFile(path.resolve('test/fixtures/expectedOutputFromNegativeData.txt'), 'utf8')).toString().split(',');
        const expectedResult = (await fs.readFile(path.resolve('test/fixtures/expectedOutputFromNormalizedData.txt'), 'utf8'));

        //When
        const result = await normalizeNegativeData(input);

        //Then
        expect(result.toString()).toBe(expectedResult);

    });
});