'use strict';
var redis = require('redis'),
  config = require('config'),
  url = require("url").parse(config.redis),
  client = require("redis").createClient(url.port, url.hostname);

client.auth(url.auth.split(":")[1]);
module.exports = client;
