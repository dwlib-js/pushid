import DateNow from '#primordials/DateNow';
import MathFloor from '#primordials/MathFloor';
import RangeError from '#primordials/RangeError';
import Uint8Array from '#primordials/Uint8Array';
import GetAlphabet from '#internal/GetAlphabet';
import RandomInt from './RandomInt.mjs';

function* CreatePushIDGenerator(encoding, length) {
  const alphabet = GetAlphabet(encoding);
  const base = alphabet.length;
  const zeroChar = alphabet[0];
  const maxByteCount = length - 8;
  const bytes = new Uint8Array(maxByteCount);
  const lastIndex = maxByteCount - 1;
  let lastTimestamp;
  let lastEncodedTimestamp;
  while (true) {
    const timestamp = DateNow();
    if (timestamp !== lastTimestamp) {
      lastTimestamp = timestamp;
      let carry = timestamp;
      let encodedTimestamp = '';
      for (let i = 0; i < 8; i++) {
        if (carry) {
          const charIndex = carry % base;
          const char = alphabet[charIndex];
          encodedTimestamp = `${char}${encodedTimestamp}`;
          carry = MathFloor(carry / base);
        } else {
          encodedTimestamp = `${zeroChar}${encodedTimestamp}`;
        }
      }
      lastEncodedTimestamp = encodedTimestamp;
      let pushId = encodedTimestamp;
      for (let i = 0; i < maxByteCount; i++) {
        const integer = RandomInt(base);
        bytes[i] = integer;
        pushId += alphabet[integer];
      }
      yield pushId;
    } else {
      for (let i = lastIndex; i >= 0; i--) {
        const byte = ++bytes[i];
        if (byte < base) {
          break;
        }
        bytes[i] = 0;
      }
      let pushId = lastEncodedTimestamp;
      for (let i = 0; i < maxByteCount; i++) {
        const byte = bytes[i];
        pushId += alphabet[byte];
      }
      yield pushId;
    }
  }
}

export default CreatePushIDGenerator;
