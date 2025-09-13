import React from 'react';
import Card from '../../common/Card';
import url_to_doctor_image1 from '../../../images/1.jpg';
import url_to_doctor_image2 from '../../../images/2.jpg';
import url_to_doctor_image3 from '../../../images/3.jpg';
import ConsultationCard from './ConsultationCard';
import SpecialtyGrid from './SpecialtyGrid';
import menstrualcycle from '../../../images/mens.jpg';
import acne from '../../../images/acne.jpg';
import cold_cough from '../../../images/cold_cough.jpg';
import child_not from '../../../images/child.avif';
import depp from '../../../images/depp.jpg';
import dentist from '../../../images/oral.png';
import gynecologist from '../../../images/Gynecologist.jpg';
import nutrition from '../../../images/Nutrition.jpg';
import physiotherapist from '../../../images/Physiotherapist.jpg';
import { Link, useParams } from 'react-router-dom';

const PatientDashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const consultationOptions = [
    { title: 'Period doubts or Pregnancy', image: menstrualcycle },
    { title: 'Acne, pimple or skin issues', image: acne },
    { title: 'Cold, cough or fever', image: cold_cough },
    { title: 'Child not feeling well', image: child_not },
    { title: 'Depression or anxiety', image: depp },
  ];

  const specialties = [
    { title: 'Dentist', image: dentist },
    { title: 'Gynecologist/Obstetrician', image: gynecologist },
    { title: 'Dietitian/Nutrition', image: nutrition },
    { title: 'Physiotherapist', image: physiotherapist }
  ];

  return (
    <>
      <div className='app-container bg-gray-50 min-h-screen py-8'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <Card
                title="Find the best doctors in your vicinity"
                description="With the help of our intelligent algorithms, now locate the best doctors around your vicinity at total ease."
                imageUrl={url_to_doctor_image1}
                url="/doctors"
              />
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <Card
                title="Schedule appointments with expert doctors"
                description="Find experienced specialist doctors with expert ratings and reviews and book your appointments hassle-free."
                imageUrl={url_to_doctor_image2}
                url="/appointments"
              />
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <Card
                title="Book face-to-face appointments"
                description="Can't go to the hospital? Book video call appointments with your doctor within the app in a few minutes."
                imageUrl={url_to_doctor_image3}
                url="/video-appointments"
              />
            </div>
          </div>
          
          {/* Quick Actions Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to={`/patient/${id}/update_patient`}>
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold mb-2">Update Patient Info</h3>
                  <p className="text-blue-100 text-sm">Update your medical history, allergies, and medications</p>
                </div>
              </Link>
              
              <Link to={`/patient/dashboard/${id}/appointment`}>
                <div className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="text-4xl mb-4">📅</div>
                  <h3 className="text-xl font-semibold mb-2">Book Appointment</h3>
                  <p className="text-green-100 text-sm">Schedule a new appointment with a doctor</p>
                </div>
              </Link>
              
              <Link to={`/patient/dashboard/${id}/history`}>
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="text-4xl mb-4">📋</div>
                  <h3 className="text-xl font-semibold mb-2">Appointment History</h3>
                  <p className="text-purple-100 text-sm">View your past appointments</p>
                </div>
              </Link>
              
              <Link to={`/patient/dashboard/${id}/cancel/postpond`}>
                <div className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="text-4xl mb-4">🔄</div>
                  <h3 className="text-xl font-semibold mb-2">Manage Appointments</h3>
                  <p className="text-orange-100 text-sm">Cancel or reschedule appointments</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="app bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Consult top doctors online for any health concern
            </h1>
            <p className="text-xl text-gray-600">
              Private online consultations with verified doctors in all specialties
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
            {consultationOptions.map((option, index) => (
              <ConsultationCard key={index} title={option.title} image={option.image} />
            ))}
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Book an appointment for an in-clinic consultation
            </h2>
            <SpecialtyGrid specialties={specialties} />
          </div>
          
          <div className="text-center">
            <Link to={'/appointment/appointment.js'}>
              <button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg'>
                Consult Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientDashboard;
