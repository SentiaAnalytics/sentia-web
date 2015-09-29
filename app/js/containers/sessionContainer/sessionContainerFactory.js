'use strict';
export default R.curry((http) => {
  const handlers = {
    login: credentials => http.post('/api/session/authenticate', credentials),
    logout: () =>  http.del('/api/session').map(x => ({})),
    fetch: () => http.get('/api/session'),
  }
  const error = new Rx.Subject();
  const observer = new Rx.Subject();

  const observable = observer
    .filter(({action}) => handlers.hasOwnProperty(action))
    .flatMap(({action, payload}) => {
      return handlers[action](payload)
      .catch(function (err) {
        error.onNext(err.data);
        return Rx.Observable.empty();
      });
    })
    .tap(x => error.onNext(null));

  observable.subscribe(logger.log('SESSION'), logger.log('SESSION ERROR'));
  
  return {
    error,
    observer,
    observable
  };
});
