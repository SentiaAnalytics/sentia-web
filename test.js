'use strict';
var R = require('ramda');
var rx = require('rx');

var source = new rx.Subject();
var error = new rx.Subject();

function async (val) {
  if (val === 2) {
    return rx.Observable.throw(new Error('error'));
  }
  return rx.Observable.of('Hey');
}

source
  .flatMap(function (input) {
    return async(input)
      .catch(function (err) {
        error.onNext(err);
        return rx.Observable.empty();
      });
  })
  .subscribe(function (val) {
    console.log('val', val);
  },
  function (err) {
    console.log('err', err);
  });
error.subscribe(function (err) {
  console.log('error handled', err);

})

source.onNext(1);
source.onNext(2);
source.onNext(3);
