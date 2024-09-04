import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarCheck, FaCalendarTimes } from 'react-icons/fa';
import { Button, Card, CardContent, Typography, Container, Grid } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './cancel_postpond.css'; // Import custom CSS
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns'; // Import date-fns for formatting

const AppointmentActions = () => {
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newDate, setNewDate] = useState(null);
  const [newTime, setNewTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch appointments
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/${id}/patient/appointment_future`);
      console.log("API Response:", response.data); // Check the API response structure
      setAppointments(response.data.appointments || []);
    } catch (error) {
      setError('Error fetching appointments');
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAppointments();
    }
  }, [id]);

  // Debugging logs
  useEffect(() => {
    console.log("Appointments state updated:", appointments);
  }, [appointments]);

  // Sorting appointments by date and time
  const sortedAppointments = appointments
    .map(appointment => ({
      ...appointment,
      date: format(parseISO(appointment.date), 'd MMM yyyy') // Formatting date
    }))
    .sort((a, b) => {
      // Convert formatted date back to Date object for comparison
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      const dateComparison = dateA - dateB;
      if (dateComparison !== 0) return dateComparison;

      // Handle cases where time might be missing
      const timeA = a.time || '00:00'; // Default to earliest time
      const timeB = b.time || '00:00'; // Default to earliest time

      // Compare times
      return timeA.localeCompare(timeB);
    });

  const handlePostponeClick = (appointmentId) => {
    setSelectedAppointment(selectedAppointment === appointmentId ? null : appointmentId);
  };

  const handlePostpone = async () => {
    // Implement postponing logic
  };

  const handleCancel = async (appointmentId) => {
    // Implement canceling logic
  };

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container className="appointment-actions-container">
      <Grid container spacing={3}>
        {sortedAppointments.length > 0 ? (
          sortedAppointments.map((appointment, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card className="appointment-card">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Doctor: {appointment.doc_name || 'Unknown'}
                  </Typography>
                  <Typography variant="body1">Date: {appointment.date}</Typography>
                  <Typography variant="body1">Time: {appointment.time || 'Not specified'}</Typography>
                  <Typography variant="body1">Specialty: {appointment.specialty || 'Unknown'}</Typography>
                  <Typography variant="body1">City: {appointment.city || 'Unknown'}</Typography>
                  <div className="button-container">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<FaCalendarCheck />}
                      onClick={() => handlePostponeClick(appointment._id)}
                      className="action-button postpone-button"
                    >
                      Postpone
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<FaCalendarTimes />}
                      onClick={() => handleCancel(appointment._id)}
                      className="action-button cancel-button"
                    >
                      Cancel
                    </Button>
                  </div>
                  {selectedAppointment === appointment._id && (
                    <div className="date-picker-container">
                      <DatePicker
                        selected={newDate}
                        onChange={(date) => setNewDate(date)}
                        dateFormat="yyyy/MM/dd"
                        className="date-picker"
                        minDate={new Date()}
                        placeholderText="Select a new date"
                      />
                      <input
                        type="time"
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                        className="time-picker"
                      />
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handlePostpone}
                        className="submit-button"
                      >
                        Submit
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center">
            No upcoming appointments.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default AppointmentActions;
