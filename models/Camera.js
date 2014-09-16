'use strict';
module.exports = function(sequelize, DataTypes) {
  var Camera = sequelize.define('Camera', {
    Name : DataTypes.STRING,
    Description : DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        Camera.belongsTo(models.Company);
        Camera.belongsTo(models.Store);
      }
    }
  });
  return Camera;
};
