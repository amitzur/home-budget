'use strict';

function makeScrapeData({scrapeIsracard, saveData}) {
  return async function scrapeData({credentials, month, year, saveLocation}) {
    console.log('scraping...');
    for (const cred of credentials) {
      const account = await scrapeIsracard(cred, month, year);
      await saveData(saveLocation, account, year);
    }
  };
}

module.exports = makeScrapeData;
