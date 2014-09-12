'use strict';
module.exports = function(sequelize, DataTypes) {
  var Camera = sequelize.define('Camera', {
    company : DataTypes.INTEGER,
    name : DataTypes.STRING,
    description : DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        Camera.belongsTo(models.Company);
      }
    }
  });
  return Camera;
};
