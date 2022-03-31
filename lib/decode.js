'use strict';

const DecodePushID = require('#abstract-functions/DecodePushID');
const ToEncoding = require('#abstract-functions/ToEncoding');
const ToPushID = require('#abstract-functions/ToPushID');

const decode = (pushId, encoding) => {
  const string = ToPushID(pushId);
  const format = encoding === undefined ? 'base58' : ToEncoding(encoding);
  return DecodePushID(string, format);
}

module.exports = decode;
