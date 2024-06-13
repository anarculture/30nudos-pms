require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const customerRoutes = require('./routes/customerRoutes');
const roomRoutes = require('./routes/roomRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const { sequelize } = require('./models');

app.use(bodyParser.json());

app.use('/api/customers', customerRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/reservations', reservationRoutes);

sequelize.sync();

module.exports = app;
