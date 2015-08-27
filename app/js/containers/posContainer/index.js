'use strict';
import storeContainer from '../storeContainer';
import {startDateContainer, endDateContainer} from '../dateContainer';
import helper from './helper';
import containerFactory  from '../../services/containerFactory';

let container = containerFactory.create([]);

export default container;

container.observable
  .subscribe(
    container => container,
    (err) => console.error('posStore', err, err.stack));

Rx.Observable.combineLatest(
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
      return Rx.Observable.empty();
    });
}
