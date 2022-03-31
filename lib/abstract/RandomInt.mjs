import MathFloor from '#primordials/MathFloor';
import MathRandom from '#primordials/MathRandom';

const RandomInt = max => {
  const random = MathRandom();
  return MathFloor(random * max);
}

export default RandomInt;
