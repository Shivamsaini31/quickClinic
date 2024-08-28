const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Doctor = require('../models/doctormodel');
const Patient=require('../models/patientmodel');
const { v4: uuidv4 } = require('uuid'); // Import the UUID package
const User = require('../models/usermodel');
exports.newappointment= catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params; // Extract the patient ID from the request parameters
    const { doc_id, date, time, fees, paid } = req.body;

    // Generate a unique appointment number (UUID)
    const appointmentNumber = uuidv4();

    // Find the doctor by user ID
    const doctor_info=await User.findById(doc_id);
    const patient_info=await User.findById(id);
    const doc_name=doctor_info.name;
    const doc_email=doctor_info.email;
    const doc_phone=doctor_info.phone;
    const patient_name=patient_info.name;
    const patient_email=patient_info.email;
    const patient_phone=patient_info.phone;




    let doctor = await Doctor.findOne({ user: doc_id });
    
    if (!doctor) {
        // If the doctor doesn't exist, create a new one
      
        doctor = new Doctor({
            user: doc_id,
            appointment: [
                {
                    patient_name,
                    patient_id: id,
                    patient_email,
                    patient_phone,
                    date,
                    time,
                    fees,
                    paid,
                    appointmentNumber, // Add the unique appointment number
                    status:"Scheduled",
                },
            ],
        });
    } else {
        // If the doctor exists, add the new appointment
        doctor.appointment.push({
            patient_name,
            patient_id: id,
            date,
            time,
            fees,
            paid,
            appointmentNumber, // Add the unique appointment number
            status:"Scheduled",
        });
    }
    let patient = await Patient.findOne({ user: id });
    
    if (!patient) {
        // If the doctor doesn't exist, create a new one
      
        patient = new Patient({
            user: id,
            appointment: [
                {   doc_id,
                    doc_name,
                    doc_email,
                    doc_phone,
                    date,
                    time,
                    fees,
                    paid,
                    appointmentNumber, // Add the unique appointment number
                    status:"Scheduled",
                },
            ],
        });
    } else {
        // If the doctor exists, add the new appointment
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
                    status:"Scheduled",
        });
    }




    // Save the doctor document
    await doctor.save();
    await patient.save();
    res.status(201).json({
        success: true,
        doctor,
        patient
    });
});
exports.updatepaymentstatus = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params; // Extract the doctor ID from the request parameters
    const { doc_id, appointmentNumber } = req.body; // Extract the doctor ID and appointment number from the request body

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

    
    const appointmentIndex = doctor.appointment.findIndex(
        app => app.appointmentNumber === appointmentNumber
    );

    if (appointmentIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Appointment not found',
        });
    }

    // Update the payment status
    doctor.appointment[appointmentIndex].paid = true;

    // Save the updated doctor document
    await doctor.save();

    res.status(200).json({
        success: true,
        doctor,
    });
});
exports.alldoctors =catchAsyncErrors(async (req,res,next)=>{

const alldocs=await User.find({role:"doctor"})

res.status(200).json({
    success: true,
    alldocs
});
});
exports.doctorswithspeciallity =catchAsyncErrors(async (req,res,next)=>{
    const {speciallity,city} =req.body;
    const alldocs=await User.find({role:"doctor",city,speciallity});
    
    res.status(200).json({
        success: true,
        alldocs
    });
    });




