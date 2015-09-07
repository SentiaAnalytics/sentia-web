'use strict';
import util from '../../util';

export default R.curry((helper, startDate, endDate, store) => {
  const error = new Rx.Subject();
  const fetchData = R.compose(util.memoize, util.catchErrors(error))(helper.fetchData);
  const observable = Rx.Observable.combineLatest(
    startDate,
    endDate,
    store,
    (startDate, endDate, store) => ({ startDate, endDate, store }))
    .filter(helper.filterInput)
    .flatMap(fetchData)
    .map(R.map(helper.parseNumbersAndDates));

  return {
    error,
    observable
  };
});
