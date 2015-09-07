'use strict';
import querySelectorAll from './querySelectorAll';
import switcher from './switcher';

// DOMElement -> [Name, Value]
const basicInputs = (field) => {
  if (R.contains(field.type, ['email', 'password', 'text', 'textarea', 'select-one'])) {
    return [field.name, field.value];
  }
};

// DOMElement -> [Name, Value]
const checkbox = (field) => {
  if (field.type === 'checkbox') {
    return [field.name, field.checked];
  }
};

// DOMElement -> [Name, Value]
const radio = (field) => {
  if (field.type === 'radio' && field.checked) {
    return [field.name, field.value];
  }
};

// DOMElement -> [Name, Value]
const getNameValuePair = switcher(basicInputs, checkbox, radio);

// DOMElement -> [[Name, Value]]
const getFormNameValuePairs = R.compose(R.map(getNameValuePair), logger.log('formelements'), querySelectorAll(['[name]']));

// DOMElement -> {Name: Value}
export default R.compose(R.fromPairs, getFormNameValuePairs);
