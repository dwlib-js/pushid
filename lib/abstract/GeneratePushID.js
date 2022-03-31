'use strict';

const DateNow = require('#primordials/DateNow');
const CreatePushID = require('./CreatePushID');

const GeneratePushID = (encoding, length) => {
  const timestamp = DateNow();
  return CreatePushID(timestamp, encoding, length);
}

module.exports = GeneratePushID;
