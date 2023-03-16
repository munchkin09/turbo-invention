import path from 'path';
import fs from 'fs-extra';

import hydratorManager from '../src/application/hydratorManager.mjs';

describe('Hydrator manager', () => {

    it('Should return hydrated data when a valid input is given', async () => {
        // Given
        const options = JSON.parse((await fs.readFile(path.resolve('test/fixtures/parser/options.json'), 'utf8')));
        const input = (await fs.readFile(path.resolve('test/fixtures/expectedOutputFromNormalizedData.txt'), 'utf8')).toString();
        const expectedResult = (await fs.readFile(path.resolve('test/fixtures/expectedOutputFromHydratedData.txt'), 'utf8'));
        const {hydrateLayersWith} = hydratorManager(options);

        // When
        const result = await hydrateLayersWith(input);
        
        // Then
        expect(JSON.stringify(result, null, 2)).toBe(expectedResult);
    });
});
