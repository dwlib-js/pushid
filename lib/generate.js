'use strict';

const GeneratePushID = require('#abstract-functions/GeneratePushID');
const ToEncoding = require('#abstract-functions/ToEncoding');
const ToPushIDLength = require('#abstract-functions/ToPushIDLength');

const generate = (encoding, length) => {
  const format = encoding === undefined ? 'base58' : ToEncoding(encoding);
  const pushIdLength = length === undefined ? 20 : ToPushIDLength(length);
  return GeneratePushID(format, pushIdLength);
}

module.exports = generate;
