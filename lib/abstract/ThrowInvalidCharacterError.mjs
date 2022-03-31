import RangeError from '#primordials/RangeError';

const ThrowInvalidCharacterError = index => {
  throw new RangeError(`Invalid PushID character at index ${index}`);
}

export default ThrowInvalidCharacterError;
