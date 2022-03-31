'use strict';

const MapGet = require('#primordials/MapGet');
const MapSize = require('#primordials/MapSize');
const GetAlphabetLookup = require('#internal/GetAlphabetLookup');
const ThrowInvalidCharacterError = require('./ThrowInvalidCharacterError');

const GetPushIDTimestamp = (pushId, encoding) => {
  const alphabetLookup = GetAlphabetLookup(encoding);
  const base = MapSize(alphabetLookup);
  let timestamp = 0;
  for (let i = 0; i < 8; i++) {
    const char = pushId[i];
    const charIndex = MapGet(alphabetLookup, char);
    if (charIndex === undefined) {
      ThrowInvalidCharacterError(i);
    }
    timestamp = timestamp * base + charIndex;
  }
  return timestamp;
}

module.exports = GetPushIDTimestamp;
