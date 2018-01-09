'use strict';
module.exports = (sequelize, DataTypes) => {
  var messages = sequelize.define('messages', {
    userId: DataTypes.INTEGER,
    zipcode: DataTypes.INTEGER,
    messageText: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.messages.belongsTo(models.user);
      }
    }
  });
  return messages;
};
