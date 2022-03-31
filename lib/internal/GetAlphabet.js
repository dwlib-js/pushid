'use strict';

const GetIntrinsicOrThrow = require('#intrinsics/GetIntrinsicOrThrow');
const FunctionBind = require('#primordials/FunctionBind');
const Map = require('#primordials/Map');
const MapSet = require('#primordials/MapSet');
const ENCODINGS = require('./ENCODINGS');

const MapPrototypeGet = GetIntrinsicOrThrow('Map.prototype.get');

const ALPHABETS = new Map();

for (let i = 0; i < 3; i++) {
  const entry = ENCODINGS[i];
  const encoding = entry[0];
  const alphabet = entry[1];
  MapSet(ALPHABETS, encoding, alphabet);
}

const GetAlphabet = FunctionBind(MapPrototypeGet, ALPHABETS);

module.exports = GetAlphabet;
