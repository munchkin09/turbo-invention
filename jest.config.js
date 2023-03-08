//Jest config file
module.exports = {
    verbose: true,
    testEnvironment: 'node',
    testMatch: [
        '**/src/**/*.test.js'
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.js'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: [
        'text',
        'lcov'
    ],
    coveragePathIgnorePatterns: [
        'node_modules',
        'test'
    ],
    reporters: [ 
        'default',
        ['jest-junit', { outputDirectory: 'test-results' }]
        ['github-actions', {silent: false}],
        'summary'
    ],
    setupFilesAfterEnv: [
        './test/setup.js'
    ]
};