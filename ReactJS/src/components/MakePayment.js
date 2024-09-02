import React, { useState } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BuyerHeader from './BuyerHeader';

const MakePayment = () => {
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        setPaymentDetails({
            ...paymentDetails,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Implement payment logic here
        alert('Payment processed successfully!');
        navigate('/'); // Redirect to home or any other page after payment
    };

    return (
        <>
    <BuyerHeader />
        <Container>
            <h2>Make Payment</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Card Number</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="cardNumber"
                            value={paymentDetails.cardNumber}
                            onChange={handleChange}
                            placeholder="Enter your card number"
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Expiry Date</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="expiryDate"
                            value={paymentDetails.expiryDate}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>CVV</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="cvv"
                            value={paymentDetails.cvv}
                            onChange={handleChange}
                            placeholder="Enter CVV"
                            required
                        />
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit">Pay Now</Button>
            </Form>
        </Container>
        </>
    );
};

export default MakePayment;
