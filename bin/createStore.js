'use strict';
var argv = require('minimist')(process.argv.slice(2)),
  mongoose = require('mongoose');

require('../bootstrap/mongoose')
  .then(function  () {
    var models = require('../models'),
    store, storeObj;

    storeObj = {
      name : argv.name,
      store : argv.store
    };
    store = new models.Store(storeObj);
    store.savep()
      .then(function (store) {
        console.log(store);
        process.exit(0);
      });
  });
