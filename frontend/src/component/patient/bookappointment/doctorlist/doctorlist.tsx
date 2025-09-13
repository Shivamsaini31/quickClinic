import React, { useState } from 'react';
import { Container, Card, Row, Col, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { api } from '../../../../utils/api';
import { format, isSameDay, parseISO } from 'date-fns';
import { FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Doctor {
  _id: string;
  user: {
    name: string;
    email: string;
    phoneNumber: string;
  };
  specialization: string;
  experience: number;
  fees: number;
}

interface DoctorCardProps {
  doctor: Doctor;
}

interface AvailableSlot {
  date: string;
  slots: string[];
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const [doctorSchedule, setDoctorSchedule] = useState<AvailableSlot[]>([]);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  
  const data2 = localStorage.getItem('authState');
  const parsedData = data2 ? JSON.parse(data2) : null;
  const id = parsedData?.user?._id;
  const navigate = useNavigate();

  const handleBookClick = async () => {
    try {
      const response = await axios.get(api.getUrl(`${id}/patient/appointment_bookings`), {
        params: { doc_id: doctor._id },
      });
     
      if (Array.isArray(response.data.availableSlots)) {
        setDoctorSchedule(response.data.availableSlots);
        setShowCalendar(!showCalendar);
      } else {
        setDoctorSchedule([]);
      }
    } catch (error) {
      console.log("appointment result");
      setDoctorSchedule([]);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const selectedSchedule = doctorSchedule.find((schedule) => schedule.date === formattedDate);
      setAvailableTimes(selectedSchedule ? selectedSchedule.slots : []);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
  };

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time before booking');
      return;
    }

    // Show the payment modal before proceeding
    setShowPaymentModal(true);
  };

  const handlePaymentChoice = async (mode: 'online' | 'offline') => {
    setShowPaymentModal(false);

    if (mode === 'online') {
      navigate('/payment-appointment');
    } else {
      // Validate required fields
      if (!selectedDate || !selectedTime || !doctor._id) {
        alert('Please select a date, time, and doctor before booking.');
        return;
      }

      const appointmentData = {
        date: selectedDate.toISOString().split('T')[0], // Convert Date to YYYY-MM-DD format
        time: selectedTime,
        paid: false, 
        doc_id: doctor._id,
      };
      console.log("Appointment data being sent:", appointmentData);
      console.log("User ID:", id);
        
      try {
        const response = await axios.post(api.getUrl(`${id}/patient/newappointment`), appointmentData);
        
        if (response.data.success) {
          alert(`Appointment booked on ${format(selectedDate!, 'yyyy-MM-dd')} at ${selectedTime}`);
          setShowCalendar(false);
        } else {
          alert("Failed to book appointment. Please try again.");
        }
      } catch (error) {
        alert("An error occurred while booking the appointment. Please try again.");
      }
    }
  };

  const filterDates = (date: Date) => {
    if (!Array.isArray(doctorSchedule)) return false;
    return doctorSchedule.some((schedule) => isSameDay(date, parseISO(schedule.date)));
  };

  return (
    <Container className="doctor-list-page">
      <Row className="justify-content-center">
        <Col md={4} lg={3} className="mb-4">
          <Card className="doctor-card bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Card.Body className="p-6">
              <Card.Title className="text-xl font-bold text-gray-800 mb-3">{doctor.user.name}</Card.Title>
              <Card.Text className="mb-2">
                <strong className="text-gray-600">Specialty:</strong> <span className="text-gray-800">{doctor.specialization}</span>
              </Card.Text>
              <Card.Text className="mb-2">
                <strong className="text-gray-600">Fees:</strong> <span className="text-gray-800">₹{doctor.fees}</span>
              </Card.Text>
              <Card.Text className="mb-2">
                <strong className="text-gray-600">Experience:</strong> <span className="text-gray-800">{doctor.experience} years</span>
              </Card.Text>
              <Card.Text className="mb-2">
                <strong className="text-gray-600">Email:</strong> <span className="text-gray-800">{doctor.user.email}</span>
              </Card.Text>
              <Card.Text className="mb-4">
                <strong className="text-gray-600">Phone:</strong> <span className="text-gray-800">{doctor.user.phoneNumber}</span>
              </Card.Text>
              <Button 
                variant="primary" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 transform hover:scale-105" 
                onClick={handleBookClick}
              >
                <FaCalendarAlt className="mr-2" /> Select Date
              </Button>

              {showCalendar && (
                <div className="calendar-container mt-4 p-4 bg-gray-50 rounded-lg">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy/MM/dd"
                    className="form-control w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    filterDate={filterDates}
                    placeholderText="Select a date"
                  />
                  {availableTimes.length > 0 && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Time:</label>
                      <select 
                        className="form-control w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        value={selectedTime} 
                        onChange={handleTimeChange}
                      >
                        <option value="">Select a time</option>
                        {availableTimes.map((time, index) => (
                          <option key={index} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <Button
                    variant="primary"
                    onClick={handleBookAppointment}
                    disabled={!selectedDate || !selectedTime}
                    className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                  >
                    Book Appointment
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Payment Modal */}
      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Payment Mode</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Button 
            variant="success" 
            onClick={() => handlePaymentChoice('online')} 
            className="me-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Pay Online
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => handlePaymentChoice('offline')}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Pay Offline
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default DoctorCard;
