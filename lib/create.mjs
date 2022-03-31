import CreatePushID from '#abstract-functions/CreatePushID';
import ToEncoding from '#abstract-functions/ToEncoding';
import ToPushIDLength from '#abstract-functions/ToPushIDLength';
import ToTimestamp from '#abstract-functions/ToTimestamp';

const create = (timestamp, encoding, length) => {
  const time = ToTimestamp(timestamp);
  const format = encoding === undefined ? 'base58' : ToEncoding(encoding);
  const pushIdLength = length === undefined ? 20 : ToPushIDLength(length);
  return CreatePushID(time, format, pushIdLength);
}

export default create;
