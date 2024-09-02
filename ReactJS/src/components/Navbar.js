import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { toggleMenu } from '../store';

const Header = () => {
  const isMenuVisible = useSelector(state => state.isMenuVisible);
  const dispatch = useDispatch();

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  return (
    <>
      {isMenuVisible && (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">PetPalace</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/pets">Pets</Nav.Link>
              <Nav.Link href="/supplies">Supplies</Nav.Link>
              <Nav.Link href="/clinics">Clinics</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
      <button onClick={handleToggleMenu} className="btn btn-primary">
        {isMenuVisible ? 'Hide Menu' : 'Show Menu'}
      </button>
    </>
  );
};

export default Header;
