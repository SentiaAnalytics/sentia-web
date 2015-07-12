'use strict';
var R = require('ramda');
var moment = require('moment');
var rx = require('rx');

dateStore();
// example();
function dateStore () {

  var store = new rx.BehaviorSubject(moment());
  var update = new rx.Subject();
  var change = update
    .map(function (date) {
      return date.endOf('day');
    })
    .filter(function (date) {
      return !date.isSame(store.getValue());
    });


  change
    .tap(function (x) {
       console.log('update url');
    })
    .map(function (date) {
      return date.format('YYYY-MM-DD');
    })
    .subscribe(function (x) {});

  change
    .tap(function (x) {
        console.log('update');
    })
    .subscribe(store);

  update.onNext(moment('2015-01-01'));
}

function example () {
  var store = new rx.BehaviorSubject(moment());
  var update = new rx.Subject();
  var change = update
    .map(function (date) {
      return date.endOf('day');
    })
    .filter(function (date) {
      console.log(date.toString());
      return !date.isSame(store.getValue());
    });

   change
    .tap(function (x) {
       console.log('1');
    })
    .subscribe(store);

   change
    .tap(function (x) {
       console.log('2');
    })
    .subscribe(function () { })

    update.onNext(moment('2015-01-01'));
}
