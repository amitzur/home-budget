'use strict';

function makeProcessFile({readFile, saveData}) {
  return async function processFile({filepath, saveLocation, year}) {
    console.log('reading data from', filepath);
    const account = JSON.parse(await readFile(filepath));
    await saveData(saveLocation, account, year);
  };
}

module.exports = makeProcessFile;
