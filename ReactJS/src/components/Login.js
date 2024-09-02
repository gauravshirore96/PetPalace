import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import custom CSS
import Header from './Header';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const loginData = {
            Username: username,
            Password: password
        };

        try {
            const response = await axios.post('https://localhost:7145/api/Users/VerifyLogin', loginData);
            
            if (response.data) {
                // Check the role ID and navigate accordingly
                if (response.data.roleId === 3) {
                    setSuccess('Admin login successful!');
                    navigate('/admin'); // Redirect to the Admin page
                } else if (response.data.roleId === 2) {
                    setSuccess('Seller login successful!');
                    navigate('/seller'); // Redirect to the Seller page
                } else if (response.data.roleId === 1) {
                    setSuccess('Buyer login successful!');
                    navigate('/buyer'); // Redirect to the Buyer page
                } else {
                    setError('You do not have access to this dashboard.');
                }
            } else {
                setError('Invalid username or password.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <Header/>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                </form>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {success && <div className="alert alert-success mt-3">{success}</div>}
                
                <div className="mt-3">
                    <span>Don't have an account? </span>
                    <Link to="/register" className="btn btn-secondary">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
