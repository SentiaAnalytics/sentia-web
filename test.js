'use strict';
import rx from 'rx';
import R from 'ramda';

let input = new rx.BehaviorSubject(2);
let cache = {};
let getFromCache = x => {
  if (cache[x]) {
    console.log('CACHE', cache[x]);
    return rx.Observable.of(cache[x]);
  }
  return rx.Observable.throw('missing');
};
let http = x => {
  return new rx.Observable.of('value');
};

let output = input
  .tap(x => console.log('tap', x))
  .flatMap(key => {
    return getFromCache(key)
      .catch(err => {
        console.log('HTTP', err);
        return new rx.Observable.of('value')
          .tap(value =>cache[key] = value);
      });
  });



output.subscribe(x => console.log(x));
input.onNext(2);
input.onNext(2);
input.onNext(2);
input.onNext(2);
