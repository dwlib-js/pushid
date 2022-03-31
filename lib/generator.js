'use strict';

const CreatePushIDGenerator = require('#abstract-functions/CreatePushIDGenerator');
const ToEncoding = require('#abstract-functions/ToEncoding');
const ToPushIDLength = require('#abstract-functions/ToPushIDLength');

const generator = (encoding, length) => {
  const format = encoding === undefined ? 'base58' : ToEncoding(encoding);
  const pushIdLength = length === undefined ? 20 : ToPushIDLength(length);
  return CreatePushIDGenerator(format, pushIdLength);
}

module.exports = generator;
