'use strict';
var utils = require('./utils');

//## Properties
exports.dummyUser = {
  email: 'user@example.com',
  company: 1,
  firstname: null,
  lastname: null,
  id: 1,
  createdAt: null,
  updatedAt: null
};
exports.dummyCamera = {
  company: 1,
  store: 1,
  name: 'Camera 1',
  id: 1,
  createdAt: null,
  updatedAt: null,
  cols: 100,
  rows: 100
};
exports.dummyMap = {
  id: 1,
  x: 2,
  y: 3,
  heat: 6,
  cam: 1,
  company: 1,
  time: 123,
  store: 1,
  dx: 4,
  dy: 5
};
exports.cameras = {
  find : function (params) {
    return utils.get('/cameras', params);
  }
};

exports.maps = {
  read : function (id) {
    return utils.get('/maps/:id', {id : id});
  }
};

exports.users =  {
  login : function (credentials) {
    return utils.post('/users/login', null, credentials)
      .then(function (r) {
        if (r.statusCode === 200 && r.headers['set-cookie'])  {
          utils.headers.cookie = r.headers['set-cookie'];
        }
        return r;
      });
  },
  active : function () {
    return utils.get('/users/active', null);
  },
  logout : function () {
    return utils.post('/users/logout')
      .then(function (r) {
        delete utils.headers.cookie;
        return r;
      });
  }

};
