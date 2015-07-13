'use strict';
import rx from 'rx';
import R from 'ramda';

let a = new rx.Subject();

a.flatMap(x => rx.Observable.empty())
  .subscribe(x => console.log(x));

a.onNext(1);
