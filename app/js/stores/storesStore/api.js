'use strict';
import * as http from '../../services/http';
import dispatcher from '../../services/dispatcher';

export function fetchStore(id) {
  return http.get('/api/stores/' + id)
    .then(dispatchChangeAction);
}

function dispatchChangeAction(store) {
  dispatcher.dispatch({
    actionType: 'STORE_CHANGED',
    store: store
  });
}
