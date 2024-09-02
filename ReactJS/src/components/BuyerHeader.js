// BuyerHeader.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';

const BuyerHeader = ({ cartCount }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <Navbar bg="dark" expand="lg" className="p-3 shadow-sm">
      <Navbar.Brand as={Link} to="/buyer" className="fw-bold" style={{color:'#fff'}}>
        Buyer Dashboard
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <Nav.Link as={Link} to="/manage-cart">
            <Button variant="primary" className="me-2">
              Cart {cartCount > 0 && `(${cartCount})`}
            </Button>
          </Nav.Link>
          <Button variant="danger" onClick={handleLogout} className="fw-bold">
            Log Out
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default BuyerHeader;
