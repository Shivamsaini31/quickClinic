// About.js
import { motion } from 'framer-motion';
import { AccessTime, LocalHospital, VideoCall, PeopleAlt } from '@mui/icons-material';

export default function About() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-4xl font-extrabold text-center mb-10"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About QuickClinic
      </motion.h1>

      <motion.p
        className="text-lg text-center mb-12 max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Welcome to <span className="font-bold">QuickClinic</span>, your go-to platform for seamless and fast 
        <span className="text-black font-bold"> medical appointments</span> and <span className="text-black font-bold">online consultations</span>. 
        Whether you need to visit a doctor in person or have an <span className="font-bold">online meeting</span>, we’re here to make your health journey as convenient as possible.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        <motion.div
          className="flex flex-col items-center bg-white bg-opacity-10 rounded-xl p-6 shadow-lg"
          whileHover={{ scale: 1.1 }}
        >
          <LocalHospital className="text-6xl text-yellow-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Book Appointments</h2>
          <p className="text-center">Easily schedule appointments with top doctors from various specialties.</p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center bg-white bg-opacity-10 rounded-xl p-6 shadow-lg"
          whileHover={{ scale: 1.1 }}
        >
          <AccessTime className="text-6xl text-green-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Real-Time Availability</h2>
          <p className="text-center">Check doctor availability and book slots in real-time.</p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center bg-white bg-opacity-10 rounded-xl p-6 shadow-lg"
          whileHover={{ scale: 1.1 }}
        >
          <VideoCall className="text-6xl text-blue-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Online Meetings</h2>
          <p className="text-center">Have video consultations with experts from the comfort of your home.</p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center bg-white bg-opacity-10 rounded-xl p-6 shadow-lg"
          whileHover={{ scale: 1.1 }}
        >
          <PeopleAlt className="text-6xl text-red-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Patient Management</h2>
          <p className="text-center">Manage your appointments, history, and more in one place.</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
