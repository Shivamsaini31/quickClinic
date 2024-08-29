const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Doctor = require('../models/doctormodel');
const Patient=require('../models/patientmodel');
const { v4: uuidv4 } = require('uuid'); // Import the UUID package
const User = require('../models/usermodel');
exports.newappointment = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params; // Extract the patient ID from the request parameters
    const { doc_id, date, time, fees, paid } = req.body;
    // Generate a unique appointment number (UUID)
    const appointmentNumber = uuidv4();
    // Find the doctor and patient by user ID
    const doctor_info = await User.findById(doc_id);
    const patient_info = await User.findById(id);
    
    if (!doctor_info || !patient_info) {
        return res.status(404).json({ success: false, message: "Doctor or Patient not found" });
    }

    const doc_name = doctor_info.name;
    const doc_email = doctor_info.email;
    const doc_phone = doctor_info.phoneNumber;
    const patient_name = patient_info.name;
    const patient_email = patient_info.email;
    const patient_phone = patient_info.phoneNumber;

    // Find or create the doctor document
    let doctor = await Doctor.findOne({ user: doc_id });
    
    if (!doctor) {
        doctor = new Doctor({
            user: doc_id,
            appointment: []
        });
    }

    // Check if the appointment already exists to prevent duplicates
    const existingAppointment = doctor.appointment.find(app => app.appointmentNumber === appointmentNumber);

    if (!existingAppointment) {
        doctor.appointment.push({
            patient_name,
            patient_id: id,
            patient_email,
            patient_phone,
            date,
            time,
            fees,
            paid,
            appointmentNumber, // Add the unique appointment number
            status: "Scheduled",
        });

        // Save the doctor document
        await doctor.save();
    }

    // Find or create the patient document
    let patient = await Patient.findOne({ user: id });
    
    if (!patient) {
        patient = new Patient({
            user: id,
            appointment: []
        });
    }

    // Check if the appointment already exists to prevent duplicates
    const existingPatientAppointment = patient.appointment.find(app => app.appointmentNumber === appointmentNumber);

    if (!existingPatientAppointment) {
        patient.appointment.push({
            doc_id,
            doc_name,
            doc_email,
            doc_phone,
            date,
            time,
            fees,
            paid,
            appointmentNumber, // Add the unique appointment number
            status: "Scheduled",
        });

        // Save the patient document
        await patient.save();
    }

    res.status(201).json({
        success: true,
        doctor,
        patient
    });
});
exports.updatepaymentstatus = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const {appointmentNumber}=req.body;

   const patient =await Patient.findOne({
     user:id,
    'appointment.appointmentNumber': appointmentNumber
    });
    const appointmentIndex_P = patient.appointment.findIndex(
        app => app.appointmentNumber === appointmentNumber
    );
    const doc_id=patient[appointmentIndex_P].doc_id;
    const doctor=await Patient.findOne({
        user:doc_id,
       'appointment.appointmentNumber': appointmentNumber
       });
       const appointmentIndex_D = doctor.appointment.findIndex(
        app => app.appointmentNumber === appointmentNumber
    );
    if (!doctor || patient) {
        return res.status(404).json({
            success: false,
            message: 'Doctor or appointment not found',
        });
    }


    
  
    if (appointmentIndex_D === -1 || appointmentIndex_P==-1) {
        return res.status(404).json({
            success: false,
            message: 'Appointment not found',
        });
    }

    // Update the payment status
    doctor.appointment[appointmentIndex_D].paid = true;
    patient.appointment[appointmentIndex_P].paid = true;


    // Save the updated doctor document
    await doctor.save();

    res.status(200).json({
        success: true,
        doctor,
        patient
    });
});
exports.alldoctors =catchAsyncErrors(async (req,res,next)=>{

const alldocs=await User.find({role:"doctor"})

res.status(200).json({
    success: true,
    alldocs
});
});
exports.doctorswithspeciality = catchAsyncErrors(async (req, res, next) => {
    const { specialty, city } = req.query; // Use req.query for GET requests
  
    if (!specialty || ! city) {
      return res.status(400).json({
        success: false,
        message: 'Specialty and city are required.'
      });
    }
  
    // Query the database for doctors based on city and specialty
    const alldocs = await User.find({ role:'doctor', city, specialty });
    console.log(alldocs, specialty, city);
  
    // Send the response
    res.status(200).json({
      success: true,
      message: 'Doctors fetched successfully.',
      alldocs
    });
  });
  
exports.cancelappointment = catchAsyncErrors(async (req, res, next) => {
        const { id } = req.params; // Patient ID from request parameters
        const { appointmentNumber } = req.body; // Appointment number from request body
    
        // Find the patient by user ID and appointment number
        const patient = await Patient.findOne({
            user: id,
            'appointment.appointmentNumber': appointmentNumber
        });
    
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient or appointment not found',
            });
        }
    
        // Find the index of the appointment in the patient's appointments
        const appointmentIndex_P = patient.appointment.findIndex(
            app => app.appointmentNumber === appointmentNumber
        );
    
        if (appointmentIndex_P === -1) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found in patient records',
            });
        }
    
        // Get doctor ID from the patient's appointment
        const doc_id = patient.appointment[appointmentIndex_P].doc_id;
    
        // Find the doctor by user ID and appointment number
        const doctor = await Doctor.findOne({
            user: doc_id,
            'appointment.appointmentNumber': appointmentNumber
        });
    
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor or appointment not found',
            });
        }
    
        // Find the index of the appointment in the doctor's appointments
        const appointmentIndex_D = doctor.appointment.findIndex(
            app => app.appointmentNumber === appointmentNumber
        );
    
        if (appointmentIndex_D === -1) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found in doctor records',
            });
        }
    
        // Check if the appointment is scheduled
        if (doctor.appointment[appointmentIndex_D].status === "Scheduled" &&
            patient.appointment[appointmentIndex_P].status === "Scheduled") {
    
            // Update the status to "Canceled"
            doctor.appointment[appointmentIndex_D].status = "Canceled";
            patient.appointment[appointmentIndex_P].status = "Canceled";
    
            // Save the changes
            await doctor.save();
            await patient.save();
    
            return res.status(200).json({
                success: true,
                message: 'Successfully canceled appointment',
                doctor,
                patient
            });
        }
    
        return res.status(400).json({
            success: false,
            message: 'Appointment already canceled or not scheduled',
        });
});

exports.appointment_of_a_period = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { startDate, endDate } = req.body;

    // Validate the date inputs
    if (!startDate || !endDate) {
        return res.status(400).json({
            success: false,
            message: 'Start date and end date are required',
        });
    }

    // Convert date strings to Date objects
    const startTime = new Date(startDate);
    const endTime = new Date(endDate);

   
    if (isNaN(startTime) || isNaN(endTime)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid date format',
        });
    }

    // Find appointments within the specified date range
    const appointments = await Patient.find({
        'appointment.date': {
            $gte: startTime,
            $lte: endTime
        },
        'user': id // Ensure the query is filtered by the specific user if needed
    });

    res.status(200).json({
        success: true,
        appointments
    });
});

    