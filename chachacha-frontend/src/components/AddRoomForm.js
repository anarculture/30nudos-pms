import React, { useState } from 'react';
import api from '../services/api';
import { Form, Button } from 'react-bootstrap';

const AddRoomForm = () => {
  const [roomType, setRoomType] = useState('');
  const [status, setStatus] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/rooms', { roomType, status, price });
      alert('Room added successfully');
      setRoomType('');
      setStatus('');
      setPrice('');
    } catch (error) {
      console.error(error);
      alert('Error adding room');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formRoomType">
        <Form.Label>Room Type</Form.Label>
        <Form.Control
          type="text"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formStatus">
        <Form.Label>Status</Form.Label>
        <Form.Control
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Room
      </Button>
    </Form>
  );
};

export default AddRoomForm;