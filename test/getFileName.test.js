'use strict';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const getFileName = require('../src/getFileName');

describe('getFileName', () => {
  it('works', () => {
    expect(getFileName('bla', 4, 2018)).to.equal('bla_04_2018');
    expect(getFileName('bla', 12, 2018)).to.equal('bla_12_2018');
  });
});
