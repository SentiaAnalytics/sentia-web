'use strict';
var argv = require('minimist')(process.argv.slice(2)),
  mongoose = require('mongoose');

require('../bootstrap/mongoose')
  .then(function  () {
    var models = require('../models'),
    company, companyObj;
    companyObj = {
      name : argv.name
    };
    company = new models.Company(companyObj);
    company.savep()
      .then(function (company) {
        console.log(company);
        process.exit(0);
      });
  });
