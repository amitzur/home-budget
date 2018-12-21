const {readFile, writeFile} = require('fs').promises;
const {createScraper} = require('israeli-bank-scrapers');
const makeProcessFile = require('./processFile');
const makeScrapeData = require('./scrapeData');
const exportAccountData = require('./exportAccountData');
const argv = require('./argv');
const makeScrapeIsracard = require('./scrapeIsracard');
const makeSaveData = require('./saveData');
const makeGetIsracardData = require('./getIsracardData');

(async function() {
  const getIsracardData = makeGetIsracardData({createScraper});
  const scrapeIsracard = makeScrapeIsracard({getIsracardData});
  const saveData = makeSaveData({exportAccountData, writeFile});
  const processFile = makeProcessFile({saveData, readFile});
  const scrapeData = makeScrapeData({saveData, scrapeIsracard});

  const {credentials, month, year, saveLocation} = await readFile(argv.conf);

  if (argv.file) {
    await processFile({filepath: argv.file, saveLocation, year});
  } else {
    await scrapeData({credentials, month, year, saveLocation});
  }
})();
