'use strict';

const MathFloor = require('#primordials/MathFloor');
const MathRandom = require('#primordials/MathRandom');

const RandomInt = max => {
  const random = MathRandom();
  return MathFloor(random * max);
}

module.exports = RandomInt;
