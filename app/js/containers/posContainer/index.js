'use strict';
import storeContainer from '../storeContainer';
import startDateContainer from '../startDateContainer';
import endDateContainer from '../endDateContainer';
import helper from './helper';
import containerFactory  from '../../services/containerFactory';

let container = containerFactory.create([]);

export default container;

container.observable
  .subscribe(
    container => container,
    (err) => console.error('posStore', err, err.stack));

rx.Observable.combineLatest(
  startDateContainer.observable,
  endDateContainer.observable,
  storeContainer.observable,
  (startDate, endDate, store) =>  {
    return { startDate, endDate, store };
  })
  .filter(helper.filterInput)
  .flatMap(fetchData)
  .map(R.map(helper.parseNumbersAndDates))
  .subscribe(container.observable);

function fetchData (query) {
  return helper.fetchData(query)
    .catch(function (err) {
      container.error.onNext(err);
      return rx.Observable.empty();
    });
}
