const {readFile, writeFile} = require('fs').promises;
const makeProcessFile = require('./processFile');
const scrapeData = require('./scrapeData');
const exportAccountData = require('./exportAccountData');
const argv = require('./argv');

(async function() {
  const {credentials, month, year, saveLocation} = await readFile(argv.conf);

  const processFile = makeProcessFile({exportAccountData, writeFile, readFile});

  if (argv.file) {
    await processFile({filepath: argv.file, saveLocation, year});
  } else {
    await scrapeData({credentials, month, year, saveLocation});
  }
})();
