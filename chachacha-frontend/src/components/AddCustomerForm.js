import React, { useState } from 'react';
import api from '../services/api';
import { Form, Button } from 'react-bootstrap';

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
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formContactInfo">
        <Form.Label>Contact Info</Form.Label>
        <Form.Control
          type="text"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Customer
      </Button>
    </Form>
  );
};

export default AddCustomerForm;