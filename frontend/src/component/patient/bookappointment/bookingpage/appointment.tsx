import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';
import axios from 'axios';
import { api } from '../../../../utils/api';
import DoctorCard from '../doctorlist/doctorlist';
import appointment from '../../../../images/appointment1.jpg';

interface Doctor {
  _id: string;
  user: {
    name: string;
    email: string;
    phoneNumber: string;
    city: string;
    state: string;
  };
  specialization: string;
  experience: number;
  fees: number;
}

const BookingPage: React.FC = () => {
  // State and parameters
  const defaultCountryId = 101; // India's ID according to the react-country-state-city library
  const [countryId, setCountryId] = useState<number>(defaultCountryId);
  const [stateId, setStateId] = useState<number>(0);
  const [city, setCityId] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [specialty, setSpecialty] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  const [fees, setFees] = useState<string>('');
  const [doctorName, setDoctorName] = useState<string>('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const { id } = useParams<{ id: string }>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(api.getUrl(`${id}/patient/specific_doctors`), {
        params: {
          state,
          city,
          fees,
          experience,
          doc_name: doctorName,
          specialty
        }
      });
    console.log("data is here", data);

      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const specialties = ['Cardiologist', 'Dermatologist', 'Neurologist', 'Orthopedist', 'Pediatrician', 'Psychiatrist', 'Gynecologist', 'General Physician'];

  const getDynamicPadding = () => {
    const cardHeight = 200; // Approximate height of each doctor card
    const containerPadding = 50; // Base padding to avoid collision with the footer

    // Ensure doctors is an array and has a length property
    const numberOfDoctors = Array.isArray(doctors) ? doctors.length : 0;
    const extraPadding = numberOfDoctors > 3 ? (numberOfDoctors - 3) * cardHeight : 0;

    return { paddingBottom: `${containerPadding + extraPadding}px` };
  };

  return (
    <div className="flex justify-center items-center flex-col min-h-screen bg-gray-50" style={getDynamicPadding()}>
      <h1 className="text-4xl font-bold text-gray-800 mt-8 mb-8">Book an Appointment</h1>
      <div className="flex gap-36 max-w-7xl mx-auto px-4">
        <div className="animated-form bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          {/* Form Fields */}
          <h6 className="text-sm font-medium text-gray-700 mb-2">Country</h6>
          <CountrySelect
            defaultValue={{ isoCode: 'IN', name: 'India' }}
            onChange={(e: any) => setCountryId(e.id)}
            placeHolder="Select Country"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <h6 className="text-sm font-medium text-gray-700 mb-2 mt-4">State</h6>
          <StateSelect
            countryid={countryId}
            onChange={(e: any) => {
              setStateId(e.id);
              setState(e.value); // Assuming 'e.value' contains the state name
            }}
            placeHolder="Select State"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <h6 className="text-sm font-medium text-gray-700 mb-2 mt-4">City</h6>
          <CitySelect
            countryid={countryId}
            stateid={stateId}
            onChange={(e: any) => setCityId(e.name)}
            placeHolder="Select City"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <h6 className="text-sm font-medium text-gray-700 mb-2 mt-4">Specialty</h6>
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="animated-input w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="" disabled>
              Select Specialty
            </option>
            {specialties.map((spec, index) => (
              <option key={index} value={spec}>
                {spec}
              </option>
            ))}
          </select>

          <h6 className="text-sm font-medium text-gray-700 mb-2 mt-4">Experience (Years)</h6>
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="animated-input w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter Experience"
            min="0"
            required
          />

          <h6 className="text-sm font-medium text-gray-700 mb-2 mt-4">Fees</h6>
          <input
            type="number"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            className="animated-input w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter Fees"
            min="0"
            required
          />

          <h6 className="text-sm font-medium text-gray-700 mb-2 mt-4">Doctor's Name</h6>
          <input
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            className="animated-input w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter Doctor's Name"
            required
          />

          <button 
            type="submit" 
            onClick={handleSubmit} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-300 transform hover:scale-105 mt-6"
          >
            Find Doctors
          </button>
        </div>
        <div className='flex justify-center items-center'>
          <img 
            src={appointment} 
            className='rounded-3xl shadow-2xl max-w-md w-full h-auto' 
            alt='Appointment booking illustration' 
          />
        </div>
      </div>

      {/* Render DoctorCard components */}
      <div className="doctor-cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-7xl mx-auto px-4">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
