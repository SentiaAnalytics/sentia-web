'use strict';
import R from 'ramda';
import request from 'superagent';

export let get = R.curry(_get);
export let post = R.curry(_post);

function _get (url) {
  return new Promise(function (resolve, reject) {
    request
      .get(url)
      .set('Accept', 'application/json')
      .end(function (err, result) {
        if (err) {
          return reject(err);
        }
        return resolve(result.body);
      });
  });
}

function _post (url, data) {
  return new Promise(function (resolve, reject) {
    request
      .post(url)
      .send(data)
      .set('Accept', 'application/json')
      .end(function (err, result) {
        if (err) {
          return reject(err);
        }
        return resolve(result.body);
      });
  });
}





