'use strict';
import util from '../../util';

export default R.curry((helper, startDate, endDate, cameralist) => {
  const error = new Rx.Subject();
  const fetchData = R.compose(util.memoize, util.catchErrors(error))(helper.fetchData);
  const observable = Rx.Observable.combineLatest(
    startDate,
    endDate,
    cameralist,
    (startDate, endDate, cameralist) => ({ startDate, endDate, cameralist }))
    .filter(helper.filterInput)
    .tap(logger.log('PEOPLE QUERY'))
    .map(helper.getEntranceCameras)
    .flatMap(fetchData)

  error
    .filter(x => x)
    .subscribe(logger.log('peopleContainer Error:'))

  error.subscribe(logger.log('PeopleContainer Error:'));

  return {
    error,
    observable
  };
});
