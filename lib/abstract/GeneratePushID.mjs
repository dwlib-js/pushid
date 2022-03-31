import DateNow from '#primordials/DateNow';
import CreatePushID from './CreatePushID.mjs';

const GeneratePushID = (encoding, length) => {
  const timestamp = DateNow();
  return CreatePushID(timestamp, encoding, length);
}

export default GeneratePushID;
