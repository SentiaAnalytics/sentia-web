'use strict';
import util from '../../util';

export default R.curry((http, store) => {
  const error = new Rx.Subject();
  const query = R.compose(R.concat('/api/cameras?store='), R.prop('_id'));
  const httpGet = R.compose(http.get, R.concat('/api/cameras?store='), R.prop('_id'));
  const fetchData = R.compose(util.memoize, util.catchErrors(error))(httpGet);

  const observable = store
    .filter(store => store && store._id)
    .flatMap(fetchData);

  error.subscribe(logger.log('CameraListContainer Error:'));

  return {
    error,
    observable
  };
});
