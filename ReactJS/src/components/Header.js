// src/components/Header.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Pet Palace</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link href="/login">Pets</Nav.Link>
              <Nav.Link href="/login">Supplies</Nav.Link>
              <Nav.Link href="/clinics">Clinics</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
