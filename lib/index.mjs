import GetIntrinsicOrThrow from '#intrinsics/GetIntrinsicOrThrow';
import ObjectCreate from '#primordials/ObjectCreate';
import ReflectDefineProperty from '#primordials/ReflectDefineProperty';
import PushIDCreate from './create.mjs';
import PushIDDecode from './decode.mjs';
import PushIDGenerate from './generate.mjs';
import PushIDGenerator from './generator.mjs';
import PushIDTimestamp from './timestamp.mjs';

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

export default PushID;
