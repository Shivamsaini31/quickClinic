import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, TextField, Typography, Container, Paper } from '@mui/material';
import axios from 'axios';
import { api } from '../../../utils/api';
import { useParams } from 'react-router-dom';

const PatientForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [medicalHistory, setMedicalHistory] = useState<string>('');
  const [allergies, setAllergies] = useState<string>('');
  const [currentMedications, setCurrentMedications] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(api.getUrl(`${id}/patient/create_patient`), {
        medicalHistory,
        allergies,
        currentMedications,
      });
      const data2 = localStorage.getItem('authState');
      if (data2) {
        const parsedData = JSON.parse(data2);
        parsedData.success = true;
        localStorage.setItem('authState', JSON.stringify(parsedData));
      }

      console.log('Patient information submitted:', response.data);
      alert('Patient information submitted successfully!');
      // Reset form fields or handle success response
      setMedicalHistory('');
      setAllergies('');
      setCurrentMedications('');
    } catch (error) {
      console.error('Error submitting patient information:', error);
      alert('Error submitting patient information. Please try again.');
    }
  };

  return (
    <Container className="patient-form-container max-w-2xl mx-auto py-12" maxWidth="sm">
      <Paper className="patient-form-paper bg-white rounded-lg shadow-xl p-8" elevation={3}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="patient-form-header text-center mb-8">
          <Typography variant="h4" component="h1" className="patient-form-title text-3xl font-bold text-gray-800">
            Enter Patient Information
          </Typography>
          <Typography variant="body1" className="text-gray-600 mt-2">
            Please provide your medical information to help us serve you better
          </Typography>
          </div>
        </motion.div>
        <form onSubmit={handleSubmit} className="patient-form space-y-6">
          <TextField
            label="Medical History"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
            className="patient-form-field w-full"
            placeholder="Please describe any previous medical conditions, surgeries, or treatments..."
          />
          <TextField
            label="Allergies"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            margin="normal"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="patient-form-field w-full"
            placeholder="Please list any known allergies to medications, foods, or other substances..."
          />
          <TextField
            label="Current Medications"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            margin="normal"
            value={currentMedications}
            onChange={(e) => setCurrentMedications(e.target.value)}
            className="patient-form-field w-full"
            placeholder="Please list all current medications, including dosages and frequency..."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="patient-form-button text-center">
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Submit Patient Information
            </Button>
            </div>
          </motion.div>
        </form>
      </Paper>
    </Container>
  );
};

export default PatientForm;
