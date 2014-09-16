'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    Email: DataTypes.STRING,
    Password : DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        User.belongsTo(models.Company);
      }
    }
  });

  return User;
};
