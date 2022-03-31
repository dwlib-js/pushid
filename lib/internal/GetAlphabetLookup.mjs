import GetIntrinsicOrThrow from '#intrinsics/GetIntrinsicOrThrow';
import FunctionBind from '#primordials/FunctionBind';
import Map from '#primordials/Map';
import MapSet from '#primordials/MapSet';
import ENCODINGS from './ENCODINGS.mjs';

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

export default GetAlphabetLookup;
