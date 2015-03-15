// Check whether the user has been authenticated (logged in)
'use strict';
var HTTPError = require('node-http-error');
var CompaniesService = require('../services/companies.service');
var objectId = require('mongoose').Types.ObjectId;
module.exports = function(req, res, next) {
    // User is allowed, proceed to the next policy,
    // or if this is the last policy, the controller
    if (req.url === '/api/session/authenticate') {
      return next();
    }
    if (req.session.user) {
      // req.session.user._id = objectId(req.session.user._id);
      req.session.company = objectId(req.session.company);
      return next();
    }

    // req has an authorization header (APIKEY)
    if (req.headers.authorization) {
      return getCompany(req.headers.authorization)
        .then(function (company) {
          req.session.company = company._id;
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
