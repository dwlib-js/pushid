'use strict';

const CreatePushID = require('#abstract-functions/CreatePushID');
const ToEncoding = require('#abstract-functions/ToEncoding');
const ToPushIDLength = require('#abstract-functions/ToPushIDLength');
const ToTimestamp = require('#abstract-functions/ToTimestamp');

const create = (timestamp, encoding, length) => {
  const time = ToTimestamp(timestamp);
  const format = encoding === undefined ? 'base58' : ToEncoding(encoding);
  const pushIdLength = length === undefined ? 20 : ToPushIDLength(length);
  return CreatePushID(time, format, pushIdLength);
}

module.exports = create;
