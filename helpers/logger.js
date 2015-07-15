'use strict';
var winston = require('winston');
var config = require('config');
require('winston-papertrail').Papertrail;
module.exports = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'debug',
      colorize: 'all'
    }),
    new winston.transports.Papertrail({
      host: 'logs3.papertrailapp.com',
      port: 15237,
      level: 'debug',
      colorize: 'all',
      hostname: config.environment,
      program: 'web'
    })
  ]
});
