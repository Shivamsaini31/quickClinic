import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaCalendarCheck, FaCalendarTimes } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import { format, parseISO, isSameDay } from 'date-fns';
import { api } from '../../../utils/api';

interface Doctor {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    city: string;
    state: string;
    pincode: string;
  };
  specialization: string;
  experience: number;
  fees: number;
}

interface Appointment {
  _id: string;
  doctor: Doctor;
  patient: string;
  date: string;
  time: string;
  fees: number;
  paid: boolean;
  appointmentNumber: string;
  status: 'Scheduled' | 'Completed' | 'Canceled' | 'Postponed';
  __v: number;
}

interface ScheduleSlot {
  date: string;
  slots: string[];
}

const AppointmentActions = () => {
  const { id } = useParams<{ id: string }>();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [newDate, setNewDate] = useState<Date | null>(null);
  const [newTime, setNewTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [doctorSchedule, setDoctorSchedule] = useState<ScheduleSlot[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(api.getUrl(`${id}/patient/appointment_future`));
      setAppointments(response.data.appointments || []);
    } catch (error) {
      setError('Error fetching appointments');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchAppointments();
    }
  }, [id, fetchAppointments]);

  const sortedAppointments = appointments
    .map(appointment => ({
      ...appointment,
      formattedDate: format(parseISO(appointment.date), 'd MMM yyyy'),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handlePostponeClick = async (appointmentId: string, doc_id: string) => {
    setSelectedAppointment(selectedAppointment === appointmentId ? null : appointmentId);

    try {
      const response = await axios.get(api.getUrl(`${id}/patient/appointment_bookings`), {
        params: { doc_id },
      });
    
      // Ensure that the response is an array
      if (Array.isArray(response.data.availableSlots)) {
        setDoctorSchedule(response.data.availableSlots);
      } else {
        setDoctorSchedule([]);
      }
    } catch (error) {
      setDoctorSchedule([]);
    }
  };

  useEffect(() => {
    if (newDate) {
      const selectedDateString = format(newDate, 'yyyy-MM-dd');
      const selectedSchedule = doctorSchedule.find(schedule => schedule.date === selectedDateString);
      setAvailableTimes(selectedSchedule ? selectedSchedule.slots : []);
    } else {
      setAvailableTimes([]);
    }
  }, [newDate, doctorSchedule]);

  const handleDateChange = (date: Date | null) => {
    setNewDate(date);
  };

  const handlePostpone = async () => {
    if (!newDate || !selectedAppointment) return;
    
    try {
      // Format newDate as 'yyyy-MM-dd' and newTime as 'HH:mm' (or 'h:mm a' for 12-hour format with AM/PM)
      const formattedDate = format(newDate, 'yyyy-MM-dd');
      const formattedTime = newTime; // Ensure newTime is in 'HH:mm' or 'h:mm a' format
      console.log("appointment no", selectedAppointment);
      await axios.put(api.getUrl(`${id}/patient/change_date`), {
        appointmentNumber: selectedAppointment,
        date: formattedDate,
        time: formattedTime,
      });
      alert("date changed successfully");
      // Refresh appointments after postponing
      fetchAppointments();
      setSelectedAppointment(null); // Deselect appointment
    } catch (error) {
      console.error('Error postponing appointment:', error);
    }
  };
  
  const handleCancel = async (appointmentId: string) => {
    try {
      await axios.put(api.getUrl(`${id}/patient/cancel_appointment`), {
        appointmentNumber: appointmentId,
      });
      // Refresh appointments after canceling
      fetchAppointments();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Filter function for DatePicker
  const filterDates = (date: Date) => {
    // Ensure doctorSchedule is an array
    if (!Array.isArray(doctorSchedule)) {
      console.error('doctorSchedule is not an array:', doctorSchedule);
      return false;
    }
    return doctorSchedule.some(schedule => isSameDay(date, parseISO(schedule.date)));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading appointments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Manage Appointments
          </h1>
        
        {sortedAppointments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAppointments.map((appointment, index) => (
              <div key={index} className="bg-white rounded-lg shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 border-b-2 border-gray-200 pb-2">
                    Dr. {appointment.doctor.user.name || 'Unknown'}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700"><span className="font-semibold">Date:</span> {appointment.formattedDate}</p>
                    <p className="text-gray-700"><span className="font-semibold">Time:</span> {appointment.time || 'Not specified'}</p>
                    <p className="text-gray-700"><span className="font-semibold">Specialty:</span> {appointment.doctor.specialization || 'Unknown'}</p>
                    <p className="text-gray-700"><span className="font-semibold">City:</span> {appointment.doctor.user.city || 'Unknown'}</p>
                    <p className="text-gray-700"><span className="font-semibold">Email:</span> {appointment.doctor.user.email || 'Unknown'}</p>
                    <p className="text-gray-700"><span className="font-semibold">Phone:</span> {appointment.doctor.user.phoneNumber || 'Unknown'}</p>
                    <p className="text-gray-700"><span className="font-semibold">Fees:</span> ₹{appointment.fees || 'Unknown'}</p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Fees Paid:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                        appointment.paid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {appointment.paid ? 'Yes' : 'No'}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <button
                    onClick={() => handlePostponeClick(appointment.appointmentNumber, appointment.doctor._id)}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <FaCalendarCheck />
                    Postpone
                  </button>
                  <button
                    onClick={() => handleCancel(appointment.appointmentNumber)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <FaCalendarTimes />
                    Cancel
                  </button>
                </div>

                {selectedAppointment === appointment.appointmentNumber && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 animate-pulse">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Reschedule Appointment</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Select New Date
                        </label>
                        <DatePicker
                          selected={newDate}
                          onChange={handleDateChange}
                          dateFormat="yyyy/MM/dd"
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          minDate={new Date()}
                          filterDate={filterDates}
                          placeholderText="Select a new date"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Select New Time
                        </label>
                        <select
                          value={newTime}
                          onChange={(e) => setNewTime(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                          <option value="">Select a time</option>
                          {availableTimes.map((time, index) => (
                            <option key={index} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={handlePostpone}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        disabled={!newDate || !newTime}
                      >
                        Submit Changes
                      </button>
                    </div>
                  </div>
                )}
            </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-xl p-12 text-center">
            <div className="text-gray-500 text-xl mb-4">No upcoming appointments found</div>
            <div className="text-gray-400">You don't have any scheduled appointments to manage.</div>
        </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentActions;