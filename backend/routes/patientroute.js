const express = require('express');
const router=express.Router();
const {newappointment,updatepaymentstatus,alldoctors, cancelappointment, appointment_of_a_period,doctorswithspeciality} = require('../controllers/patientcontroller');
router.route("/:id/newappointment").post(newappointment);
router.route("/:id/updatepaymentstatus").put(updatepaymentstatus);
router.route("/:id/alldoctors").get(alldoctors)
router.route("/:id/cancelappointment").put(cancelappointment);
router.route("/:id/appointment_of_a_period").get(appointment_of_a_period);
router.route("/:id/doctorwithspeciality").get(doctorswithspeciality);


module.exports=router;