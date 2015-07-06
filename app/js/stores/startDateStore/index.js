'use strict';
let store = new rx.BehaviorSubject(moment().startOf('day'));
let error = new rx.BehaviorSubject(null);
let update = new rx.Subject();

export default {
  store,
  update,
  error,
};

store.subscribe(
  R.identity,
  (err) => console.error('startDate', err));

update
  .filter((date) => moment.isMoment(date))
  .map(date => date.startOf('day'))
  .subscribe(store);
