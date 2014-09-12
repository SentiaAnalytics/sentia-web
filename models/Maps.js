'use strict';
module.exports = function(sequelize, DataTypes) {
  var Map = sequelize.define('Map', {
    x : DataTypes.INTEGER,
    y : DataTypes.INTEGER,
    dx : DataTypes.INTEGER,
    dy : DataTypes.INTEGER,
    heat : DataTypes.INTEGER,
    camera : DataTypes.INTEGER,
    company : DataTypes.INTEGER,
    time : DataTypes.DATE
  }, {
    classMethods: {
      associate: function (models) {
        Map.belongsTo(models.Company);
        Map.belongsTo(models.Camera);
      }
    }
  });

  return Map;
};
