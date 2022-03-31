import MathFloor from '#primordials/MathFloor';
import RangeError from '#primordials/RangeError';
import GetAlphabet from '#internal/GetAlphabet';
import RandomInt from './RandomInt.mjs';

const CreatePushID = (timestamp, encoding, length) => {
  const alphabet = GetAlphabet(encoding);
  const base = alphabet.length;
  const zeroChar = alphabet[0];
  let pushId = '';
  let carry = timestamp;
  let index = 0;
  while (index < 8) {
    if (carry) {
      const charIndex = carry % base;
      const char = alphabet[charIndex];
      pushId = `${char}${pushId}`;
      carry = MathFloor(carry / base);
    } else {
      pushId = `${zeroChar}${pushId}`;
    }
    index++;
  }
  if (carry) {
    throw new RangeError('Timestamp out of range');
  }
  while (index < length) {
    const integer = RandomInt(base);
    pushId += alphabet[integer];
    index++;
  }
  return pushId;
}

export default CreatePushID;
