'use strict';
const getFileName = require('./getFileName');
const exportAccountData = require('./exportAccountData');
const scrapeIsracard = require('./scrapeIsracard');
const {writeFile} = require('fs').promises;

async function scrapeData({credentials, month, year, saveLocation}) {
  console.log('scraping...');
  for (const cred of credentials) {
    const account = await scrapeIsracard(cred, month, year);
    const data = await exportAccountData(account, month);

    for (let i = 1, ii = month; i < ii; i++) {
      await writeFile(`${saveLocation}/${getFileName(account.accountNumber, i, year)}.csv`, data);
    }
  }
}

module.exports = scrapeData;
