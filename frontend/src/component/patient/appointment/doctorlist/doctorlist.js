// DoctorCard.jsx
import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './doctorlist.css'; // Custom CSS for animations and styling

const DoctorCard = ({ doctor }) => {
  return (
    <Container className="doctor-list-page">
      <Row className="justify-content-center">
        <Col md={4} lg={3} className="mb-4">
          <Card className="doctor-card">
            <Card.Body>
              <Card.Title>{doctor.name}</Card.Title>
               
              <Card.Text>
                <strong>Email:</strong> {doctor.email}
              </Card.Text>
              <Card.Text>
                <strong>Phone no:</strong> {doctor.phoneNumber}
              </Card.Text>
              <Card.Text>
                <strong>Specialty:</strong> {doctor.specialty}
              </Card.Text>
              <Button variant="primary" className="animated-button">Book Appointment</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorCard;
