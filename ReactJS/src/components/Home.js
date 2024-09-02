import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Navbar, Nav } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer'; // Adjust the path if necessary
import './Home.css'

import petImage from '../images/pet-home.jpg'

const CoverImage = () => {
  const divStyle = {
    width: '100%', // Set the desired width
    height: '680px', // Set the desired height
    backgroundImage: `url(${petImage})`,
    backgroundSize: 'cover', // Adjusts the image to cover the div
    backgroundPosition: 'center', // Centers the image
  };
  return (<div style={divStyle}>
    <div className='title'>
      <h1>Welcome to Pet Palace</h1>
      <p>Your one-stop destination for all things pets!</p>
    </div>
  </div>)
}

const Home = () => {
  return (
    <>
      <Header />


      {/* Main Content */}
      <CoverImage />



    </>
  );
};

export default Home;
