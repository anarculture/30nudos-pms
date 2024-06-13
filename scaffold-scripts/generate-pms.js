#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const filesToUpdate = {
  'src/config/database.js': `
    const { Sequelize } = require('sequelize');

    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: 'database.sqlite'
    });

    module.exports = sequelize;
  `,
  'src/models/customer.js': `
    const { DataTypes } = require('sequelize');
    const sequelize = require('../config/database');

    const Customer = sequelize.define('Customer', {
      name: { type: DataTypes.STRING, allowNull: false },
      contactInfo: { type: DataTypes.STRING, allowNull: false }
    });

    module.exports = Customer;
  `,
  'src/models/room.js': `
    const { DataTypes } = require('sequelize');
    const sequelize = require('../config/database');

    const Room = sequelize.define('Room', {
      roomType: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false }
    });

    module.exports = Room;
  `,
  'src/models/reservation.js': `
    const { DataTypes } = require('sequelize');
    const sequelize = require('../config/database');

    const Reservation = sequelize.define('Reservation', {
      checkIn: { type: DataTypes.DATE, allowNull: false },
      checkOut: { type: DataTypes.DATE, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false }
    });

    module.exports = Reservation;
  `,
  'src/models/index.js': `
    const sequelize = require('../config/database');

    const Customer = require('./customer');
    const Room = require('./room');
    const Reservation = require('./reservation');

    Customer.hasMany(Reservation);
    Reservation.belongsTo(Customer);

    Room.hasMany(Reservation);
    Reservation.belongsTo(Room);

    module.exports = { sequelize, Customer, Room, Reservation };
  `
};

const updateFiles = (basePath, files) => {
  Object.entries(files).forEach(([filePath, content]) => {
    const fullPath = path.join(basePath, filePath);
    fs.outputFileSync(fullPath, content.trim());
    console.log(`Updated ${fullPath}`);
  });
};

const main = () => {
  const projectRoot = path.resolve(process.argv[2] || '.');
  console.log(`Updating project files in ${projectRoot}...`);
  updateFiles(projectRoot, filesToUpdate);
  console.log('Update complete.');
};

main();
