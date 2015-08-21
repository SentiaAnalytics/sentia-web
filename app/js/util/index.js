'use strict';
const headLens = R.lensIndex(0);
const endLens = R.lensIndex(-1);

const getFormData = (form) => {
  return R.pipe(
    R.invoke('querySelectorAll', ['[name]']),
    R.map(switcher(basicInputs, checkbox, radio)),
    R.fromPairs)(form);

    function basicInputs (field) {
      if (R.contains(field.type, ['email', 'password', 'text', 'textarea', 'select-one'])) {
        return [field.name, field.value]
      }
    }
    function checkbox (field) {
      if (field.type === 'checkbox') {
        return [field.name, field.checked]
      }
    }
    function radio (field) {
      if (field.type === 'radio' && field.checked) {
        return [field.name, field.value]
      }
    }
};

const switcher = () => {
  var functions = Array.prototype.slice.call(arguments);
  return function () {
    var args = Array.prototype.slice.call(arguments);
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

const round = R.curry((decimal, number) => {
  let decimalMultiplier = Math.pow(10, decimal);
  return Math.round(number * decimalMultiplier) / decimalMultiplier;
});


const sumProp = R.curry((prop, result) => {
    return R.pipe(
    R.map(R.prop(prop)),
    R.sum,
    R.partial(round, 2)
  )(result);
});

const getEnumerablePropertyNames = (target) => {
    var result = [];
    for (var key in target) {
        result.push(key);
    }
    return result;
};

export default {
  headLens,
  endLens,
  getFormData,
  switcher,
  round,
  sumProp,
  getEnumerablePropertyNames
};
