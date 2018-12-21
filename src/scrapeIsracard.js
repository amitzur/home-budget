'use strict';

function makeScrapeIsracard({getIsracardData}) {
  return async function scrapeIsracard(credentials, month, year) {
    const account = await getIsracardData(credentials, month, year);
    if (account) {
      console.log(
        `exporting ${account.txns.length} transactions for account # ${
          account.accountNumber
        } for month ${month}/${year}`,
      );
      return account;
    }
  };
}

module.exports = makeScrapeIsracard;
