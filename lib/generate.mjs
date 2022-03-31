import GeneratePushID from '#abstract-functions/GeneratePushID';
import ToEncoding from '#abstract-functions/ToEncoding';
import ToPushIDLength from '#abstract-functions/ToPushIDLength';

const generate = (encoding, length) => {
  const format = encoding === undefined ? 'base58' : ToEncoding(encoding);
  const pushIdLength = length === undefined ? 20 : ToPushIDLength(length);
  return GeneratePushID(format, pushIdLength);
}

export default generate;
