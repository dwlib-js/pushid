'use strict';

const RangeError = require('#primordials/RangeError');

const ValidatePushIDLength = length => {
  if (length < 8 || length > 64) {
    throw new RangeError('PushID length is not between 8 and 64');
  }
}

module.exports = ValidatePushIDLength;
