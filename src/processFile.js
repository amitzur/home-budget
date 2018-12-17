'use strict';
const getFileName = require('./getFileName');

function makeProcessFile({exportAccountData, writeFile, readFile}) {
  return async function processFile({filepath, saveLocation, year}) {
    console.log('reading data from', filepath);
    const account = JSON.parse(await readFile(filepath));
    for (let i = 1, ii = 12; i < ii; i++) {
      const data = exportAccountData(account, i);
      await writeFile(`${saveLocation}/${getFileName(account.accountNumber, i, year)}.csv`, data);
    }
  };
}

module.exports = makeProcessFile;
