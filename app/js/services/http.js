'use strict';
import * as axios from 'axios';
export let get = R.curry(_get);
export let post = R.curry(_post);

function _get (url) {
  return axios.get(url)
    .then(function (res) {
      return res.data;
    });
}

function _post (url, data) {
  return axios.post(url, data)
    .then(function (res) {
      return res.data;
    });
}
