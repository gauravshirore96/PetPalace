import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [view, setView] = useState('users'); // State to toggle between views
  const navigate = useNavigate(); // For navigation

  // Logic for viewing users
  const handleViewUsers = () => {
    setView('users');
  };

  // Logic for viewing sellers
  const handleViewSellers = () => {
    setView('sellers');
  };

  const handleAddUser = () => {
    // Logic for adding a user
  };

  const handleEditUser = (userId) => {
    // Logic for editing a user
  };

  const handleDeleteUser = (userId) => {
    // Logic for deleting a user
  };

  const handleEditSeller = (sellerId) => {
    // Logic for editing a seller
  };

  const handleDeleteSeller = (sellerId) => {
    // Logic for deleting a seller
  };

  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing auth tokens)
    navigate('/login'); // Redirect to the login page
  };

  // Sample data for users and sellers
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Seller' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Buyer' }
  ];

  const sellers = [
    { id: 1, name: 'Pet Supplies Inc.', contact: 'contact@petsupplies.com' },
    { id: 2, name: 'Pawfect Pets', contact: 'info@pawfectpets.com' }
  ];

  return (
    <Container fluid>
      <Navbar className="navbar" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#" onClick={handleViewUsers}>View Users</Nav.Link>
          <Nav.Link href="#" onClick={handleViewSellers}>View Sellers</Nav.Link>
          <Nav.Link href="#" onClick={handleAddUser}>Add User</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
        </Nav>
      </Navbar>
     
      <Row className="mt-4">
        <Col>
          <h3>{view === 'users' ? 'User Management' : 'Seller Management'}</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                {view === 'users' ? (
                  <>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </>
                ) : (
                  <>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {view === 'users' ? (
                users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <Button variant="warning" onClick={() => handleEditUser(user.id)}>Edit</Button>{' '}
                      <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                    </td>
                  </tr>
                ))
              ) : (
                sellers.map(seller => (
                  <tr key={seller.id}>
                    <td>{seller.id}</td>
                    <td>{seller.name}</td>
                    <td>{seller.contact}</td>
                    <td>
                      <Button variant="warning" onClick={() => handleEditSeller(seller.id)}>Edit</Button>{' '}
                      <Button variant="danger" onClick={() => handleDeleteSeller(seller.id)}>Delete</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
