'use strict';
export default R.curry((error, f) => (input) => {
  return f(input).catch((err) => {
    error.onNext(err);
    return Rx.Observable.empty();
  });
});
