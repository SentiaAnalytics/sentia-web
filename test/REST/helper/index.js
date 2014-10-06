'use strict';
var utils = require('./utils');


// #helper functions
exports.cameras = {
  find : function (params) {
    return utils.get('/cameras', params);
  }
};

exports.maps = {
  list : function (query) {
    return utils.get('/maps', query );
  },
  timeline : function (query) {
    return utils.get('/maps/timeline', query);
  }
};

exports.session =  {
  authenticate : function (credentials) {
    return utils.post('/session/authenticate', null, credentials)
      .then(function (r) {
        if (r.statusCode === 200 && r.headers['set-cookie'])  {
          utils.headers.cookie = r.headers['set-cookie'];
        }
        return r;
      });
  },
  read : function () {
    return utils.get('/session', null);
  },
  delete : function () {
    return utils.delete('/session')
      .then(function (r) {
        delete utils.headers.cookie;
        return r;
      });
  }

};
exports.users = {
  create : function (user) {
    return utils.post('/users', null, user);
  },
  find :function (query) {
    return utils.get('/users', query);
  }
};
