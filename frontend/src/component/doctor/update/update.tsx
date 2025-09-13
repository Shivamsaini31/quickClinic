import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../../utils/api';
import { motion } from 'framer-motion';

const DoctorUpdatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    specialization: '',
    experience: '',
    fees: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<any>(null);

  // Load current doctor data
  useEffect(() => {
    const loadDoctorData = async () => {
      try {
        setInitialLoading(true);
        
        // Load user data from localStorage
        const authState = localStorage.getItem('authState');
        const authData = authState ? JSON.parse(authState) : null;
        setUserData(authData?.user);

        // Load doctor-specific data
        const response = await axios.get(api.getUrl(`${id}/doctor/get_doctor`));
        if (response.data.success && response.data.doctor) {
          const doctorData = response.data.doctor;
          setFormData({
            specialization: doctorData.specialization || '',
            experience: doctorData.experience?.toString() || '',
            fees: doctorData.fees?.toString() || ''
          });
        }
      } catch (error) {
        console.error('Error loading doctor data:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    if (id) {
      loadDoctorData();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(api.getUrl(`${id}/doctor/update_doctor`), formData);
      if (response.data.success) {
        alert('Doctor information updated successfully!');
        setFormData({ specialization: '', experience: '', fees: '' });
      }
    } catch (error) {
      console.error('Error updating doctor information:', error);
      alert('Error updating doctor information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const specialties = [
    'Cardiologist',
    'Dermatologist',
    'Neurologist',
    'Orthopedist',
    'Pediatrician',
    'Psychiatrist',
    'Gynecologist',
    'General Physician',
    'Ophthalmologist',
    'ENT Specialist'
  ];

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading doctor information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
            <h1 className="text-3xl font-bold text-center mb-2">Update Doctor Information</h1>
            <p className="text-center text-blue-100">Keep your profile and professional details up to date</p>
          </div>

          <div className="p-8">
            {/* User Information Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="mr-2">👤</span>
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-lg text-gray-900">{userData?.name || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-lg text-gray-900">{userData?.email || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <p className="text-lg text-gray-900">{userData?.phoneNumber || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <p className="text-lg text-gray-900">{userData?.city && userData?.state ? `${userData.city}, ${userData.state}` : 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="mr-2">🏥</span>
                Professional Information
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">
                      Specialization *
                    </label>
                    <select
                      id="specialization"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                      required
                    >
                      <option value="">Select Specialization</option>
                      {specialties.map((specialty) => (
                        <option key={specialty} value={specialty}>
                          {specialty}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                      Experience (Years) *
                    </label>
                    <input
                      type="number"
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                      placeholder="Enter years of experience"
                      min="0"
                      max="50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="fees" className="block text-sm font-medium text-gray-700 mb-2">
                    Consultation Fees (₹) *
                  </label>
                  <input
                    type="number"
                    id="fees"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    placeholder="Enter consultation fees"
                    min="0"
                    step="50"
                    required
                  />
                </div>

                <div className="text-center pt-6">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-12 rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Updating...
                      </div>
                    ) : (
                      'Update Professional Information'
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorUpdatePage;
