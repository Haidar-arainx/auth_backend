import { Router } from "express";
import {
  createResetSession,
  generateOTP,
  getUser,
  login,
  register,
  resetPassword,
  updateUser,
  verifyOTP,
  verifyUser,
} from "../controller/appController.js";
import { registerMail } from "../controller/mailer.js";
import { Auth, localVariables } from "../middleware/auth.js";

const router = Router();

// ************* post method *************

router.route("/register").post(register);
router.route("/registerMail").post(registerMail); //register user
router.route("/authenticate").post(verifyUser, (req, res) => res.end()); //authenticate user
router.route("/login").post(verifyUser, login); //login in app

// ************* get method *************

router.route("/user/:username").get(getUser); //get user with username
router.route("/generateOTP").get(verifyUser, localVariables, generateOTP); //generate random otp
router.route("/verifyOTP").get(verifyUser, verifyOTP); //verify guranted  otp
router.route("/createResetSession").get(createResetSession); // reset all the variables

// ************* put method *************

router.route("/updateuser").put(Auth, updateUser); //update user profile
router.route("/resetPassword").put(verifyUser, resetPassword); //use to reset password

export default router;
