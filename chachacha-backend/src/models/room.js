const { DataTypes } = require('sequelize');
    const sequelize = require('../config/database');

    const Room = sequelize.define('Room', {
      roomType: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false }
    });

    module.exports = Room;