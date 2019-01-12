'use strict';

module.exports = require('yargs')
  .option('conf', {
    alias: 'c',
    describe: 'path to config file',
    default: `${require('os').homedir()}/.taktsiv/settings`,
  })
  .option('file', {
    alias: 'f',
    describe: 'path to file with transaction data',
  }).argv;
