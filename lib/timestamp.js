'use strict';

const GetPushIDTimestamp = require('#abstract-functions/GetPushIDTimestamp');
const ToEncoding = require('#abstract-functions/ToEncoding');
const ToPushID = require('#abstract-functions/ToPushID');

const timestamp = (pushId, encoding) => {
  const string = ToPushID(pushId);
  const format = encoding === undefined ? 'base58' : ToEncoding(encoding);
  return GetPushIDTimestamp(string, format);
}

module.exports = timestamp;
