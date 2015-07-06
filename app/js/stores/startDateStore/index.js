'use strict';
let store = new rx.BehaviorSubject(moment().startOf('day'));
let update = new rx.Subject();

export default {
  store,
  update,
};

store.subscribe(
  R.identity,
  (err) => console.error('startDate', err));

update
  .filter((date) => moment.isMoment(date))
  .map(date => date.startOf('day'))
  .subscribe(store);
