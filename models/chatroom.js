'use strict';
module.exports = (sequelize, DataTypes) => {
  var chatroom = sequelize.define('chatroom', {
    zipcode: DataTypes.INTEGER,
    chatname: DataTypes.STRING,
    roomId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.chatroom.belongsToMany(models.user, { through: models.messages });
      }
    }
  });
  return chatroom;
};
