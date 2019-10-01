'use strict';
const json2csv = require('json2csv');

function exportAccountData({txns}, month) {
  const data = txns
    .filter(txn => new Date(txn.processedDate).getMonth() + 1 === month)
    .map(txn => {
      return {
        ...txn,
        date: formatDate(txn.date),
        processedDate: formatDate(txn.processedDate),
      };
    });

  if (data.length) {
    return json2csv.parse(data, {
      withBOM: true,
      fields: ['description', 'date', 'processedDate', 'chargedAmount', 'memo'],
    });
  }
}

function formatDate(isoString) {
  const d = new Date(isoString);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

module.exports = exportAccountData;
