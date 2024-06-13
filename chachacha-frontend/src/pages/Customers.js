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