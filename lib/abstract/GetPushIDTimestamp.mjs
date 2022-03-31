import MapGet from '#primordials/MapGet';
import MapSize from '#primordials/MapSize';
import GetAlphabetLookup from '#internal/GetAlphabetLookup';
import ThrowInvalidCharacterError from './ThrowInvalidCharacterError.mjs';

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

export default GetPushIDTimestamp;
