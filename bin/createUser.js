'use strict';
var argv = require('minimist')(process.argv.slice(2)),
  P = require('bluebird'),
  prompt = require('prompt'),
  models = require('../models'),
  mongoose = require('mongoose');


require('../bootstrap/mongoose')
  .then(getInput)
  .then(createUser)
  .then(done);
function getInput () {
  return new P(function (resolve, reject) {
    prompt.get([
      'firstname',
      'lastname',
      'email',
      'password',
      'company'
      ],function (err, userDetails) {
        if(err) {
          return reject(err);
        }
        return resolve(userDetails);
      })
  })
}
function createUser (userDetails) {
  var user = new models.User(userDetails);
  return user.savep()
}
function done(user) {
  console.log(user);
        process.exit(0);
}
