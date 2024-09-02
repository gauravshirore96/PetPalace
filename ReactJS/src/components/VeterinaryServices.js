import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VeterinaryServices.css';
import Header from './Header';

const VeterinaryServices = () => {
  const [filteredClinics, setFilteredClinics] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [clinics, setClinics] = useState([]);
  const [error, setError] = useState('');

  // Fetch the list of cities when the component mounts
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:8080/clinics');
        console.log('Cities fetched:', response.data); // Debugging
        setClinics(response.data);
        setFilteredClinics(response.data)
      } catch (err) {
        console.error('Error fetching cities:', err);
        setError('Failed to fetch cities. Please try again later.');
      }
    };
    fetchCities();
  }, []);

  // Search clinics by city name
  const handleSearch = async () => {
    console.log('Search Query:', searchQuery); // Debugging
    const filteredClinics = searchQuery ? clinics.filter(clinic => searchQuery.toLowerCase().includes(clinic.city?.cityName?.toLowerCase())) : [...clinics];
    setFilteredClinics(filteredClinics)
  };

  return (
    <>
    <Header/>
     
    <div className="veterinary-services">
      <h1>Veterinary Services Search</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} >Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {filteredClinics.length > 0 ? (
        <ul className="clinic-list">
          {filteredClinics.map((clinic) => (
            <li key={clinic.clinicId} className="clinic-item">
              <h2>{clinic.name}</h2>
              <p>{clinic.address}</p>
              <p>Contact: {clinic.contactNumber}</p>
              <p>Description: {clinic.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        searchQuery && !error && <p>No clinics found for the selected city.</p>
      )}
    </div>
    </>
  );
};

export default VeterinaryServices;
