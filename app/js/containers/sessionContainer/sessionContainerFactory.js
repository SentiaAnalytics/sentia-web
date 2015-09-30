'use strict';
import Bacon from 'baconjs';
export default R.curry((http) => {
  const handlers = {
    login: credentials => http.post('/api/session/authenticate', credentials),
    logout: () =>  http.del('/api/session').map(x => ({})),
    fetch: () => http.get('/api/session'),
  }
  const observer = new Bacon.Bus();
  const observable = observer
    .filter(({action}) => handlers.hasOwnProperty(action))
    .flatMap(({action, payload}) =>  handlers[action](payload))
    .doError(logger.error('SessionContainer Error:'))
    .toProperty();


  return {
    observer,
    observable
  };
});
