'use strict';
var redis = require('redis'),
  config = require('config'),
  url = require("url").parse(config.redis),
  client = require("redis").createClient(url.port, url.hostname);

console.log('REDIS', config.redis);

// client.auth(url.auth.split(":")[1]);
module.exports = client;
