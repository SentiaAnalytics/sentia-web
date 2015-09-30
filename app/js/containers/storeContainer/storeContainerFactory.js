'use strict';
export default (http) => {
  const observer = new Bacon.Bus();
  const observable = observer
    .map(id => `/api/stores/${id}`)
    .flatMap(http.get)
    .doError(logger.error('StoreContainer Error:'))
    .toProperty();

  return {
    observer,
    observable
  };
};
