'use strict';
module.exports = function (err, req, res, next) {
  if (!err) {
    return next();
  }
    // console.error(err.stack);
  if (err.code) {
    return res.status(err.code)
      .send(err.message);
  }
  console.log('--- caught 500 ---');
  console.log(err);
  return res.status(500)
      .send('Internal Server Error');
};
