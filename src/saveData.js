'use strict';
const getFileName = require('./getFileName');

function makeSaveData({exportAccountData, writeFile}) {
  return async function saveData(saveLocation, account, year) {
    for (let i = 1, ii = 12; i <= ii; i++) {
      const data = exportAccountData(account, i);
      if (data) {
        await writeFile(`${saveLocation}/${getFileName(account.accountNumber, i, year)}.csv`, data);
      }
    }
  };
}

module.exports = makeSaveData;
