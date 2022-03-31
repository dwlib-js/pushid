import ToString from '#abstract/ToString';
import ValidatePushIDLength from './ValidatePushIDLength.mjs';

const ToPushID = argument => {
  const string = ToString(argument);
  const length = string.length;
  ValidatePushIDLength(length);
  return string;
}

export default ToPushID;
