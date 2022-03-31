import DecodePushID from '#abstract-functions/DecodePushID';
import ToEncoding from '#abstract-functions/ToEncoding';
import ToPushID from '#abstract-functions/ToPushID';

const decode = (pushId, encoding) => {
  const string = ToPushID(pushId);
  const format = encoding === undefined ? 'base58' : ToEncoding(encoding);
  return DecodePushID(string, format);
}

export default decode;
