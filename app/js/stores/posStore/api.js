'use strict';
import * as http from '../../services/http';
import dispatcher from '../../services/dispatcher';

export function fetchData(query) {
  console.log('fetchData');
  console.log(query);
 return http.get('/api/pos?json=' + JSON.stringify(query))
   .then(dispatchChangeAction);
}
function dispatchChangeAction(data) {
  dispatcher.dispatch({
    actionType: 'POS_CHANGED',
    data: data
  });
}
