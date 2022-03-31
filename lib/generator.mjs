import CreatePushIDGenerator from '#abstract-functions/CreatePushIDGenerator';
import ToEncoding from '#abstract-functions/ToEncoding';
import ToPushIDLength from '#abstract-functions/ToPushIDLength';

const generator = (encoding, length) => {
  const format = encoding === undefined ? 'base58' : ToEncoding(encoding);
  const pushIdLength = length === undefined ? 20 : ToPushIDLength(length);
  return CreatePushIDGenerator(format, pushIdLength);
}

export default generator;
