'use strict';
var utils = require('./utils');

//## Dummy Data
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

exports.dummyTimeline = [
  {
    hour : 0,
    count : 1
  },
  {
    hour : 1,
    count : 2
  }
];


// #helper functions
exports.cameras = {
  find : function (params) {
    return utils.get('/cameras', params);
  }
};

exports.maps = {
  read : function (id) {
    return utils.get('/maps/:id', {id : id});
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
