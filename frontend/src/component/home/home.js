import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './home.css';

const Home = () => {
    return (
        <div className="home-container">
            <Container>
                <Row className="home-intro">
                    <Col md={12} className="text-center">
                        <h1 className="home-title">Welcome to Quick Clinic</h1>
                        <p className="home-description">
                            Your health is our priority. Find the best healthcare services and stay healthy.
                        </p>
                        <Button href="/about" className="home-btn">Learn More</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;
