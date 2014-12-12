var log = require('bragi').log;
module.exports = function (req, res, next) {
  if (!req.query || !req.query.query) {
    log('debug:middleware', 'No json to parse')
    return next();
  }
  log('stuff', req.query.query);
  req.query = JSON.parse(req.query.query);
  log('more:stuff', req.query);
  return next();
}
