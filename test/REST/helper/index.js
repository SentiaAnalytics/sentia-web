'use strict';
var utils = require('./utils');

//## Properties
exports.user = {
  email: 'user@example.com',
  company: 1,
  firstname: null,
  lastname: null,
  id: 1,
  createdAt: null,
  updatedAt: null
};
exports.camera = { 
  company: 1,
  store: 1,
  name: 'Camera 1',
  id: 1,
  createdAt: null,
  updatedAt: null,
  cols: 100,
  rows: 100 
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

exports.stores = {
  cameras : {
    find : function (params) {
      return utils.get('/stores/:storeId/cameras', params);
    }
  }
};
