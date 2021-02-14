const express = require("express");
const router = express.Router();
const {
  getUserDetails,
  confirmationEmail,
  addUserDetails,
  userLogin,
  isTokenValid,
  forgotPwd,
  changePwd,
} = require("../controllers/Users");

router.route("/").get(getUserDetails);

router.route("/fp/:email").post(forgotPwd);

router.route("/register").post(addUserDetails);

router.route("/confirm/:id").get(confirmationEmail);
router.route("/login").post(userLogin);

router.route("/valid").post(isTokenValid);

router.route("/changePwd").post(changePwd);

module.exports = router;
