'use strict';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const exportAccountData = require('../src/exportAccountData');

describe('exportAccountData', () => {
  it('works for january', () => {
    const d = new Date(2018, 0, 1).toISOString();
    const txn1 = {processedDate: d, date: d};
    const actual = exportAccountData({txns: [txn1]}, 1);
    const expected = `${String.fromCharCode(65279)}"processedDate","date"\n"1/1/2018","1/1/2018"`;
    expect(actual).to.equal(expected);
  });

  it('works for january with filtering', () => {
    const d1 = new Date(2018, 0, 1).toISOString();
    const d2 = new Date(2018, 1, 1).toISOString();
    const txn1 = {processedDate: d1, date: d1};
    const txn2 = {processedDate: d2, date: d2};
    const actual = exportAccountData({txns: [txn1, txn2]}, 1);
    const expected = `${String.fromCharCode(65279)}"processedDate","date"\n"1/1/2018","1/1/2018"`;
    expect(actual).to.equal(expected);
  });

  it('works for february with filtering', () => {
    const d1 = new Date(2018, 1, 1).toISOString();
    const d2 = new Date(2018, 2, 1).toISOString();
    const txn1 = {processedDate: d1, date: d1};
    const txn2 = {processedDate: d2, date: d2};
    const actual = exportAccountData({txns: [txn1, txn2]}, 2);
    const expected = `${String.fromCharCode(65279)}"processedDate","date"\n"1/2/2018","1/2/2018"`;
    expect(actual).to.equal(expected);
  });

  it('works for december', () => {
    const d1 = new Date(2018, 11, 1).toISOString();
    const txn1 = {processedDate: d1, date: d1};
    const actual = exportAccountData({txns: [txn1]}, 12);
    const expected = `${String.fromCharCode(65279)}"processedDate","date"\n"1/12/2018","1/12/2018"`;
    expect(actual).to.equal(expected);
  });

  it('works when empty', () => {
    const actual = exportAccountData({txns: []}, 1);
    expect(actual).to.be.undefined;
  });
});
