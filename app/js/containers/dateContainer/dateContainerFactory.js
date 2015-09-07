'use strict';
export default R.curry((location, urlParam, mapDate) => {
  const toMoment = (input) => input? moment(input, 'YYYY-MM-DD'): moment();
  const initialDate = R.compose(mapDate , toMoment, location.get);
  const formatDate = (date) => date.format('YYYY-MM-DD');
  const setDateInUrl = (date) => location.set(urlParam, date);
  const updateUrl = R.compose(setDateInUrl, formatDate);

  const error = new Rx.Subject();
  const observer = new Rx.BehaviorSubject(initialDate(urlParam));
  const observable = observer
    .filter(date => moment.isMoment(date))
    .tap(logger.log('DATE'))
    .tap(updateUrl)
    .map(mapDate);

  return {
    error,
    observer,
    observable
  };
});
