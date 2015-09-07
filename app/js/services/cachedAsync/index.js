'use strict';

export default R.curry((trigger, f) => {
  let cache;
  trigger.subscribe(() => cache = null);
  return (input) => {
    if (!cache) {
      cache = f(input)
    }
    return cache;
  }
});
