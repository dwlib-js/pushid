'use strict';

const RangeError = require('#primordials/RangeError');
const StringToLowerCase = require('#primordials/StringToLowerCase');
const ToString = require('#abstract/ToString');

const ToEncoding = argument => {
  const string = ToString(argument);
  const encoding = StringToLowerCase(string);
  if (encoding !== 'base64url' && encoding !== 'base62' && encoding !== 'base58') {
    throw new RangeError('Invalid encoding');
  }
  return encoding;
}

module.exports = ToEncoding;
