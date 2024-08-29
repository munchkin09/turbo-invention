import {jest} from '@jest/globals';
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
    // Given
    const executionPath = path.resolve('bin','bash.js');
    const url = 'https://raw.githubusercontent.com/munchkin09/node-csgo/master/handlers/player.js';
    const configurationPath = path.resolve('test','fixtures', 'configuration','config.json');
    const response = {status: 200, data: await fs.readFile(path.resolve('test/fixtures/code.js'))};

    axios.get.mockResolvedValue(response);

    // When
    await execute(url, configurationPath);

    // Then
    expect(log.mock.calls[0][0]).toBe('CleanCrappers is running...');
    expect(log.mock.calls[1][0]).toBe('########I#I#I######');
    expect(log.mock.calls[2][0]).toBe('########I#I#I######');
    expect(log.mock.calls[3][0]).toBe('########I#I#I######');
    expect(log.mock.calls[4][0]).toBe('########I#I#I######');
    expect(log.mock.calls[5][0]).toBe('#######IIIIIII#I###');
    expect(log.mock.calls[6][0]).toBe('#######IIIIIII#I###');
    expect(log.mock.calls[7][0]).toBe('#######IIIIIII#I###');
    expect(log.mock.calls[8][0]).toBe('#######IIIIIII#I###');
    expect(log.mock.calls[9][0]).toBe('##III#IIIIIIII#II##');
    expect(log.mock.calls[10][0]).toBe('##III#IIIIIIII#II##');
    expect(log.mock.calls[11][0]).toBe('##III#IIIIIIII#II##');
    expect(log.mock.calls[12][0]).toBe('##III#IIIIIIII#II##');
    expect(log.mock.calls[13][0]).toBe('▁▁¡¡¡▁¡¡¡¡¡¡¡¡▁¡¡▁▁');
  });

});

