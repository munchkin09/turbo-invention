import path from 'path';

import fs from 'fs-extra';
import axios from 'axios';

jest.mock('axios');

import execute from '../src/index.mjs';

describe('Test execution interfaces', () => {

  let log;
  
  beforeEach(() => {
      log = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  it('should output on terminal a proper cleancrapper with given input', async () => {
    const executionPath = path.resolve('bin','bash.js');
    const url = 'https://raw.githubusercontent.com/munchkin09/node-csgo/master/handlers/player.js';
    const configurationPath = path.resolve('test','fixtures', 'configuration','config.json');
    const response = {status: 200, data: await fs.readFile(path.resolve('test/fixtures/code.js'))};

    axios.get.mockResolvedValue(response);

    await execute(url, configurationPath);

    
    expect(log).toBeCalledWith('CleanCrapper is running...');
    expect(log).toBeCalledWith('########I#I#I######');
    expect(log).toBeCalledWith('########I#I#I######');
    expect(log).toBeCalledWith('########I#I#I######');
    expect(log).toBeCalledWith('########I#I#I######');
    expect(log).toBeCalledWith('#######IIIIIII#I###');
    expect(log).toBeCalledWith('#######IIIIIII#I###');
    expect(log).toBeCalledWith('#######IIIIIII#I###');
    expect(log).toBeCalledWith('#######IIIIIII#I###');
    expect(log).toBeCalledWith('##III#IIIIIIII#II##');
    expect(log).toBeCalledWith('##III#IIIIIIII#II##');
    expect(log).toBeCalledWith('##III#IIIIIIII#II##');
    expect(log).toBeCalledWith('##III#IIIIIIII#II##');
    expect(log).toBeCalledWith('__¡¡¡_¡¡¡¡¡¡¡¡_¡¡__');
  });

});

