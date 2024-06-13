import React, { useState } from 'react';
import api from '../services/api';
import { Form, Button } from 'react-bootstrap';

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
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formCheckIn">
        <Form.Label>Check-In</Form.Label>
        <Form.Control
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formCheckOut">
        <Form.Label>Check-Out</Form.Label>
        <Form.Control
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formStatus">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Checked-in">Checked-in</option>
          <option value="Checked-out">Checked-out</option>
          <option value="Cancelled">Cancelled</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Reservation
      </Button>
    </Form>
  );
};

export default AddReservationForm;