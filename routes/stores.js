'use strict';
exports.find = {
  handler : function (req, res, next) {
    return res.send('fuck');
  },
  query : {
    properties : {
      name : {
        type : 'string'
      },
      limit :  {
        type : 'string'
      },
      skip : {
        type : 'string'
      },
      order : {
        type : 'string'
      }
    }
  }
};
