import React, { useState, useEffect } from 'react';
import { Button, Offcanvas, ListGroup } from 'react-bootstrap';
import { House, InfoCircle, BoxArrowInRight, BoxArrowLeft } from 'react-bootstrap-icons';
import './navbar.css';
import { useNavigate } from 'react-router-dom';

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authState, setAuthState] = useState(false);
  const navigate = useNavigate();

  // Ensure useEffect updates authState based on localStorage
  useEffect(() => {
    const auth = localStorage.getItem('authState');
    setAuthState(!!auth); // Convert to boolean
  }, []);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const login = () => {
    navigate('/login'); // Navigate to login page
  };

  const logout = () => {
    localStorage.removeItem('authState');
    setAuthState(false); // Update state
    navigate('/'); // Navigate to home page after logout
  };

  return (
    <>
      <Button variant="primary" onClick={toggleDrawer} className="menu-button">
        <House size={30} />
      </Button>

      <Offcanvas show={isOpen} onHide={toggleDrawer} placement="start" className="sidebar">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-light">Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column">
          <ListGroup variant="flush" className="flex-grow-1">
            <ListGroup.Item action href="/" className="list-item">
              <House className="me-2" /> Home
            </ListGroup.Item>
            <ListGroup.Item action href="#about" className="list-item">
              <InfoCircle className="me-2" /> About
            </ListGroup.Item>
          </ListGroup>
          <Button
            variant={authState ? "danger" : "success"}
            onClick={authState ? logout : login}
            className="auth-button mt-3"
          >
            {authState ? <BoxArrowLeft className="me-2" /> : <BoxArrowInRight className="me-2" />}
            {authState ? 'Logout' : 'Login'}
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideNavbar;
