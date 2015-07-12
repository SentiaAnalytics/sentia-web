'use strict';


export default {
  log,
  error
};

function log () {
  let args = Array.prototype.slice.call(arguments);
   console.log.apply(console, args);
   return args.pop();
}
function error () {
  let args = Array.prototype.slice.call(arguments);
   console.error.apply(console, args);
   return args.pop();
}
