'use strict';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const makeScrapeData = require('../src/scrapeData');
const getFileName = require('../src/getFileName');

describe('scrapeData', () => {
  const outFile = {};
  const data = [];
  const saveData = (saveLocation, account, year) => ''; // TODO
  const scrapeIsracard = (credentials, month, year) => {
    const key = `${credentials}_${month}_${year}`;
    data.push(key);
    return {accountNumber: key};
  };
  const scrapeData = makeScrapeData({scrapeIsracard, saveData});
  it('works', async () => {
    await scrapeData({
      credentials: ['cred1', 'cred2'],
      month: 6,
      year: 2018,
      saveLocation: 'saveLocation',
    });
    expect(data).to.eql(['cred1_6_2018', 'cred2_6_2018']);
    expect(outFile).to.eql({
      [`saveLocation/${getFileName('cred_6_2018')}`]: '',
    });
  });
});
