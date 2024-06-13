#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const components = {
  'src/components/Navbar.js': `
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/">Dashboard</Link></li>
      <li><Link to="/reservations">Reservations</Link></li>
      <li><Link to="/customers">Customers</Link></li>
      <li><Link to="/rooms">Rooms</Link></li>
    </ul>
  </nav>
);

export default Navbar;
  `,
  'src/components/AddCustomerForm.js': `
import React, { useState } from 'react';
import api from '../services/api';

const AddCustomerForm = () => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/customers', { name, contactInfo });
      alert('Customer added successfully');
      setName('');
      setContactInfo('');
    } catch (error) {
      console.error(error);
      alert('Error adding customer');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contact Info:</label>
        <input
          type="text"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Customer</button>
    </form>
  );
};

export default AddCustomerForm;
  `
};

const pages = {
  'src/pages/Dashboard.js': `
import React from 'react';

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <p>Welcome to the Hotel Property Management System</p>
  </div>
);

export default Dashboard;
  `,
  'src/pages/Reservations.js': `
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    api.get('/reservations')
      .then(response => setReservations(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Reservations</h1>
      <ul>
        {reservations.map(reservation => (
          <li key={reservation.id}>
            {reservation.id} - {reservation.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reservations;
  `,
  'src/pages/Customers.js': `
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AddCustomerForm from '../components/AddCustomerForm';

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    api.get('/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Customers</h1>
      <AddCustomerForm />
      <ul>
        {customers.map(customer => (
          <li key={customer.id}>
            {customer.name} - {customer.contactInfo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Customers;
  `,
  'src/pages/Rooms.js': `
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    api.get('/rooms')
      .then(response => setRooms(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Rooms</h1>
      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            {room.roomType} - {room.status} - \${room.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rooms;
  `
};

const createFiles = (files, basePath) => {
  Object.entries(files).forEach(([filePath, content]) => {
    const fullPath = path.join(basePath, filePath);
    fs.outputFileSync(fullPath, content.trim());
    console.log(`Created ${fullPath}`);
  });
};

const main = () => {
  const projectRoot = path.resolve(process.argv[2] || '.');
  console.log(`Creating component and page files in ${projectRoot}...`);

  createFiles(components, projectRoot);
  createFiles(pages, projectRoot);

  console.log('File creation complete.');
};

main();
