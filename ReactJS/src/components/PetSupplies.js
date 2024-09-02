import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './PetSupplies.css';
import supplyImg from '../images/supply.jpeg'
import { useNavigate } from 'react-router-dom';
import { addCartItems } from './CartService';
import BuyerHeader from './BuyerHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PetSupplies = () => {
  const [supplies, setSupplies] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/supplies')
      .then(response => {
        setSupplies([...response.data]);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching supplies:", error);
        setError("Failed to load supplies. Please try again later.");
        setLoading(false);
      });
  }, []);

  const addToCart = (supply) => {
    const temp = { ...supply, type: 'Supply' };
    setCart([...cart, supply]);
    addCartItems([temp]);
    toast.success("Item added to cart successfully!");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <BuyerHeader />
      <Container fluid className="mt-4">
        <Row className="text-center mb-4">
          <Col>
            <h1>Pet Supplies</h1>
            <p>Discover high-quality supplies for your pets, from food to accessories.</p>
          </Col>
        </Row>

        <Row>
          {supplies.map(supply => (
            <Col md={4} className="mb-4" key={supply.supplyId}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={supply.image ? `data:image/jpeg;base64,${supply.image}` : supplyImg}
                  alt={supply.supplyName}
                  className="supply-image"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{supply.supplyName}</Card.Title>
                  <Card.Text>{supply.description}</Card.Text>
                  <Card.Text><strong>₹{supply.price.toFixed(2)}</strong></Card.Text>
                  
                  <Button
                    variant="primary"
                    className="mt-auto"
                    onClick={() => addToCart(supply)}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="colored"
      />
    </>
  );
};

export default PetSupplies;
