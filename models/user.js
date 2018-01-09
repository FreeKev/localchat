'use strict';
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len:{
          arges: [6, 32],
          msg: 'Password must be 6-32 characters long.'
        }
      }
    },
    facebookID: DataTypes.STRING,
    facebookToken: DataTypes.STRING,
    zipcode: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: function(pendingUser, options){
        if(pendingUser && pendingUser.password){
          var hash = bcrypt.hashSync(pendingUser.password, 10);
          pendingUser.password = hash;
        }
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.user.hasMany(models.messages);
      }
    }
  });

user.prototype.isValidPassword = function(passwordTyped){
  return bcrypt.compareSync(passwordTyped, this.password);
}

user.prototype.toJSON = function(){
  var user = this.get();
  delete user.password;
  return user;
}

// };

  return user;
};
