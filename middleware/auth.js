// Check whether the user has been authenticated (logged in)
'use strict';
var HTTPError = require('node-http-error');
var CompaniesService = require('../services/companies.service');
module.exports = function(req, res, next) {
    // User is allowed, proceed to the next policy,
    // or if this is the last policy, the controller
    if (req.session.user || req.url === '/api/session/authenticate') {
        return next();
    }

    console.log(req.headers);
    // req has an authorization header (APIKEY)
    if (req.headers.authorization) {
      console.log('auth header');
      return getCompany(req.headers.authorization)
        .then(function (company) {
          console.log('company');
          console.log(company);
          req.session.company = company;
          return next();
        });
    }
    // User is not allowed
    return next(new HTTPError(401, 'You must login to perform this action.'));

};

function getCompany(authToken) {
  var query = {
    where : {
      apiKeys : authToken
    }
  };
  return CompaniesService.find(query)
    .then(function (results) {
      return results[0];
    });
}
