'use strict';

const GetIntrinsicOrThrow = require('#intrinsics/GetIntrinsicOrThrow');
const FunctionBind = require('#primordials/FunctionBind');
const Map = require('#primordials/Map');
const MapSet = require('#primordials/MapSet');
const ENCODINGS = require('./ENCODINGS');

const MapPrototypeGet = GetIntrinsicOrThrow('Map.prototype.get');

const ALPHABET_LOOKUPS = new Map();

for (let i = 0; i < 3; i++) {
  const entry = ENCODINGS[i];
  const encoding = entry[0];
  const alphabet = entry[1];
  const base = alphabet.length;
  const alphabetLookup = new Map();
  for (let j = 0; j < base; j++) {
    const char = alphabet[j];
    MapSet(alphabetLookup, char, j);
  }
  MapSet(ALPHABET_LOOKUPS, encoding, alphabetLookup);
}

const GetAlphabetLookup = FunctionBind(MapPrototypeGet, ALPHABET_LOOKUPS);

module.exports = GetAlphabetLookup;
