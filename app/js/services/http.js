'use strict';
import R from 'ramda';
import qwest from 'qwest';
import request from 'superagent';

export let get = R.curry(_get);
export let post = R.curry(_post);
let headers = {
  'Accept': 'applications/json'
};

function _get (url) {
  return qwest.get(url, {headers: headers});
}

function _post (url, data) {
  return qwest.post(url, data, {headers: headers});
}
