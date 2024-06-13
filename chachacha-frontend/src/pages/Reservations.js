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