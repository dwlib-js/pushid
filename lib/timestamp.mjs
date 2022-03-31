import GetPushIDTimestamp from '#abstract-functions/GetPushIDTimestamp';
import ToEncoding from '#abstract-functions/ToEncoding';
import ToPushID from '#abstract-functions/ToPushID';

const timestamp = (pushId, encoding) => {
  const string = ToPushID(pushId);
  const format = encoding === undefined ? 'base58' : ToEncoding(encoding);
  return GetPushIDTimestamp(string, format);
}

export default timestamp;
