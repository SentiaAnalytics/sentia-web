'use strict';
import R from 'ramda';

var log = R.curryN(2, function log () {
   console.log.apply(console, arguments);
   return R.last(arguments);
});

var error = R.curryN(2, function error () {
   console.error.apply(console, arguments);
   return R.last(arguments);
});

export default { log, error };
