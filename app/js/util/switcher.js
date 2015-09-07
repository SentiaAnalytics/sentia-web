'use strict';
export default (...functions) => {
  return function (...args) {
    var i;
    var result = null;
    var func;
    for(i = 0; i < functions.length; i ++) {
      func = functions[i];
      result = func.apply(func, args);
      if (result) {
        return result;
      }
    }
    return null;
  };
}
