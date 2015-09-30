'use strict';
import R from 'ramda';
var log = (key) => {
  return (value) => {
    console.log(key, value);
    return value
  };
};

var error = (key) => {
  return (value) => {
    console.error(key, value);
    return value
  }
}

export default { log, error };
