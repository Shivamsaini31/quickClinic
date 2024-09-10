const express = require('express');
const {  updateDoctor, cancel_appointment, appointment_specific, change_date_appointment, applyForLeave, earnings, getdoctorinfo, updateSchedule, schedule_of_day} = require('../controllers/doctorcotroller');
const router=express.Router();
router.route("/:id/doctor/update_schedule").post(updateSchedule);

router.route("/:id/doctor/update_doctor").post(updateDoctor);
router.route("/:id/doctor/cancel_appointment").put(cancel_appointment);
router.route("/:id/doctor/specific_appointment").put(appointment_specific);
router.route("/:id/doctor/change_date").put(change_date_appointment);
router.route("/:id/doctor/leave").post(applyForLeave);
router.route("/:id/doctor/earnings").get(earnings);
router.route("/:id/doctor/me").get(getdoctorinfo);
router.route("/doctor/schedule/:id/:day").get( schedule_of_day);
module.exports=router;