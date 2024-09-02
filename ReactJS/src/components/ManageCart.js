import React, { useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getCartItems, setCartItems as setCartItemsService } from './CartService';
import BuyerHeader from './BuyerHeader';

const ManageCart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(getCartItems() || []);

    const handleRemoveItem = (index) => {
        const updatedCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCartItems);
        setCartItemsService(updatedCartItems);
    };

    const handleCheckout = () => {
        navigate('/make-payment');
    };

    const isPet = (item) => item.type === "Pet";

    return (
        <div>
            <BuyerHeader cartCount={cartItems.length} />
            <Container>
                <h2>Your Cart</h2>
                {cartItems.length > 0 ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Breed/Category</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{isPet(item) ? item.name : item.supplyName}</td>
                                    <td>{isPet(item) ? 'Pet' : 'Supply'}</td>
                                    <td>{isPet(item) ? item.breed?.breedName : item.category?.categoryName}</td>
                                    <td>₹{item.price}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => handleRemoveItem(index)}>
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>Your cart is empty</p>
                )}
                {cartItems.length > 0 && (
                    <Button variant="success" onClick={handleCheckout}>
                        Checkout
                    </Button>
                )}
            </Container>
        </div>
    );
};

export default ManageCart;
