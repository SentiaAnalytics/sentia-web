'use strict';
module.exports = function(sequelize, DataTypes) {
  var Apikeys = sequelize.define('Apikeys', {
   company : DataTypes.INTEGER,
   key : DataTypes.STRING 
  }, {
    classMethods: {
      associate: function (models) {
        Apikeys.belongsTo(models.Company);
      }
    }
  });

  return Apikeys;
};
