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
                {room.roomType} - {room.status} - ${room.price}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Rooms;