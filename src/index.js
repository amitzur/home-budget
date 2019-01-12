#!/usr/bin/env node
const path = require('path');
const {readFile, writeFile} = require('fs').promises;
const {createScraper} = require('israeli-bank-scrapers');
const makeProcessFile = require('./processFile');
const makeScrapeData = require('./scrapeData');
const exportAccountData = require('./exportAccountData');
const makeScrapeIsracard = require('./scrapeIsracard');
const makeSaveData = require('./saveData');
const makeGetIsracardData = require('./getIsracardData');

async function main({conf, file}) {
  const getIsracardData = makeGetIsracardData({createScraper, writeFile});
  const scrapeIsracard = makeScrapeIsracard({getIsracardData});
  const saveData = makeSaveData({exportAccountData, writeFile});
  const processFile = makeProcessFile({saveData, readFile});
  const scrapeData = makeScrapeData({saveData, scrapeIsracard});

  const settings = require(conf);
  console.log('settings:', settings);
  const {credentials, month, year, saveLocation} = settings;

  if (file) {
    const filepath = path.resolve(process.cwd(), file);
    await processFile({filepath, saveLocation, year});
  } else {
    await scrapeData({credentials, month, year, saveLocation});
  }
}

if (require.main === module) {
  const argv = require('./argv');
  console.log('running with', argv);
  main(argv);
}
