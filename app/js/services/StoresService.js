var moment = require('moment'),
  lodash = require('lodash');
module.exports = function($http, $q) {
  'use strict';

  var selectedStore = null; // serves as a model
  var stores = null; // list of stores in the company

  this.getSelectedStore = function (id) {
    if (id) {
      if (selectedStore && selectedStore._id === id) {
        return $q.when(selectedStore);
      }
      return this.read(id)
        .then(function (store) {
          selectedStore  = store;
          return store;
        });
    }
    // until we get a company landing page with list of stores
    // we will just use the first store
    return this.get()
      .then(function (stores) {
        selectedStore  = stores[0];
        return stores[0];
      });
  };

  this.setSelectedStore = function (store) {
    if (store) {
      selectedStore = store;
    }
    return this;
  };

  this.getStores = function () {
    if (stores) {
      return $q.when(stores);
    }
    return this.get()
      .then(function (stores) {
        stores = stores;
        return stores;
      });
  };


  // get a specific store by id
  this.read = function (id) {
    return $http.get('/api/stores/' + id)
      .then(function (res) {
        return res.data;
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  // Get a list of stores
  this.get = function () {
    return $http.get('/api/stores')
      .then(function (res) {

        return res.data;
      })
      .catch(function (err) {
        console.log(err);
      });
  };



};
