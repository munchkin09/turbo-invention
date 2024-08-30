export default {
    verbose: true,
    testEnvironment: 'node',
    testMatch: [
        '**/*.test.mjs',
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.mjs',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: [
        'text',
        'lcov',
    ],
    coveragePathIgnorePatterns: [
        'node_modules',
        'test',
    ],
    reporters: [
        'summary',
        'jest-silent-reporter',
        ['jest-junit', {outputDirectory: 'test-results'}],
        ['github-actions', {silent: false}, 'summary', 'jest-junit'],
    ],
};
