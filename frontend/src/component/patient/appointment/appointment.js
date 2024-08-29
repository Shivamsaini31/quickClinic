// BookingPage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';
import './appointment.css'; // Custom CSS for animations and styling
import axios from 'axios';
import DoctorCard from './doctorlist/doctorlist'; // Import the DoctorCard component

const BookingPage = () => {
  const [countryId, setCountryId] = useState(0);
  const [stateId, setStateId] = useState(0);
  const [city, setCityId] = useState(''); // Initialize city as an empty string to store the city name
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [pincode, setPincode] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [doctors, setDoctors] = useState([]); // Initialize doctors state to store fetched data
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Construct the query string
      const query = new URLSearchParams({
        specialty,
        city
      }).toString();
  
      // Send the GET request with query parameters
      const { data } = await axios.get(`http://localhost:5000/api/v1/${id}/doctorwithspeciality?${query}`);
      console.log(data);
      // Update doctors state with fetched data
      setDoctors(data.alldocs);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  // Example specialties
  const specialties = [
    'Cardiologist',
  ];

  const getDynamicPadding = () => {
    return doctors.length > 3 ? { paddingBottom: '100px' } : { paddingBottom: '50px' };
  };
  
  return (
    <div className="page-container"style={getDynamicPadding()}>
      <h1 className="heading">Book an Appointment</h1>
      <div className="animated-form">
        <h6>Country</h6>
        <CountrySelect
          onChange={(e) => setCountryId(e.id)}
          placeHolder="Select Country"
          required
        />

        <h6>State</h6>
        <StateSelect
          countryid={countryId}
          onChange={(e) => setStateId(e.id)}
          placeHolder="Select State"
          required
        />

        <h6>City</h6>
        <CitySelect
          countryid={countryId}
          stateid={stateId}
          onChange={(e) => setCityId(e.name)} // Set city as name
          placeHolder="Select City"
          required
        />

        <h6>Pincode</h6>
        <input
          type="number"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="animated-input"
          placeholder="Enter Pincode"
          min="0" // Ensure pincode is non-negative
          required
        />

        <h6>Specialty</h6>
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="animated-input"
          required
        >
          <option value="" disabled>Select Specialty</option>
          {specialties.map((spec, index) => (
            <option key={index} value={spec}>
              {spec}
            </option>
          ))}
        </select>

        <h6>Date</h6>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="animated-input"
          required
        />

        <h6>Time</h6>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="animated-input"
          required
        />

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-100 animated-button"
        >
          Find Doctors
        </button>
      </div>

      {/* Render DoctorCard components */}
      <div className="doctor-cards-container">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
