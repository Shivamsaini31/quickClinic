import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, IconButton, CircularProgress } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';

const initialSchedule = {
  morning: [],
  evening: []
};

const DoctorSchedulePage = () => {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [selectedDay, setSelectedDay] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const id=JSON.parse(localStorage.getItem('authState')).user._id;
  // Fetch the schedule for the selected day
  const fetchSchedule = async (day) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/doctor/schedule/${id}/${day}`);
      setSchedule(response.data.schedule || initialSchedule); // Update state with existing schedule
    } catch (error) {
      console.error('Error fetching schedule:', error.message);
      setError('Failed to fetch schedule. Please try again.');
    }
  };

  // Handle day selection
  const handleDayChange = (e) => {
    const day = e.target.value;
    setSelectedDay(day);
    fetchSchedule(day); // Fetch schedule when day is selected
  };

  // Handle time slot change
  const handleTimeSlotChange = (timeSlot, index, type, e) => {
    const newSchedule = { ...schedule };
    newSchedule[type][index][timeSlot] = e.target.value;
    setSchedule(newSchedule);
  };

  // Add time slot
  const handleAddSlot = (type) => {
    const newSchedule = { ...schedule };
    newSchedule[type].push({ startTime: '', endTime: '' });
    setSchedule(newSchedule);
  };

  // Remove time slot
  const handleRemoveSlot = (index, type) => {
    const newSchedule = { ...schedule };
    newSchedule[type].splice(index, 1);
    setSchedule(newSchedule);
  };

  // Handle submit
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/api/v1/doctor/update_schedule', { schedule, day: selectedDay });
      // Handle success response
    } catch (error) {
      console.error('Error updating schedule:', error.message);
      setError('Failed to update schedule. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 3,
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Typography variant="h4" sx={{ marginBottom: 3, color: '#2e7d32' }}>
        Update Doctor's Schedule
      </Typography>
      <FormControl fullWidth variant="outlined" sx={{ marginBottom: 3 }}>
        <InputLabel id="day-select-label">Select Day</InputLabel>
        <Select
          labelId="day-select-label"
          value={selectedDay}
          onChange={handleDayChange}
          label="Select Day"
        >
          <MenuItem value="Monday">Monday</MenuItem>
          <MenuItem value="Tuesday">Tuesday</MenuItem>
          <MenuItem value="Wednesday">Wednesday</MenuItem>
          <MenuItem value="Thursday">Thursday</MenuItem>
          <MenuItem value="Friday">Friday</MenuItem>
          <MenuItem value="Saturday">Saturday</MenuItem>
          <MenuItem value="Sunday">Sunday</MenuItem>
        </Select>
      </FormControl>
      {['morning', 'evening'].map((type) => (
        <Box key={type} sx={{ width: '100%', maxWidth: 600, marginBottom: 4 }}>
          <Typography variant="h6" sx={{ marginBottom: 2, color: '#2e7d32' }}>
            {type.charAt(0).toUpperCase() + type.slice(1)} Slots
          </Typography>
          {schedule[type].map((slot, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <TextField
                fullWidth
                label="Start Time"
                variant="outlined"
                type="time"
                value={slot.startTime}
                onChange={(e) => handleTimeSlotChange('startTime', index, type, e)}
                sx={{ marginRight: 1 }}
              />
              <TextField
                fullWidth
                label="End Time"
                variant="outlined"
                type="time"
                value={slot.endTime}
                onChange={(e) => handleTimeSlotChange('endTime', index, type, e)}
                sx={{ marginRight: 1 }}
              />
              <IconButton onClick={() => handleRemoveSlot(index, type)} color="error">
                <Delete />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Add />}
            onClick={() => handleAddSlot(type)}
          >
            Add Slot
          </Button>
        </Box>
      ))}
      <Button
        variant="contained"
        color="success"
        onClick={handleSubmit}
        disabled={loading}
        sx={{ marginTop: 3 }}
        component={motion.button}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Save Schedule
      </Button>
      {loading && <CircularProgress sx={{ display: 'block', marginTop: 3 }} />}
      {error && (
        <Typography variant="body2" sx={{ color: 'red', marginTop: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default DoctorSchedulePage;
