'use strict';

export default (f) => {
  let cache = {};
  return (input) => {
    let key = JSON.stringify(input);
    if (!cache[key]) {
      cache = {[key]: f(input)};
    }
    return cache[key];
  };
};
