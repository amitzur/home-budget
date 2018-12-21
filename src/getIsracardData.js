'use strict';
const path = require('path');
const getFileName = require('./getFileName');

function makeGetIsracardData({createScraper, writeFile}) {
  return async function getIsracardData(credentials, month, year) {
    const scraperId = 'isracard';
    const startYear = month < 2 ? year - 1 : year;
    const startMonth = (month - 2 + 12) % 12;
    const scraper = createScraper({
      companyId: scraperId,
      startDate: new Date(startYear, startMonth, 1),
    });

    const result = await scraper.scrape(credentials);
    console.log(`success: ${result.success}`);
    if (result.success) {
      const account = result.accounts[0];
      await writeFile(
        path.resolve(
          __dirname,
          `../.private/${getFileName(account.accountNumber, month, year)}.json`,
        ),
        JSON.stringify(account, null, 2),
      );
      if (account.txns.length) {
        return account;
      } else {
        console.log(
          `no transactions for account #${account.accountNumber} for month ${month}/${year}`,
        );
      }
    } else {
      console.log(`error type: ${result.errorType}`);
      console.log('error:', result.errorMessage);
    }
  };
}

module.exports = makeGetIsracardData;
