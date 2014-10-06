'use strict';
var argv = require('minimist')(process.argv.slice(2)),
  mongoose = require('mongoose');

require('../bootstrap/mongoose')
  .then(function () {
    var models = require('../models'),
    user, userObj;

    userObj = {
      email : argv.email,
      password : argv.password,
      firstname : argv.firstname || '',
      lastname : argv.lastname || '',
      company : argv.company
    };
    user = new models.User(userObj);
    user.savep()
      .then(function (user) {
        console.log(user);
        process.exit(0);
      });
  });
