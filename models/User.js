'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password : DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        User.belongsTo(models.Company);
      }
    }
  });

  return User;
};
