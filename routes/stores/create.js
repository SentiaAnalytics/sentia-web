'use strict';
var route = function (req, res) {
  res.send(req.body);
};

route.body = {
  required : ['name', 'integer'],
  properties : {
    name : {
      type : 'string'
    },
    company : {
      type : 'integer'
    }
  }
};
module.exports = route;
