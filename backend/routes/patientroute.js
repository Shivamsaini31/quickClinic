const express = require('express');
const router=express.Router();
const {newappointment,updatepaymentstatus,alldoctors, cancelAppointment, appointment_of_a_period, appointment_history_all, appointment_specific, appointment_future,create_patient, change_date_appointment, specific_doctors, update_patient} = require('../controllers/patientcontroller');
router.route("/:id/patient/newappointment").post(newappointment);
router.route("/:id/patient/create_patient").post(create_patient);
router.route("/:id/patient/update_payment_status").put(updatepaymentstatus);
router.route("/:id/patient/all_doctors").get(alldoctors)
router.route("/:id/patient/cancel_appointment").put(cancelAppointment);
router.route("/:id/patient/appointment_of_a_period").get(appointment_of_a_period);
router.route("/:id/patient/change_date").put(change_date_appointment);
router.route("/:id/patient/usual_history").get(appointment_history_all);
router.route("/:id/patient/specific_appointment").get(appointment_specific);
router.route("/:id/patient/appointment_future").get(appointment_future);
router.route("/:id/patient/specific_doctors").get(specific_doctors);
router.route("/:id/patient/update_patient").put(update_patient);
module.exports=router;