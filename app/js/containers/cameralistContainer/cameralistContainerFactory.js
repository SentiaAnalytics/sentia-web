'use strict';
import util from '../../util';

export default R.curry((http, store) => {
  const observable = store
    .filter(store => store && store._id)
    .map(({_id}) => `/api/cameras?store=${_id}`)
    .flatMap(http.get)
    .doError(logger.error('CameralistContainer Error:'))
    .toProperty();

  return {
    observable
  };
});
