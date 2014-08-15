var server = require('./server'),
  config = require('config');
server.listen(config.port || 3000);
