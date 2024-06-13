#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const files = {
  'src/index.js': `
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
`,
  'src/components/Navbar.js': `
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const CustomNavbar = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand as={Link} to="/">Hotel PMS</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
        <Nav.Link as={Link} to="/reservations">Reservations</Nav.Link>
        <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
        <Nav.Link as={Link} to="/rooms">Rooms</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default CustomNavbar;
`,
  'src/components/AddCustomerForm.js': `
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
`,
  'src/components/AddReservationForm.js': `
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
`,
  'src/components/AddRoomForm.js': `
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
`,
  'src/pages/Reservations.js': `
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AddReservationForm from '../components/AddReservationForm';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    api.get('/reservations')
      .then(response => setReservations(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Reservations</h1>
          <AddReservationForm />
          <ListGroup>
            {reservations.map(reservation => (
              <ListGroup.Item key={reservation.id}>
                {reservation.id} - {reservation.status}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Reservations;
`,
  'src/pages/Customers.js': `
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AddCustomerForm from '../components/AddCustomerForm';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    api.get('/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Customers</h1>
          <AddCustomerForm />
          <ListGroup>
            {customers.map(customer => (
              <ListGroup.Item key={customer.id}>
                {customer.name} - {customer.contactInfo}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Customers;
`,
  'src/pages/Rooms.js': `
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AddRoomForm from '../components/AddRoomForm';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    api.get('/rooms')
      .then(response => setRooms(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Rooms</h1>
          <AddRoomForm />
          <ListGroup>
            {rooms.map(room => (
              <ListGroup.Item key={room.id}>
                {room.roomType} - {room.status} - \${room.price}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
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
  console.log(`Creating and updating files in ${projectRoot}...`);

  createFiles(files, projectRoot);

  console.log('File creation and update complete.');
};

main();
