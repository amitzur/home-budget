'use strict';

module.exports = require('yargs')
  .argv.option('conf', {
    alias: 'c',
    describe: 'path to config file',
    default: `${require('os').homedir()}/.home-budget/settings`,
  })
  .option('file', {
    alias: 'f',
    describe: 'path to file with transaction data',
  });
