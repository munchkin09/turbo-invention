module.exports = {
    verbose: true,
    testEnvironment: 'node',
    testMatch: [
        '**/*.test.js',
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.js',
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
        'default',
        'summary',
        ['jest-junit', {outputDirectory: 'test-results'}],
        ['github-actions', {silent: false}, 'summary', 'jest-junit'],
    ],
};
