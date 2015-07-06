'use strict';
var R = require('ramda');
var rx = require('rx');

var source = new rx.Subject()
  .map(function (value) {
    return value + 2;
  });
var error = new rx.Subject();

source.subscribe(function (v) {
console.log(v);
});
