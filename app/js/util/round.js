'use strict';
export default R.curry((decimal, number) => {
  let decimalMultiplier = Math.pow(10, decimal);
  return Math.round(number * decimalMultiplier) / decimalMultiplier;
});
