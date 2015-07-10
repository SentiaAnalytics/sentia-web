'use strict';
let store = new rx.BehaviorSubject(moment().endOf('day'));
let update = new rx.Subject();

export default {
  store,
  update,
};

store.subscribe(
  x => console.log('endDate', x),
  (err) => console.error('endDate', err));

update
  .filter((date) => moment.isMoment(date))
  .map(date => date.endOf('day'))
  .subscribe(store);
