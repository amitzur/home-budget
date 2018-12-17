'use strict';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const makeProcessFile = require('../src/processFile');
const getFileName = require('../src/getFileName');

describe('processFile', () => {
  const outFile = {};
  const data = {};
  const writeFile = async (path, data) => (outFile[path] = data);
  const readFile = path => JSON.stringify(data[path]);
  const exportAccountData = (account, i) => ({account, i});
  const processFile = makeProcessFile({exportAccountData, writeFile, readFile});

  it('works', async () => {
    data['path1'] = {accountNumber: 'bla'};
    await processFile({filepath: 'path1', saveLocation: 'saveLocation', year: 2018});
    const expected = {};
    for (let i = 1, ii = 12; i < ii; i++) {
      expected[`saveLocation/${getFileName('bla', i, 2018)}.csv`] = {
        account: {accountNumber: 'bla'},
        i,
      };
    }
    expect(outFile).to.eql(expected);
  });
});
