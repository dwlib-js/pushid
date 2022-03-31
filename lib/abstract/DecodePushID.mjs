import MapGet from '#primordials/MapGet';
import MapHas from '#primordials/MapHas';
import MapSize from '#primordials/MapSize';
import GetAlphabetLookup from '#internal/GetAlphabetLookup';
import ThrowInvalidCharacterError from './ThrowInvalidCharacterError.mjs';

const DecodePushID = (pushId, encoding) => {
  const length = pushId.length;
  const alphabetLookup = GetAlphabetLookup(encoding);
  const base = MapSize(alphabetLookup);
  let timestamp = 0;
  let index = 0;
  while (index < 8) {
    const char = pushId[index];
    const charIndex = MapGet(alphabetLookup, char);
    if (charIndex === undefined) {
      ThrowInvalidCharacterError(index);
    }
    timestamp = timestamp * base + charIndex;
    index++;
  }
  let uid = length > index ? '' : undefined;
  while (index < length) {
    const char = pushId[index];
    if (!MapHas(alphabetLookup, char)) {
      ThrowInvalidCharacterError(index);
    }
    uid += char;
    index++;
  }
  return {
    timestamp,
    uid
  };
}

export default DecodePushID;
