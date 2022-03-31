import ToIntegerOrInfinity from '#abstract/ToIntegerOrInfinity';
import ValidatePushIDLength from './ValidatePushIDLength.mjs';

const ToPushIDLength = argument => {
  const number = ToIntegerOrInfinity(argument);
  ValidatePushIDLength(number);
  return number;
}

export default ToPushIDLength;
