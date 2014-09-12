'use strict';
module.exports = function(sequelize, DataTypes) {
  var Receipt = sequelize.define('Receipt', {
    company : DataTypes.INTEGER,
    name : DataTypes.STRING,
    description : DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        Receipt.belongsTo(models.Company);
      }
    }
  });
  return Receipt;
};
