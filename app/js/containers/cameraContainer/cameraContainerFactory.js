'use strict';
import cachedAsync from '../../services/cachedAsync';

export default (helper) => {
  const error = new Rx.Subject();

  const fetch = (query) => {
    return helper.fetchData(query)
      .catch(function (err) {
        error.onNext(err);
        return Rx.Observable.empty();
      });
  };

  const observer = new Rx.BehaviorSubject(null);
  const observable = observer
    .flatMap(cachedAsync(observer, fetch));


  return {
    observer,
    observable,
    error
  };
};
