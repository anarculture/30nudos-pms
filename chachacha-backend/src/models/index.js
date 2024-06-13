const sequelize = require('../config/database');

    const Customer = require('./customer');
    const Room = require('./room');
    const Reservation = require('./reservation');

    Customer.hasMany(Reservation);
    Reservation.belongsTo(Customer);

    Room.hasMany(Reservation);
    Reservation.belongsTo(Room);

    module.exports = { sequelize, Customer, Room, Reservation };