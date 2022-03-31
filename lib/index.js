'use strict';

const GetIntrinsicOrThrow = require('#intrinsics/GetIntrinsicOrThrow');
const ObjectCreate = require('#primordials/ObjectCreate');
const ReflectDefineProperty = require('#primordials/ReflectDefineProperty');
const PushIDCreate = require('./create');
const PushIDDecode = require('./decode');
const PushIDGenerate = require('./generate');
const PushIDGenerator = require('./generator');
const PushIDTimestamp = require('./timestamp');

const ObjectPrototype = GetIntrinsicOrThrow('Object.prototype');
const SymbolToStringTag = GetIntrinsicOrThrow('@@toStringTag');

const PushID = ObjectCreate(ObjectPrototype, {
  create: {
    value: PushIDCreate
  },
  decode: {
    value: PushIDDecode
  },
  generate: {
    value: PushIDGenerate
  },
  generator: {
    value: PushIDGenerator
  },
  timestamp: {
    value: PushIDTimestamp
  }
});
ReflectDefineProperty(PushID, SymbolToStringTag, {
  value: 'PushID'
});

module.exports = PushID;
