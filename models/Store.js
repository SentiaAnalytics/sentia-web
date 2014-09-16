'use strict';
module.exports = function(sequelize, DataTypes) {
  var Store = sequelize.define('Store', {
    Name : DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        Store.belongsTo(models.Company);
      }
    }
  });

  return Store;
};
