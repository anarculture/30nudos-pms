#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const componentContent = `
import React, { useState } from 'react';
import api from '../services/api';

const AddReservationForm = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [status, setStatus] = useState('Pending');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reservations', { checkIn, checkOut, status });
      alert('Reservation added successfully');
      setCheckIn('');
      setCheckOut('');
      setStatus('Pending');
    } catch (error) {
      console.error(error);
      alert('Error adding reservation');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Check-In:</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Check-Out:</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Checked-in">Checked-in</option>
          <option value="Checked-out">Checked-out</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <button type="submit">Add Reservation</button>
    </form>
  );
};

export default AddReservationForm;
`;

const pageContent = `
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AddReservationForm from '../components/AddReservationForm';

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
      <AddReservationForm />
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
`;

const createFile = (filePath, content) => {
  fs.outputFileSync(filePath, content.trim());
  console.log(`Created ${filePath}`);
};

const main = () => {
  const projectRoot = path.resolve(process.argv[2] || '.');

  const componentPath = path.join(projectRoot, 'src', 'components', 'AddReservationForm.js');
  const pagePath = path.join(projectRoot, 'src', 'pages', 'Reservations.js');

  console.log(`Creating AddReservationForm component in ${componentPath}...`);
  createFile(componentPath, componentContent);

  console.log(`Updating Reservations page in ${pagePath}...`);
  createFile(pagePath, pageContent);

  console.log('Form for creating a new reservation has been added successfully.');
};

main();
