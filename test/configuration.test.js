const path = require('path');
const fs = require('fs-extra');

const {checkOptions} = require('../src/application/configuration');

describe('Options parser', () => {

    it('Should return same configuration as output when given input is valid', async () => {
        // Given
        const input = await fs.readFile(path.resolve('test/fixtures/configuration/options.json'), 'utf8');

        // When
        const result = await checkOptions(input);

        // Then
        const expectedResult = Object.assign({},JSON.parse(input));
        expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
    });

    it.each([
        ['type', 'config_without_type.json', 'skyline'],
        ['spaces', 'config_without_spaces.json', 4],
    ])
    ('Should return default options when partial config is given(skipping %s)', async (name, filename, evaluatedValue) => {
         // Given
        const input = `test/fixtures/configuration/${filename}`;

         // When
        const result = await checkOptions(input);

         // Then
        expect(result[name]).toBe(evaluatedValue);
    });

    it('Should return default options when partial config is given(giving only mandatory options)', async () => {
        // Given
        const input = 'test/fixtures/configuration/config_without_optionals.json';

        // When
        const result = await checkOptions(input);

        // Then
        expect(result.type).toBe('skyline');
        expect(result.style).toBe('ascii');
        expect(result.tabsInterpolation).toBe(4);
        expect(result.spaces).toBe(4);
    });

    describe('Throwing warns & errors', () => {
        let warn
        let error
        beforeEach(() => {
            warn = jest.spyOn(console, "warn").mockImplementation(() => {});
            error = jest.spyOn(console, "error").mockImplementation(() => {});
        });

        afterEach(() => {
            warn.mockReset();
            error.mockReset();
        });

        it.each([
            ['not a valid json', undefined, 'No path given. Using default options'],
            ['json given dont exists', 'path_no_exists', 'Path given does not exists. Using default options'],
            ['unparseable json', 'test/fixtures/configuration/config_invalid.json', 'Cannot parse options file, using default options. Original error was: SyntaxError: Unexpected token s in JSON at position 0'],


        ])
        ('Should throw a warn when the input is %s and fallback into default config', async (name, value, warnMessage) => {
            // Given
            const input = value;

            // When
            await checkOptions(input);

            // Then
            expect(warn).toBeCalledWith(warnMessage);
        });

        it('Should throw an error when the input is a valid json but dont have output option', async () => {
            // Given
            const input = 'test/fixtures/configuration/config_without_output.json';

            // When
            try {
                const currentOptions = await checkOptions(input);
            } catch (error) {
                // Then
                expect(error.message).toBe('No output was provided');
            }
        });

        it('Should throw an error when the input is a valid json but output option is not recognized', async () => {
            // Given
            const input = 'test/fixtures/configuration/config_with_invalid_output.json';

            // When
            try {
                const currentOptions = await checkOptions(input);
            } catch (error) {
                // Then
                expect(error.message).toBe('Output not supported Given: output.txt Supported: console, file');
            }
        });
    })
});
