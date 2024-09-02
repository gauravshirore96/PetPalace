import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';

const Buyer = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div>
      {/* Header / Navbar */}
      <Navbar bg="dark" expand="lg" className="p-3 shadow-sm">
        <Navbar.Brand as={Link} to="/buyer" className="fw-bold" style={{color:'#fff'}}>
          Buyer Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/manage-cart">
              <Button variant="primary" className="me-2">Cart</Button>
            </Nav.Link>
            <Button variant="danger" onClick={handleLogout} className="fw-bold">
              Log Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Main Content */}
      <div className="container mt-5">
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold">Find Your Pet</Card.Title>
                <Card.Text className="flex-grow-1">
                  Browse through a wide range of pets available for adoption or purchase.
                </Card.Text>
                <Link to="/pets" className="mt-auto">
                  <Button variant="primary" block>Explore Pets</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold">Pet Supplies</Card.Title>
                <Card.Text className="flex-grow-1">
                  Discover high-quality supplies for your pets, from food to accessories.
                </Card.Text>
                <Link to="/supplies" className="mt-auto">
                  <Button variant="primary" block>Shop Supplies</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold">Veterinary Services</Card.Title>
                <Card.Text className="flex-grow-1">
                  Find trusted veterinary clinics and book appointments for your pets.
                </Card.Text>
                <Link to="/clinics" className="mt-auto">
                  <Button variant="primary" block>Find Clinics</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Buyer;
