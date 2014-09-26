'use strict';
var bcrypt = require('../services/bcrypt');
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : true
      },
      unique : true
    },
    password : DataTypes.STRING,
    firstname : DataTypes.STRING,
    lastname : DataTypes.STRING
  }, {
    instanceMethods: {
      toJSON: function () {
        var values = this.values;

        delete values.password;
        return values;
      },
      validatePassword : function (password) {
        return bcrypt.compare(password, this.values.password);
      }
    },
    classMethods: {
      associate: function (models) {
        User.belongsTo(models.Company);
      }
    }
  });

  return User;
};
