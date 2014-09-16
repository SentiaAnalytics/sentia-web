'use strict';
module.exports = function(sequelize, DataTypes) {
  var Apikeys = sequelize.define('Apikeys', {
   Key : DataTypes.STRING 
  }, {
    classMethods: {
      associate: function (models) {
        Apikeys.belongsTo(models.Company);
      }
    }
  });
  Apikeys.sync();

  return Apikeys;
};
