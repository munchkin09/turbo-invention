import path from 'path';
import fs from 'fs-extra';

import {hydratorManager} from '../src/application/hydratorManager.mjs';

describe('File Manager', () => {

    it('Should return hydrated data when a valid input is given', async () => {
        // Given
        const input = (await fs.readFile(path.resolve('test/fixtures/expectedOutputFromNormalizedData.txt'), 'utf8')).toString();
        const expectedResult = (await fs.readFile(path.resolve('test/fixtures/expectedOutputFromHydratedData.txt'), 'utf8'));
        const { hydrateHorizontalData } = hydratorManager();
        // When
        const result = await hydrateHorizontalData(input);

        // Then
        expect(JSON.stringify(result, null, 2)).toBe(expectedResult);
    });
});
