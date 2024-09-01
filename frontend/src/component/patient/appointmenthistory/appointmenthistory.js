import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './appointmenthistory.css'; // Import custom CSS

const AppointmentHistory = () => {
  const { id } = useParams();

  // Define individual state for each filter field
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [city, setCity] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [docName, setDocName] = useState('');
  const [appointments, setAppointments] = useState([]);

  // Fetch usual appointments from the backend
  const fetchUsualAppointments = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/${id}/patient/usualhistory`);
      const data = response.data.appointments;
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching usual appointments:', error);
    }
  }, [id]);

  // Fetch search results from the backend with filters
  const handleSearch = async () => {
    console.log(endDate);
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/${id}/patient/specifichistory`, {
        params: {
          startDate,
          endDate,
          startTime,
          endTime,
          city,
          specialty: specialist,
          doc_name: docName
        }
      });
      const data = response.data.appointments;
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // Fetch usual appointments on component mount
  useEffect(() => {
    fetchUsualAppointments();
  }, [fetchUsualAppointments]);

  // Handlers for input changes
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);
  const handleStartTimeChange = (e) => setStartTime(e.target.value);
  const handleEndTimeChange = (e) => setEndTime(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handleSpecialistChange = (e) => setSpecialist(e.target.value);
  const handleDocNameChange = (e) => setDocName(e.target.value);

  return (
    <div className="appointment-history-container">
      <div className="search-card">
        <h2 className="search-title">Search Appointments</h2>
        <div className="filter-form">
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={handleStartDateChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={handleEndDateChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="startTime">Start Time:</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={startTime}
              onChange={handleStartTimeChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="endTime">End Time:</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={endTime}
              onChange={handleEndTimeChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={handleCityChange}
              placeholder="City"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="specialist">Specialist:</label>
            <input
              type="text"
              id="specialist"
              name="specialist"
              value={specialist}
              onChange={handleSpecialistChange}
              placeholder="Specialist"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="doctorName">Doctor Name:</label>
            <input
              type="text"
              id="doctorName"
              name="doctorName"
              value={docName}
              onChange={handleDocNameChange}
              placeholder="Doctor Name"
              className="form-input"
            />
          </div>
          <button onClick={handleSearch} className="search-button">Apply Filters</button>
        </div>
      </div>
      <div className="appointment-list">
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment._id} className="appointment-item">
              <p><strong>Doctor:</strong> {appointment.doc_name}</p>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
              <p><strong>Speciality:</strong> {appointment.specialty}</p>
              <p><strong>City:</strong> {appointment.city}</p>
              <p><strong>Specialist:</strong> {appointment.specialist}</p>
              <p><strong>Doctor-Phone:</strong> {appointment.doc_phone}</p>
              <p><strong>Doctor-Email:</strong> {appointment.doc_email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentHistory;
