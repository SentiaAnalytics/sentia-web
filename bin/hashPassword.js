'use strict';
var bcrypt = require('../services/bcrypt'),
  argv = require('minimist')(process.argv.slice(2));

bcrypt.hash(argv._[0])
  .then(console.log);
