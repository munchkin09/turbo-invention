#!/usr/bin/env node
import basicExecutor from '../src/index';
const url = process.argv[2];
const configurationPath = process.argv[3];

(async function () {
    await basicExecutor(url, configurationPath);
})();
