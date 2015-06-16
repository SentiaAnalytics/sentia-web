'use strict';
var winston = require('winston');
var config = require('config');
var Loggly = require('winston-loggly').Loggly;
module.exports = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'debug',
      colorize: 'all'
    }),
    new Loggly({
        "subdomain": config.logglySubdomain,
        "inputToken": config.logglyInputToken,
        level: 'debug',
        colorize: 'all',
        hostname: 'host',
        program: 'Sentia-web'
    })
  ]
});
