'use strict';
import * as axios from 'axios';

export default {
  get,
  del,
  post: R.curry(post)
};

function get (url) {
  let promise = axios.get(url)
    .then(function (res) {
      if (res.status >= 300) throw new Error(res);
      return res.data;
    })
    .catch(err => {
      return Promise.reject(err);
    });

  return Rx
    .Observable
    .fromPromise(promise);
}

function del (url) {
  let promise = axios.delete(url)
    .then(function (res) {
      if (res.status >= 300) throw new Error(res);
      return res.data;
    });

  return Rx
    .Observable
    .fromPromise(promise);
}

function post (url, data) {
  let promise = axios.post(url, data)
    .then(function (res) {
      if (res.status >= 300) throw new Error(res);
      return res.data;
    });

  return Rx
    .Observable
    .fromPromise(promise);
}
