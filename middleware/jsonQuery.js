var log = require('bragi').log;
module.exports = function (req, res, next) {
  if (!req.query && req.query.json) {
    log('debug:middleware', 'No json to parse')
    return next();
  }
  log('stuff', req.query.json);
  req.query = JSON.parse(req.query.json);
  log('more:stuff', req.query);
  return next();
}
