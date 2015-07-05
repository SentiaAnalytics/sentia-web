'use strict';
let store = new rx.BehaviorSubject({
  startDate: moment()
    .startOf('day'),
  endDate: moment()
    .endOf('day'),
});
let error = new rx.BehaviorSubject(null);
let update = new rx.Subject();

export default {
  store,
  update,
  error,
};

store.subscribe(
  (value) => console.log('dateStore', value),
  (err) => console.error('dateStore', err));

update
  .filter((dates) => {
    return (moment.isMoment(dates.startDate) || moment.isMoment(dates.endDate));
  })
  .map(R.partial(R.merge(store.getValue())))
  .map(dates => {
    return {
      startDate: dates.startDate.startOf('day'),
      endDate: dates.endDate.endOf('day')
    };
  })
  .subscribe(store);
