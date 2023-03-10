#!/usr/bin/env node
const basicExecutor = require('../src/index');
const url = process.argv[2];
const configurationPath = process.argv[3];

await basicExecutor(url, configurationPath);
