import RangeError from '#primordials/RangeError';
import StringToLowerCase from '#primordials/StringToLowerCase';
import ToString from '#abstract/ToString';

const ToEncoding = argument => {
  const string = ToString(argument);
  const encoding = StringToLowerCase(string);
  if (encoding !== 'base64url' && encoding !== 'base62' && encoding !== 'base58') {
    throw new RangeError('Invalid encoding');
  }
  return encoding;
}

export default ToEncoding;
