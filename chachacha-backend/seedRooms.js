const { sequelize, Room } = require('./src/models');

const rooms = [
  { roomType: 'Single', status: 'Available', price: 50 },
  { roomType: 'Single', status: 'Available', price: 50 },
  { roomType: 'Single', status: 'Available', price: 50 },
  { roomType: 'Single', status: 'Available', price: 50 },
  { roomType: 'Single', status: 'Available', price: 50 },
  { roomType: 'Double', status: 'Available', price: 75 },
  { roomType: 'Double', status: 'Available', price: 75 },
  { roomType: 'Double', status: 'Available', price: 75 },
  { roomType: 'Double', status: 'Available', price: 75 },
  { roomType: 'Double', status: 'Available', price: 75 },
  { roomType: 'Suite', status: 'Available', price: 150 },
  { roomType: 'Suite', status: 'Available', price: 150 },
  { roomType: 'Suite', status: 'Available', price: 150 },
  { roomType: 'Suite', status: 'Available', price: 150 },
  { roomType: 'Suite', status: 'Available', price: 150 },
  { roomType: 'Family', status: 'Available', price: 100 },
  { roomType: 'Family', status: 'Available', price: 100 },
  { roomType: 'Family', status: 'Available', price: 100 },
  { roomType: 'Family', status: 'Available', price: 100 },
  { roomType: 'Family', status: 'Available', price: 100 }
];

const seedRooms = async () => {
  try {
    await sequelize.sync({ force: true }); // This will drop the existing tables and recreate them
    await Room.bulkCreate(rooms);
    console.log('Rooms have been added successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding rooms:', error);
    process.exit(1);
  }
};

seedRooms();
