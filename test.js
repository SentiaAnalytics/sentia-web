'use strict';
var rx = require('rx');

var source = new rx.BehaviorSubject(0);

source.subscribe(function (value) {
    console.log('sub1', value);
});

source.subscribe(function (value) {
    console.log('sub2', value);
});

source.onNext(1);
source.onNext(2);
source.onNext(3);
source.onNext(4);
source.onNext(5);
