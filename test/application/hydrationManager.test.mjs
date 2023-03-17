import path from 'path';
import fs from 'fs-extra';

import hydratorManager from '../../src/application/hydratorManager.mjs';

describe('Hydrator manager', () => {

    it('Should return hydrated data when a valid input is given', async () => {
        // Given
        const input = (await fs.readFile(path.resolve('test/fixtures/application/hydratorManager/input.txt'), 'utf8')).toString();
        const expectedResult = (await fs.readFile(path.resolve('test/fixtures/application/hydratorManager/expectedOutput.txt'), 'utf8'));
        const options = JSON.parse((await fs.readFile(path.resolve('test/fixtures/application/hydratorManager/configuration.json'), 'utf8')));
        const {hydrateLayersWith} = hydratorManager(options);

        // When
        const result = await hydrateLayersWith(input);

        // Then
        expect(JSON.stringify(result, null, 2)).toBe(expectedResult);
    });
});
