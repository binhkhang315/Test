"use strict";

var opts = {
    logDirectory: './public/log',
    fileNamePattern: 'roll-<DATE>.log',
    dateFormat: 'YYYY.MM.DD'
};

var log = require('simple-node-logger').createLogManager(opts).createLogger();

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      getUserByID: function(id,cb){
        log.info('/models/userdata: getUserByID() : ' + id);
        var query = {
          where: {id: id}
        };
        User.findOne(query).then(cb);
      },
      getUserByName: function(username,cb){
        log.info('/models/userdata: getUserByName() : ' + username);
        var query = {
          where: {username: username}
        };
        User.findOne(query).then(cb);
      },
    },
    tableName: 'User'
  });
  return User;
};