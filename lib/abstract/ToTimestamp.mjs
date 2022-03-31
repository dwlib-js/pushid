import GetIntrinsicOrThrow from '#intrinsics/GetIntrinsicOrThrow';
import RangeError from '#primordials/RangeError';
import ToIntegerOrInfinity from '#abstract/ToIntegerOrInfinity';

const MAX_SAFE_INTEGER = GetIntrinsicOrThrow('Number.MAX_SAFE_INTEGER');

const ToTimestamp = argument => {
  const number = ToIntegerOrInfinity(argument);
  if (number < 0 || number > MAX_SAFE_INTEGER) {
    throw new RangeError('Timestamp is not between 0 and 2^53 - 1');
  }
  return number;
}

export default ToTimestamp;
