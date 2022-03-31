import GetIntrinsicOrThrow from '#intrinsics/GetIntrinsicOrThrow';
import FunctionBind from '#primordials/FunctionBind';
import Map from '#primordials/Map';
import MapSet from '#primordials/MapSet';
import ENCODINGS from './ENCODINGS.mjs';

const MapPrototypeGet = GetIntrinsicOrThrow('Map.prototype.get');

const ALPHABETS = new Map();

for (let i = 0; i < 3; i++) {
  const entry = ENCODINGS[i];
  const encoding = entry[0];
  const alphabet = entry[1];
  MapSet(ALPHABETS, encoding, alphabet);
}

const GetAlphabet = FunctionBind(MapPrototypeGet, ALPHABETS);

export default GetAlphabet;
