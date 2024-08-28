const express = require('express');
const router=express.Router();
const {newappointment,updatepaymentstatus,alldoctors} = require('../controllers/patientcontroller');
router.route("/:id/newappointment").post(newappointment);
router.route("/:id/updatepaymentstatus").put(updatepaymentstatus);
router.route("/:id/alldoctors").get(alldoctors)




module.exports=router;