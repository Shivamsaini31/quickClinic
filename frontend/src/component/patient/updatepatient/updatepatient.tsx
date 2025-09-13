import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { api } from '../../../utils/api';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-2xl p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Enter Patient Information
            </h1>
            <p className="text-gray-600 text-lg">
              Please provide your medical information to help us serve you better
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="medicalHistory" className="block text-sm font-semibold text-gray-700 mb-2">
                Medical History
              </label>
              <textarea
                id="medicalHistory"
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-300 resize-none"
                rows={4}
                placeholder="Please describe any previous medical conditions, surgeries, or treatments..."
              />
            </div>
            
            <div>
              <label htmlFor="allergies" className="block text-sm font-semibold text-gray-700 mb-2">
                Allergies
              </label>
              <textarea
                id="allergies"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-300 resize-none"
                rows={2}
                placeholder="Please list any known allergies to medications, foods, or other substances..."
              />
            </div>
            
            <div>
              <label htmlFor="currentMedications" className="block text-sm font-semibold text-gray-700 mb-2">
                Current Medications
              </label>
              <textarea
                id="currentMedications"
                value={currentMedications}
                onChange={(e) => setCurrentMedications(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-300 resize-none"
                rows={2}
                placeholder="Please list all current medications, including dosages and frequency..."
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center pt-4"
            >
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Submit
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PatientForm;