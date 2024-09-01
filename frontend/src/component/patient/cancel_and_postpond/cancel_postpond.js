import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarCheck, FaCalendarTimes } from 'react-icons/fa';
import { Button, Card, CardContent, Typography, Container, Grid } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './cancel_postpond.css'; // Import custom CSS
import { useParams } from 'react-router-dom';

const AppointmentActions = () => {
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newDate, setNewDate] = useState(null);
  const [newTime, setNewTime] = useState('');
  const currentDate = new Date();

// Create a new date object for the date two months from now
const futureDate = new Date();
futureDate.setMonth(currentDate.getMonth() + 2);
  // Fetch appointments from the backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/${id}/patient/appointment_future`);
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [id]);

  const handlePostponeClick = (appointmentId) => {
    setSelectedAppointment(selectedAppointment === appointmentId ? null : appointmentId);
  };

  const handlePostpone = async () => {
    



  };

  const handleCancel = async (appointmentId) => {
    // Implement the functionality to cancel the appointment
  };

  return (
    <Container className="appointment-actions-container">
      <Grid container spacing={3}>
        {appointments.map((appointment) => (
          <Grid item xs={12} md={6} lg={4} key={appointment._id}>
            <Card className="appointment-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Doctor: {appointment.doc_name}
                </Typography>
                <Typography variant="body1">
                  Date: {appointment.date}
                </Typography>
                <Typography variant="body1">
                  Time: {appointment.time}
                </Typography>
                <Typography variant="body1">
                  Specialty: {appointment.specialty}
                </Typography>
                <Typography variant="body1">
                  City: {appointment.city}
                </Typography>
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
                      minDate={currentDate}
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
        ))}
      </Grid>
    </Container>
  );
};

export default AppointmentActions;
