'use strict';

const ToString = require('#abstract/ToString');
const ValidatePushIDLength = require('./ValidatePushIDLength');

const ToPushID = argument => {
  const string = ToString(argument);
  const length = string.length;
  ValidatePushIDLength(length);
  return string;
}

module.exports = ToPushID;
