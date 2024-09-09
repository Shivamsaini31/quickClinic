const express = require("express"); // Importing the Express module
const {  registerUser,checkAuthStatus, loginuser, logout, forgetpassword, resetPassword, getuserdetail, updatepassword, updateprofile, getAllUser, getsingleUser, deleteUser, checkuser } = require('../controllers/usercontroller'); // Importing the registeruser controller function
const { isauthenticateuser, authorizeroles } = require("../middleware/auth");

const router = express.Router(); 

router.route("/logout").get(logout);
router.route("/password/forget").post(forgetpassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/register").post(registerUser);
router.route("/login").post(loginuser);
router.route("/me").get(isauthenticateuser,getuserdetail);
router.route("/password/update").put(isauthenticateuser,updatepassword);
router.route("/me/updateprofile").put(isauthenticateuser,updateprofile);
router.route("/admin/users").get(isauthenticateuser,authorizeroles("admin"),getAllUser);
router.route("/userinfo/:id").get(getsingleUser).delete(isauthenticateuser,deleteUser);
router.route("/checkuser").post(checkuser);

module.exports = router; 
