const path = require('path');
const { exec } = require('node:child_process');

const fs = require('fs-extra');
const axios = require('axios');

jest.mock('axios');

describe('Test execution interfaces', () => {

  it('should output on terminal a proper cleancrapper with given input', async () => {
    const executionPath = path.resolve('bin','bash.js');
    const url = 'https://raw.githubusercontent.com/munchkin09/node-csgo/master/handlers/player.js';
    const configurationPath = path.resolve('test','fixtures','config.json');
    const response = {status: 200, data: await fs.readFile(path.resolve('test/fixtures/code.js'))};

    axios.get.mockResolvedValue(response);
    console.log(`node ${executionPath} ${url} ${configurationPath}}`);
    const process = exec(`${executionPath} ${url} ${configurationPath}`);
    const result = '';
    process.stdout.on('data', (stdout) => {
        result.concat(stdout);
      });
    });
    process.stdout.on('end', () => {
      expect(result).toBe('CleanCrapper is running...\n########I#I#I######\n########I#I#I######\n########I#I#I######\n########I#I#I######\n#######IIIIIII#I###\n#######IIIIIII#I###\n#######IIIIIII#I###\n#######IIIIIII#I###\n##III#IIIIIIII#II##\n##III#IIIIIIII#II##\n##III#IIIIIIII#II##\n##III#IIIIIIII#II##\n__¡¡¡_¡¡¡¡¡¡¡¡_¡¡__');
    });
});
