'use strict';
var request = require('request'),
  tokenise = require('url-builder').tokenise,
  when = require('when'),
  sinon = require('sinon'),
  sqlite = require('./sqlite'),
  db = require('../../../services/postgres'),
  host = 'http://localhost:3000/api';


// ## Methods
exports.get = function (url) {
  return when.promise(function (resolve) {
    url = host + url;
    console.log('HELPER: GET', url);
    request({
      method: 'GET',
      uri: url,
      headers: exports.headers
    }, function(e, r) {
      r.body = (typeof r.body === 'string') ? JSON.parse(r.body) : r.body;
      return resolve(r);
    });
  });
};

exports.post = function (url, body) {
  return when.promise(function (resolve) {
    url = host + url;
    console.log('HELPER: POST', url);
    request({
      method: 'POST',
      uri: url,
      json : body,
      headers: exports.headers
    }, function(e, r) {
      if (r.body) {
        r.body = (typeof r.body === 'string') ? JSON.parse(r.body) : r.body;
      }
      return resolve(r);
    });
  });
};

exports.login = function (credentials) {
  return exports.post('/users/login', credentials)
    .then(function (res) {
      if (res.statusCode === 200) {
        exports.headers.cookie = res.headers['set-cookie'];
      }
      return res;
    });
};

exports.setup = function () {
  sinon.stub(db, 'query', sqlite.query);
};
exports.teardown = function () {
  db.query.restore();
};
//## Properties
exports.user = {
  email: 'user@example.com',
  company: null,
  firstname: null,
  lastname: null,
  id: 1,
  createdAt: null,
  updatedAt: null
};

exports.headers = {
  'Content-type' : 'application/json',
  'Connection' : 'close'
};
