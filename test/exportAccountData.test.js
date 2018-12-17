'use strict';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const exportAccountData = require('../src/exportAccountData');

describe('exportAccountData', () => {
  it('works', () => {
    const d1 = new Date(2018, 0, 1).toISOString();
    const txn1 = {processedDate: d1, date: d1};
    expect(exportAccountData({txns: [txn1]}, 1)).to.equal(
      '"processedDate","date"\n"1/1/2018","1/1/2018"',
    );
    expect(exportAccountData({txns: []}, 10)).to.equal('');
    expect(exportAccountData({txns: []}, 11)).to.equal('');
    expect(exportAccountData({txns: []}, 12)).to.equal('');
  });
});
