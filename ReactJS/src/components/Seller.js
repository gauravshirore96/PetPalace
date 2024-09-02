import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AddProduct from './AddProduct';

import './Seller.css'; // Import the CSS file for styling

const Seller = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logic to clear any user session or token
    navigate('/login'); // Redirect to the Login page
  };

  return (
    <div className="seller-container">
      <header className="seller-header">
        <h1>Seller Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>

      <nav className="seller-nav">
        <ul>
          <li><Link to="add-product">Add Product</Link></li>
         
        </ul>
      </nav>

      <div className="seller-content">
        <Routes>
          <Route path="add-product" element={<AddProduct />} />
          
        </Routes>
      </div>
    </div>
  );
}

export default Seller;
