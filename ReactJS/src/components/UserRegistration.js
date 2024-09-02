import React, { useState } from "react";
import axios from "axios";
import SuccessToast from './Toaster';
import './UserRegistration.css';
import Header from "./Header";

const UserRegistration = () => {
  const [user, setUser] = useState({
    userId: "",
    userType: "buyer",
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    contact: "",
    aadharNumber: ""
  });

  const [showToast, setShowToast] = useState(false);
  const [isError, setError] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
  
    if (!user.username) errors.username = "Username is required";
    else if (user.username.length < 3) errors.username = "Username must be at least 3 characters long";
  
    if (!user.email) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) errors.email = "Email is not valid";
  
    if (!user.password) errors.password = "Password is required";
    else if (user.password.length < 8) errors.password = "Password must be at least 8 characters long";
    
    if (!user.firstName) errors.firstName = "First Name is required";
    
    if (!user.lastName) errors.lastName = "Last Name is required";
    
    if (!user.address) errors.address = "Address is required";
    
    if (!user.contact) errors.contact = "Contact number is required";
    else if (!/^\d{10}$/.test(user.contact)) errors.contact = "Contact number must be 10 digits";
  
    if (!user.aadharNumber) errors.aadharNumber = "Aadhar number is required";
    else if (!/^\d{12}$/.test(user.aadharNumber)) errors.aadharNumber = "Aadhar number must be 12 digits";
  
    return errors;
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
 
      const payload = {
        "username": user.username,
        "email": user.email,
        "passwordHash": user.password,
        "roleId": user.userType === 'buyer' ? 1 : 2,
        "status": true,
        "createdAt": new Date().toISOString(),
        "updatedAt": new Date().toISOString(),
        "firstName": user.firstName,
        "lastName": user.lastName,
        "address": user.address,
        "contact": user.contact,
        "aadharNumber": user.aadharNumber,
      };
      
      const userResponse = await axios.post("https://localhost:7145/api/Users/SaveUser", payload);

      setShowToast(true);
      setError(false);
    } catch (error) { 
      setError(true);
      setShowToast(true);
      console.error("There was an error registering the user!", error);
    }
  };

  return (
    <div>
      <Header/>
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>User Registration</h2>
       
        <div className="row">
          <div className="col-md-6 left-column">
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={user.username}
                onChange={handleChange}
                required
              />
              {errors.username && <small className="text-danger">{errors.username}</small>}
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={user.email}
                onChange={handleChange}
                required
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={user.password}
                onChange={handleChange}
                required
              />
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                value={user.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
            </div>
          </div>

          <div className="col-md-6 right-column">
            <div className="form-group ">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                value={user.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
            </div>
            <div className="form-group address-container">
              <label>Address:</label>
              <textarea
                name="address"
                className="form-control"
                value={user.address}
                onChange={handleChange}
                required
              />
              {errors.address && <small className="text-danger">{errors.address}</small>}
            </div>
            <div className="form-group">
              <label>Contact:</label>
              <input
                type="text"
                name="contact"
                className="form-control"
                value={user.contact}
                onChange={handleChange}
                required
              />
              {errors.contact && <small className="text-danger">{errors.contact}</small>}
            </div>
            <div className="form-group">
              <label>Aadhar Number:</label>
              <input
                type="text"
                name="aadharNumber"
                className="form-control"
                value={user.aadharNumber}
                onChange={handleChange}
                required
              />
              {errors.aadharNumber && <small className="text-danger">{errors.aadharNumber}</small>}
            </div>
            
          </div>

          <div className="col-md-12 role-container">
          <div className="form-group">
              <span>Role: </span>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="buyer"
                  checked={user.userType === 'buyer'}
                  onChange={handleChange}
                />
                Buyer
              </label>
              <label>
                <input
                  type="radio"
                  value="seller"
                  name="userType"
                  checked={user.userType === 'seller'}
                  onChange={handleChange}
                />
                Seller
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" >Register {user.userType}</button>
      </form>
    
      <SuccessToast message={isError ? 'User registration failed' : 'User registered successfully!'} show={showToast} setShow={setShowToast} />
    </div>
    </div>
  );
};

export default UserRegistration;
