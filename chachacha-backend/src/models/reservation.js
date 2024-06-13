const { DataTypes } = require('sequelize');
    const sequelize = require('../config/database');

    const Reservation = sequelize.define('Reservation', {
      checkIn: { type: DataTypes.DATE, allowNull: false },
      checkOut: { type: DataTypes.DATE, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false }
    });

    module.exports = Reservation;