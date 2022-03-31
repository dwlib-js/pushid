'use strict';

const ToIntegerOrInfinity = require('#abstract/ToIntegerOrInfinity');
const ValidatePushIDLength = require('./ValidatePushIDLength');

const ToPushIDLength = argument => {
  const number = ToIntegerOrInfinity(argument);
  ValidatePushIDLength(number);
  return number;
}

module.exports = ToPushIDLength;
