import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FindYourPet.css';
import BuyerHeader from './BuyerHeader';
import dogImg from '../images/defaultDog.jpeg';
import { addCartItems } from './CartService';

const FindYourPet = () => {
    const [pets, setPets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        priceRange: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/pets')
            .then(response => response.json())
            .then(data => setPets(data))
            .catch(error => console.error('Error fetching pets:', error));
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.value
        });
    };

    const handleBuy = (pet) => {
        const temp = { ...pet, type: 'Pet' };
        addCartItems([temp]);
        toast.success('Item added to cart successfully!');
        // navigate('/manage-cart');
    };

    const filteredPets = pets.filter(pet => {
        let match = true;
        if (searchTerm) {
            const type = pet?.petType?.petTypeName || '';
            match = match && type.toLowerCase().includes(searchTerm.toLowerCase());
        }
        if (filters.priceRange) {
            const price = pet.price || 0;
            match = match && price <= filters.priceRange;
        }
        return match;
    });

    return (
        <>
            <BuyerHeader /> {/* Add the header here */}
            <Container className="find-your-pet">
                <h2>Find Your Pet</h2>
                <div className="search-filter">
                    <InputGroup className="search">
                        <Form.Control
                            type="text"
                            placeholder="Search for pets..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="search-bar"
                        />
                    </InputGroup>
                    <Form.Select
                        name="priceRange"
                        value={filters.priceRange}
                        onChange={handleFilterChange}
                        className="range"
                    >
                        <option value="">All Price Ranges</option>
                        <option value="10000">Up to ₹10000</option>
                        <option value="15000">Up to ₹15000</option>
                        <option value="25000">Up to ₹25000</option>
                    </Form.Select>
                </div>
                <Row className="pet-grid">
                    {filteredPets.length > 0 ? (
                        filteredPets.map(pet => (
                            <Col md={4} key={pet.pet_id} className="mb-4">
                                <Card className="pet-card">
                                    <Card.Img
                                        variant="top"
                                        src={pet.image ?`data:image/jpeg;base64,${pet.image}` : dogImg}
                                        alt={pet.name}
                                        className="pet-image"
                                    />
                                    <Card.Body>
                                        <Card.Title>{pet.name}</Card.Title>
                                        <Card.Text>Breed: {pet.breed?.breedName}</Card.Text>
                                        <Card.Text>Gender: {pet.gender}</Card.Text>
                                        <Card.Text>Age: {pet.age}</Card.Text>
                                        <Card.Text>Price: ₹{pet.price}</Card.Text>
                                        <Card.Text>Description: {pet.description}</Card.Text>
                                        <Button variant="primary" onClick={() => handleBuy(pet)}>
                                            {pet.status === 'Available' ? 'Add to Cart' : 'Adopt'}
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>No pets found</p>
                    )}
                </Row>
            </Container>
            <ToastContainer /> {/* Add the ToastContainer here */}
        </>
    );
};

export default FindYourPet;
