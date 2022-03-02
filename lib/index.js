'use strict';

const {
  DateNow,
  GeneratorPrototype,
  Map,
  MapGet,
  MapHas,
  MapSet,
  MathFloor,
  MathLog,
  MathRandom,
  ObjectCreate,
  ObjectDefineProperties,
  RangeError,
  ReflectDefineProperty,
  ReflectSetPrototypeOf,
  StringCharCodeAt,
  Symbol,
  SymbolHasInstance,
  SymbolIterator,
  SymbolToStringTag,
  TypeError,
  Uint8Array
} = require('@dwlib/primordials');
const IsObject = require('@dwlib/abstract/IsObject');
const IsString = require('@dwlib/abstract/IsString');
const ToIntegerOrInfinity = require('@dwlib/abstract/ToIntegerOrInfinity');
const ToString = require('@dwlib/abstract/ToString');
const {
  DefineSlots,
  GetSlot,
  HasSlot
} = require('@dwlib/internal-slots');

const LOG256 = MathLog(256);

const DEFAULT_LENGTH = 20;

const $Alphabet = Symbol('[[Alphabet]]');
const $AlphabetLookup = Symbol('[[AlphabetLookup]]');
const $TimestampLength = Symbol('[[TimestampLength]]');
const $Length = Symbol('[[Length]]');

const RandomInt = max => {
  const random = MathRandom();
  return MathFloor(random * max);
}

const GetTimestampLength = alphabetLength => {
  const log = MathLog(alphabetLength);
  return MathFloor(LOG256 / log * 6);
}

const IsPushID = argument => IsObject(argument) && HasSlot(argument, $Alphabet);

const RequireThis = argument => {
  if (!IsPushID(argument)) {
    throw new TypeError('`this` is not an instance of PushID');
  }
}

const CreatePushID = (target, timestamp) => {
  const alphabet = GetSlot(target, $Alphabet);
  const timestampLength = GetSlot(target, $TimestampLength);
  const alphabetLength = alphabet.length;
  let result = '';
  let carry = timestamp;
  while (result.length < timestampLength && carry) {
    const charIndex = carry % alphabetLength;
    const char = alphabet[charIndex];
    result = `${char}${result}`;
    carry = MathFloor(carry / alphabetLength);
  }
  if (carry) {
    throw new RangeError('Timestamp out of range');
  }
  if (result.length < timestampLength) {
    const zeroChar = alphabet[0];
    while (result.length < timestampLength) {
      result = `${zeroChar}${result}`;
    }
  }
  const length = GetSlot(target, $Length);
  while (result.length < length) {
    const integer = RandomInt(alphabetLength);
    result += alphabet[integer];
  }
  return result;
}

const Decode = (target, pushId) => {
  const length = pushId.length;
  const timestampLength = GetSlot(target, $TimestampLength);
  const maxLength = GetSlot(target, $Length);
  if (length < timestampLength || length > maxLength) {
    throw new RangeError('PushID length out of range');
  }
  const alphabet = GetSlot(target, $Alphabet);
  const alphabetLookup = GetSlot(target, $AlphabetLookup);
  const alphabetLength = alphabet.length;
  const zeroChar = alphabet[0];
  let leadingZeros = 0;
  while (leadingZeros < timestampLength && pushId[leadingZeros] === zeroChar) {
    leadingZeros++;
  }
  let timestamp = 0;
  for (let i = leadingZeros; i < timestampLength; i++) {
    const char = pushId[i];
    const charIndex = MapGet(alphabetLookup, char);
    if (charIndex === undefined) {
      throw new RangeError('Invalid PushID');
    }
    timestamp = timestamp * alphabetLength + charIndex;
  }
  let uid;
  if (length > timestampLength) {
    uid = '';
    for (let i = timestampLength; i < length; i++) {
      const char = pushId[i];
      if (!MapHas(alphabetLookup, char)) {
        throw new RangeError('Invalid PushID');
      }
      uid += char;
    }
  }
  return {
    timestamp,
    uid
  };
}

