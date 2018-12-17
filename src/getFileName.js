'use strict';

function getFileName(accountNumber, month, year) {
  return `${accountNumber}_${String(month).padStart(2, '0')}_${year}`;
}

module.exports = getFileName;
