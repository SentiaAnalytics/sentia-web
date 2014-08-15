'use strict';
var route = function (req, res) {
  res.send('a store');
};
route.url = ':id';
route.params = {
  required : ['id'],
  properties : {
    id : {
      type : 'string'
    }
  }
};
module.exports = route;