const PushIDGenerator = function* (target) {
  const alphabet = GetSlot(target, $Alphabet);
  const length = GetSlot(target, $Length);
  const timestampLength = GetSlot(target, $TimestampLength);
  const alphabetLength = alphabet.length;
  const zeroChar = alphabet[0];
  const maxByte = alphabetLength - 1;
  const capacity = length - timestampLength;
  const bytes = new Uint8Array(capacity);
  const lastIndex = capacity - 1;
  let lastTimestamp;
  let lastEncodedTimestamp;
  while (true) {
    const timestamp = DateNow();
    if (timestamp !== lastTimestamp) {
      lastTimestamp = timestamp;
      let carry = timestamp;
      let encodedTimestamp = '';
      while (carry) {
        const charIndex = carry % alphabetLength;
        const char = alphabet[charIndex];
        encodedTimestamp = `${char}${encodedTimestamp}`;
        carry = MathFloor(carry / alphabetLength);
      }
      while (encodedTimestamp.length < timestampLength) {
        encodedTimestamp = `${zeroChar}${encodedTimestamp}`;
      }
      lastEncodedTimestamp = encodedTimestamp;
      let result = encodedTimestamp;
      for (let i = 0; i < capacity; i++) {
        const integer = RandomInt(alphabetLength);
        bytes[i] = integer;
        result += alphabet[integer];
      }
      yield result;
    } else {
      for (let i = lastIndex; i >= 0; i--) {
        const byte = bytes[i];
        if (byte >= maxByte) {
          bytes[i] = 0;
          bytes[i ? i - 1 : lastIndex]++;
        } else {
          bytes[i]++;
          break;
        }
      }
      let result = lastEncodedTimestamp;
      for (let i = 0; i < capacity; i++) {
        const byte = bytes[i];
        result += alphabet[byte];
      }
      yield result;
    }
  }
}

const CreateGenerator = target => {
  const generator = PushIDGenerator(target);
  ReflectSetPrototypeOf(generator, PushIDGeneratorPrototype);
  return generator;
}

const PushIDGeneratorPrototype = ObjectCreate(GeneratorPrototype, {
  [SymbolToStringTag]: {
    value: 'PushID Generator'
  }
});

class PushID {
  constructor(alphabet, options) {
    if (!IsString(alphabet)) {
      throw new TypeError('`alphabet` is not a string');
    }
    const alphabetLength = alphabet.length;
    if (!alphabetLength || alphabetLength > 94) {
      throw new RangeError('Alphabet length out of range');
    }
    const alphabetLookup = new Map();
    for (let i = 0; i < alphabetLength; i++) {
      const char = alphabet[i];
      if (MapHas(alphabetLookup, char)) {
        throw new RangeError('Invalid alphabet');
      }
      const charCode = StringCharCodeAt(alphabet, i);
      if (charCode < 0x21 || charCode > 0x7e) {
        throw new RangeError('Invalid alphabet');
      }
      MapSet(alphabetLookup, char, i);
    }
    const timestampLength = GetTimestampLength(alphabetLength);
    let length;
    if (options === undefined) {
      length = DEFAULT_LENGTH;
    } else {
      if (!IsObject(options)) {
        throw new TypeError('`options` is not an object');
      }
      const $length = options.length;
      if ($length === undefined) {
        length = DEFAULT_LENGTH;
      } else {
        length = ToIntegerOrInfinity($length);
        if (length < timestampLength || length === Infinity) {
          throw new RangeError('PushID length out of range');
        }
      }
    }
    DefineSlots(this, {
      [$Alphabet]: alphabet,
      [$AlphabetLookup]: alphabetLookup,
      [$TimestampLength]: timestampLength,
      [$Length]: length
    });
  }

  get alphabet() {
    RequireThis(this);
    return GetSlot(this, $Alphabet);
  }

  get timestampLength() {
    RequireThis(this);
    return GetSlot(this, $TimestampLength);
  }

  get length() {
    RequireThis(this);
    return GetSlot(this, $Length);
  }

  for(timestamp) {
    RequireThis(this);
    const $timestamp = ToIntegerOrInfinity(timestamp);
    if ($timestamp < 0 || $timestamp === Infinity) {
      throw new RangeError('Timestamp out of range');
    }
    return CreatePushID(this, $timestamp);
  }

  generate() {
    RequireThis(this);
    const timestamp = DateNow();
    return CreatePushID(this, timestamp);
  }

  decode(pushId) {
    RequireThis(this);
    const $pushId = ToString(pushId);
    return Decode(this, $pushId);
  }

  getGenerator() {
    RequireThis(this);
    return CreateGenerator(this);
  }
}
exports.PushID = PushID;
exports.default = PushID;

ReflectDefineProperty(exports, '__esModule', {
  value: true
});

ReflectDefineProperty(PushID, SymbolHasInstance, {
  value: IsPushID
});

const PushIDPrototype = PushID.prototype;

ObjectDefineProperties(PushIDPrototype, {
  [SymbolIterator]: {
    value: PushIDPrototype.getGenerator
  },
  [SymbolToStringTag]: {
    value: 'PushID'
  }
});

const BASE64URL = new PushID('-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz');
exports.BASE64URL = BASE64URL;
const BASE62 = new PushID('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
exports.BASE62 = BASE62;
const BASE58 = new PushID('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
exports.BASE58 = BASE58;

ObjectDefineProperties(PushID, {
  BASE64URL: {
    value: BASE64URL
  },
  BASE62: {
    value: BASE62
  },
  BASE58: {
    value: BASE58
  }
});
